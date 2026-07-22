---
title: "Beyond Summarization: Extracting Critical Fields that Matter for Insurance Decisions"
date: 2026-07-22
toc: true
toc_sticky: true
header:
  og_image: "/assets/images/posts/critical-fields-cover.png"
  teaser: "/assets/images/posts/critical-fields-cover.png"
categories:
- thoughts
- underwriting
- LLM
excerpt: "Insurance teams often ask LLMs to summarize documents, then struggle to define what a good summary looks like. A better approach is to start from the decision, extract the critical fields, preserve their evidence, and use narrative generation only where it adds value."
---

“Can we use an LLM to summarize these documents?” is one of the most common requests in insurance AI.

The appeal is obvious. Underwriters and claims professionals review large volumes of medical reports, application forms, policy wordings, invoices, and correspondence. A concise summary promises faster review and less time spent searching through documents.

Yet many teams soon encounter the same problem: **the summary looks useful, but its quality is surprisingly difficult to evaluate.**

This is often treated as an evaluation problem. In many cases, it is actually a product-definition problem. Before asking how to score a summary, we should ask whether a free-form summary is the right output in the first place.

## Why “summarize this” is underspecified

Summarization is popular partly because it is easy to demonstrate and easy to explain. Give an LLM a document, ask for a summary, and receive a fluent paragraph. The result often looks impressive.

But the instruction leaves important questions unanswered:

- Which critical fields must always be included?
- Which details may be omitted?
- What should receive the most emphasis?
- How should conflicting information be handled?
- Should the output distinguish between a fact stated in the document and an inference made by the model?
- What evidence should a reviewer use to verify each statement?

Without agreement on these questions, two very different summaries can both appear reasonable. A domain expert may prefer one because it contains a detail relevant to a particular decision, while a generic text-similarity metric may prefer the other because its wording is closer to a reference answer.

The evaluation is ambiguous because the task itself is ambiguous.

## Start with the decision, not the output format

When users ask for a summary, they often do not literally need a shorter version of every document. They need help finding the information required to perform a specific task.

For example, a life and health underwriter may repeatedly look for the following critical fields:

- age and sex or gender as recorded in the application
- height, weight, and BMI
- smoking status and alcohol consumption
- occupation and occupational hazards
- income and financial justification
- existing and historical medical conditions
- family medical history
- previous applications, exclusions, or adverse decisions

This is closer to **structured extraction and evidence retrieval** than open-ended summarization. Once the requirement is expressed as a set of critical fields, the expected output becomes clearer and the system becomes easier to test.

The reframing is:

> Do not ask, “What should the summary say?” Ask, “What information does the user need to make or verify the decision?”

That question turns a vague generation task into a defined information extraction.

![A comparison between ambiguous free-form summaries and testable critical-field extraction](/assets/images/posts/summary-vs-critical-fields.svg)

## Define critical fields in an explicit extraction schema

A typed schema makes the extraction visible to domain experts, developers, and evaluators. A simplified underwriting model might look like this:

```python
from typing import Generic, Literal, TypeVar

from pydantic import BaseModel, Field


T = TypeVar("T")


class Evidence(BaseModel):
    document_name: str
    page: int | None = None
    quote: str | None = None


class ExtractedField(BaseModel, Generic[T]):
    value: T | None = Field(
        description="Normalized value inferred from the source"
    )
    raw_value: str | None = Field(
        default=None,
        description="Value as written in the source document",
    )
    status: Literal["found", "missing", "uncertain", "conflict"]
    evidence: list[Evidence] = Field(default_factory=list)


class Money(BaseModel):
    amount: float
    currency: str
    period: Literal["weekly", "monthly", "annual", "other"]


class AlcoholUse(BaseModel):
    frequency: Literal["none", "occasional", "regular", "unknown"]
    units_per_week: float | None = None


class MedicalCondition(BaseModel):
    name: str
    status: Literal["active", "resolved", "unknown"]
    relationship: str | None = None


class UnderwritingDecision(BaseModel):
    decision: Literal[
        "accepted", "declined", "postponed", "rated", "excluded", "other"
    ]
    details: str | None = None


class UnderwritingExtraction(BaseModel):
    age: ExtractedField[int]
    gender: ExtractedField[
        Literal["female", "male", "other", "not_specified"]
    ]
    bmi: ExtractedField[float]
    smoker_status: ExtractedField[
        Literal["current", "former", "never", "unknown"]
    ]
    alcohol_consumption: ExtractedField[AlcoholUse]
    occupation: ExtractedField[str]
    income: ExtractedField[Money]
    family_history: ExtractedField[list[MedicalCondition]]
    existing_conditions: ExtractedField[list[MedicalCondition]]
    previous_underwriting_decisions: ExtractedField[list[UnderwritingDecision]]
    review_status: Literal["complete", "missing_information", "conflict"]
```

