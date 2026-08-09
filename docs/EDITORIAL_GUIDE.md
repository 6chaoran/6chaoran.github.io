# Editorial Guide

## Positioning

> I build practical AI applications and share the architectures, prototypes, and lessons behind them.

The editorial promise is practical: notes for turning AI ideas into working pilots—and pilots into production systems. Articles should favor useful applications, concrete architecture and system decisions, working prototypes, evidence, and reusable lessons over generic AI commentary.

## Topics and formats are separate

Every published post has one `pillar` and one `format` in front matter. A pillar answers **what problem is this about?** A format answers **what kind of reading experience is this?** Technologies and domain nouns remain in `tags`.

### Pillars

- `ai-engineering` — system design, orchestration, deployment, performance, observability, and private model integration.
- `evaluation-reliability` — evaluation design, metrics, regression testing, evidence, quality assurance, and feedback loops.
- `document-intelligence` — OCR/VLM, extraction, layout, retrieval, citations, and critical fields.
- `ai-in-practice` — applications, adoption, product lessons, pilot delivery, business workflows, and team practices.

Use `archive` only for earlier work that predates the current editorial focus. It is a historical collection, not a fifth pillar and not a valid default for new writing.

### Formats

- `field-note` — a concise observation or experiment.
- `guide` — a reproducible implementation.
- `case-study` — a problem, constraints, decisions, outcome, and lessons.
- `essay` — an argument or practical framework.
- `project` — a maintained artifact with demo/source links or implementation notes.

## Front-matter example

```yaml
pillar: evaluation-reliability
format: case-study
series: from-demo-to-dependable
featured: true
tags:
  - insurance
  - production-ai
  - feedback-loops
```

`series` and `featured` are optional. Use one series only when the post contributes directly to its promised reading path.

## Cornerstones and series

The canonical selection lives in `_data/editorial.yml`.

Cornerstones:

1. “From Demo to Production: Four Hard-Earned Lessons from Shipping GenAI for Insurance Claims”
2. “Beyond Summarization: Extracting Critical Fields that Matter for Insurance Decisions”
3. “OCR Evaluation, Rebuilt for Insurance Claims in GenAI Era”

Flagship series:

- **From Demo to Dependable**
- **Document Intelligence in Practice**

## Pre-publication check

- The title states a problem, outcome, or clear promise.
- The excerpt works independently in a post card and search result.
- The pillar and format use only controlled values.
- Claims are supported by experience, reproducible evidence, or clearly marked opinion.
- Confidential, customer, and personal data is absent or properly sanitized.
- Diagrams have useful alternative text and an explanation in the article body.
- The ending provides takeaways and one intentional next step.
