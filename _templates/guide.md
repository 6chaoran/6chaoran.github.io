---
title: "How to [achieve a concrete outcome]"
date: YYYY-MM-DD
last_modified_at: YYYY-MM-DD
pillar: ai-engineering
format: guide
series:
excerpt: "What the reader will build, why it matters, and the main constraint this guide addresses."
header:
  og_image: "/assets/images/posts/slug-cover.png"
  teaser: "/assets/images/posts/slug-cover.png"
recommended:
  - "/posts/YYYY-MM-DD-related-post/"
---

State the outcome, intended reader, and prerequisites.

{% include article-callout.html type="note" title="What you will build" content="A one-sentence description of the finished artifact." %}

## Architecture and decisions

Explain the system boundary and the important choices before the steps.

{% include article-figure.html src="/assets/images/posts/slug-architecture.png" alt="Architecture showing [components and flow]" caption="The minimum architecture needed for this guide." kind="diagram" %}

## Implementation

Use numbered stages. Explain why each stage exists before showing code.

{% include code-caption.html title="Adapter implementation" file="src/adapter.py" %}

```python
# Replace with a minimal, runnable example.
```

## Verification

Show the command, expected result, and at least one failure mode.

## Trade-offs and production notes

Name the limits, security implications, and next scaling decision.

## Key takeaways

- Summarize three reusable lessons.