The schema constrains each field to the representation expected downstream: age must be an integer, BMI a number, smoking status one of a defined set of categories, and income an amount with a currency and period. Types enforce the output shape, while field descriptions and agreed normalization rules guide reasonable LLM interpretation. For example, “stopped smoking five years ago” can be normalized to `former` without losing the original wording.

The normalized `value` is useful for comparison and downstream processing, while `raw_value` and `evidence` preserve what appeared in the source. The field-level `status` also allows the model to report missing, uncertain, or conflicting information rather than inventing a valid-looking value. A production schema would still require definitions and normalization rules agreed with underwriters.

![The anatomy of a critical field: normalized value, raw source value, status, and supporting evidence](/assets/images/posts/critical-field-anatomy.svg)

{% capture worked_example %}

## Worked example: From document to underwriting review

The following end-to-end example shows how a fictional application becomes typed JSON and then a business-facing review screen.

Consider this fictional excerpt from a life insurance application:

```text
Sample life application — page 1

Applicant: Daniel Tan, age 42, male
Occupation: Senior civil engineer; primarily office-based with periodic site inspections
Gross income: SGD 12,000 per month

Tobacco: Smoked approximately 10 cigarettes per day from age 22 to 37.
Stopped smoking five years ago and has not smoked since.
Alcohol: Beer or wine twice a week, approximately four units in total per week.

Applicant-declared BMI: 26.8
Medical history: Hypertension diagnosed in 2022, controlled with amlodipine.
Appendicitis treated surgically in 2010; fully resolved.
Family history: Father is living with type 2 diabetes.

Previous application: Accepted by another insurer in 2023 with a 25% premium
loading due to hypertension.

Sample life application — page 2

Medical examination: BMI 27.4. Blood pressure controlled on current medication.
```

Using the schema above, an LLM could return the following output. It is collapsed by default so the structure remains available without overwhelming the narrative.

<details markdown="1" style="margin: 1rem 0 1.5rem; padding: 0.25rem 1rem; background: #f7f8fa; border: 1px solid #dfe3e8; border-radius: 8px;">
<summary style="padding: 0.6rem 0; cursor: pointer; font-weight: 700;">View extracted JSON <small style="color: #6f7885; font-weight: 400;">· 10 fields · 11 evidence references</small></summary>

```json
{
  "age": {
    "value": 42,
    "raw_value": "age 42",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Applicant: Daniel Tan, age 42, male"
      }
    ]
  },
  "gender": {
    "value": "male",
    "raw_value": "male",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Applicant: Daniel Tan, age 42, male"
      }
    ]
  },
  "bmi": {
    "value": null,
    "raw_value": "26.8 in the declaration; 27.4 in the medical examination",
    "status": "conflict",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Applicant-declared BMI: 26.8"
      },
      {
        "document_name": "Sample life application",
        "page": 2,
        "quote": "Medical examination: BMI 27.4."
      }
    ]
  },
  "smoker_status": {
    "value": "former",
    "raw_value": "Stopped smoking five years ago and has not smoked since.",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Stopped smoking five years ago and has not smoked since."
      }
    ]
  },
  "alcohol_consumption": {
    "value": {
      "frequency": "regular",
      "units_per_week": 4.0
    },
    "raw_value": "Beer or wine twice a week, approximately four units in total per week.",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Alcohol: Beer or wine twice a week, approximately four units in total per week."
      }
    ]
  },
  "occupation": {
    "value": "Senior civil engineer",
    "raw_value": "Senior civil engineer; primarily office-based with periodic site inspections",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Occupation: Senior civil engineer; primarily office-based with periodic site inspections"
      }
    ]
  },
  "income": {
    "value": {
      "amount": 12000.0,
      "currency": "SGD",
      "period": "monthly"
    },
    "raw_value": "SGD 12,000 per month",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Gross income: SGD 12,000 per month"
      }
    ]
  },
  "family_history": {
    "value": [
      {
        "name": "Type 2 diabetes",
        "status": "active",
        "relationship": "father"
      }
    ],
    "raw_value": "Father is living with type 2 diabetes.",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Family history: Father is living with type 2 diabetes."
      }
    ]
  },
  "existing_conditions": {
    "value": [
      {
        "name": "Hypertension",
        "status": "active",
        "relationship": null
      },
      {
        "name": "Appendicitis",
        "status": "resolved",
        "relationship": null
      }
    ],
    "raw_value": "Hypertension diagnosed in 2022; appendicitis treated surgically in 2010.",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Medical history: Hypertension diagnosed in 2022, controlled with amlodipine. Appendicitis treated surgically in 2010; fully resolved."
      }
    ]
  },
  "previous_underwriting_decisions": {
    "value": [
      {
        "decision": "rated",
        "details": "Accepted in 2023 with a 25% premium loading due to hypertension"
      }
    ],
    "raw_value": "Accepted by another insurer in 2023 with a 25% premium loading due to hypertension.",
    "status": "found",
    "evidence": [
      {
        "document_name": "Sample life application",
        "page": 1,
        "quote": "Previous application: Accepted by another insurer in 2023 with a 25% premium loading due to hypertension."
      }
    ]
  },
  "review_status": "conflict"
}
```

</details>

The output is strict where downstream systems need consistency, but it still allows bounded interpretation. The smoking statement is normalized to `former`, the income is separated into amount, currency, and period, and the prior loading is mapped to `rated`. In contrast, the two BMI values are not silently reconciled: the normalized value remains `null`, both source statements are retained, and the record is routed for review.

The same structured output can be rendered as a compact review interface, with the exception surfaced instead of buried in prose:

<iframe
  id="underwriting-review-example"
  src="{{ '/assets/underwriting-review-example.html' | relative_url }}"
  title="Rendered underwriting review example"
  loading="lazy"
  scrolling="no"
  style="display: block; width: 100%; height: 1100px; margin: 1.25rem 0 2rem; border: 0;"
></iframe>

<script>
  (function () {
    var frame = document.getElementById("underwriting-review-example");
    window.addEventListener("message", function (event) {
      if (
        event.source === frame.contentWindow &&
        event.data &&
        event.data.source === "underwriting-review-example" &&
        Number.isFinite(event.data.height)
      ) {
        frame.style.height = Math.ceil(event.data.height) + "px";
      }
    });
  }());
</script>

{% endcapture %}

There is an important distinction between **data validation** and **business rules**. For example, a schema should verify that age is numeric; it should not necessarily reject an age outside the product’s usual eligibility range. Eligibility is a downstream underwriting rule, and preserving the extracted source value is essential for auditability.

## Evaluation becomes field-specific

Once the output is structured, each field can be assessed with a metric appropriate to its meaning:

1. **Exact or normalized match** for categorical values, dates, counts, and identifiers.
2. **Numeric comparison with tolerances** for values such as height, weight, BMI, and income.
3. **Lexical similarity** for short text fields such as occupation, after applying suitable normalization.
4. **Semantic comparison** for longer descriptions such as medical history.
5. **Rubric-based LLM assessment** for complex lists, timelines, or tables where deterministic comparison is impractical.

This also makes diagnostic analysis possible. Instead of concluding that “the summary is weak,” we can identify that the system performs well on demographic fields but misses historical conditions, confuses current and former smoking status, or extracts the right fact without adequate evidence.

The field-level scores can be aggregated into an overall benchmark, but a simple average can be misleading. Missing a material medical condition is not equivalent to formatting an occupation differently. Weighting and pass/fail thresholds should therefore reflect business impact, and critical errors should remain visible rather than being hidden inside a high average score.

## Structured output improves the user experience too

Structured extraction is not only easier to evaluate; it is also more flexible to present.

The same output can be rendered as an HTML review screen with sections, filters, warning badges, missing-information indicators, and links to source pages. A user can scan the critical fields, expand details when needed, and verify each item against the original document.

It can also support downstream workflows: pre-populating an underwriting system, routing cases for specialist review, detecting inconsistencies, or applying deterministic business rules. A narrative paragraph is much harder to reuse reliably.

This does not mean narrative generation has no role. A short synthesis can still help explain chronology, relationships, or the significance of several facts taken together. The difference is that the narrative becomes a **presentation layer built on top of grounded, structured evidence**, rather than the system’s only output.

A useful design pattern is:

1. extract critical fields into a defined schema;
2. attach evidence and uncertainty to every critical field;
3. run validation and business rules over the structured result;
4. render the information for the user’s workflow; and
5. generate a concise narrative only where synthesis adds value.

![A grounded workflow from source documents through critical-field extraction, validation, review, and optional narrative synthesis](/assets/images/posts/critical-fields-workflow.svg)

Each layer can then be evaluated separately.

## When a true summary is still appropriate

Some tasks are genuinely exploratory. A claims handler opening a long correspondence history may want a quick orientation before knowing which questions to ask. A policy specialist may want the broad themes of a complex wording. In these cases, an open-ended summary can be useful.

Even then, the task should be constrained by its purpose. We can define required sections, intended audience, maximum length, treatment of uncertainty, citation requirements, and an evaluation rubric based on factuality, coverage, relevance, and usability. User studies can then measure whether the output actually reduces review time or improves decision quality.

The lesson is not that summaries are always wrong. It is that **“summary” is often a placeholder for a need that has not yet been specified.**

## Closing thoughts

When summary evaluation feels impossibly subjective, the first response should not be to search for a more sophisticated metric. It should be to revisit the task with domain users.

What decision are they making? Which critical fields influence it? Which omissions would be material? What evidence do they need in order to trust the result?

In many insurance workflows, those questions lead naturally to structured extraction, evidence retrieval, and targeted synthesis. This approach may look less magical than asking an LLM for a one-click summary, but it produces something more valuable: an output that is measurable, auditable, reusable, and aligned with the work users actually need to do.

{{ worked_example }}
