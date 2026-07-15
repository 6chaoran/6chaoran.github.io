---
title: "From Demo to Production: Four Hard-Earned Lessons from Shipping GenAI for Insurance Claims"
date: 2026-07-15
toc: true
toc_sticky: true
header:
  og_image: "/assets/images/posts/claims-ai-hard-earned-lessons-cover.png"
  teaser: "/assets/images/posts/claims-ai-hard-earned-lessons-cover.png"
categories:
- thoughts
- claims
excerpt: "Four hard-earned lessons from turning a promising GenAI claims demo into a production-ready solution—from defining meaningful measurements and managing technical debt to building effective engineering and domain-expert feedback loops." 
--- 

A GenAI demo can look convincing after only a few experiments. Turning it into a production-ready system is a different challenge.

In insurance, an output that merely *looks reasonable* is not enough. The system must work across varied documents, support traceable decisions, survive frequent changes, and align with how domain experts assess real claims.

This post reflects on one such journey: evolving a manual claims-assessment experiment into a repeatable GenAI solution. Along the way, we learned four lessons that I would apply much earlier next time:

![Four stages in the journey from a manual GenAI demo to a production-ready claims workflow](/assets/images/posts/claims-genai-journey.svg)

## How the project started

In my experience, GenAI projects usually begin in one of two ways: a business team brings a problem to the AI team, or the AI team introduces a capability and searches for users.

This project followed the first path. Claims consultants had already experimented with ChatGPT and dummy data by asking a simple question: *If we “feed” claim information into an LLM, can it produce a reasonable claim assessment?* The results looked promising. Because the idea came from a real business need, we did not have to begin by proving that the problem was worth solving. The immediate challenge was turning a promising but manual experiment into something repeatable.

Business-led projects often have this advantage: there is already demand from potential users. AI-led projects can succeed too, but they usually require more time to earn trust and establish genuine adoption.

## Lesson 1: Simplify the prototype — optimize later

The next step was to repeat the same experiment with real claim data. We replaced ChatGPT with our internal LLM and used open-source Tesseract for OCR to extract text from claim documents. There was no RAG, no workflow engine—the output was just text files. We then copy‑pasted intermediate outputs to assemble context and manually formed prompts for the LLM. This was the point when the business team reached out to the regional AI team for help.

The first problem to solve wasn’t “how do we make the model smarter?” It was: **how do we make this manual workflow repeatable and less painful?**

So the first thing I did was convert the exact same steps into a small Python script—to automate what the business users were already doing, without introducing new concepts or frameworks. The goal was speed and fidelity, not elegance.

Only after we had a working baseline did we start to see the real gaps. As users pushed the prototype further, it became clear that the LLM alone couldn’t handle many claim-specific challenges. That’s when we regrouped and started to propose targeted enhancements:

1. OCR quality was inconsistent → later we proposed a vision-language model approach.
2. Underwriting and claims reports were often mixed up → later we proposed a document classifier to tag them.
3. Summaries were used instead of original report text, and they sometimes missed key details → later we proposed RAG to ground responses in the source.

We intentionally avoided adopting popular frameworks like LangChain or LlamaIndex early on, because the workflow was still simple and the biggest bottleneck was user pain—not architecture.

**Key takeaway:** don’t over-engineer the prototype with the latest hype or trendy frameworks. Add complexity only when it directly removes real user pain.

## Lesson 2: Define the measurements early

Early prototypes often succeed because they *feel* right to business users. But “it looks good” isn’t a metric—and without an agreed measurement, you can’t tell whether iteration is actually improving anything. This is where the AI/data team must be opinionated: define what “good” means *before* scaling.

The key is to set up measurement early and align on it with business stakeholders. The metric doesn’t have to be perfect on day one; it can start as a simple spreadsheet and a small, representative evaluation set. What matters is that everyone iterates against the same yardstick, and that the yardstick is revised deliberately when it stops reflecting the business goal.

In this project, we didn’t do this well. Validation was dominated by anecdotal claim-by-claim review. Feedback was captured as free-text comments (“suggestions/defects”) without consistent labels, which made it hard to track progress over time or to pinpoint which component (OCR, routing, retrieval, or the LLM) needed improvement.

If I were to do it again, I would push for a simple, tangible north-star metric from the start—for example, the claim decision **{Accept, Reject, Refer}**, compared against historical business-as-usual (BAU) outcomes on a curated sample. It won’t be a perfect comparison (information completeness differs; technical vs. operational decisions aren’t identical), but it forces clarity and creates a baseline you can improve.

From there, the evaluation can expand into diagnostic metrics for each layer of the pipeline, while remaining anchored to the original decision-level outcome.

![Evaluation layers connecting component metrics to the claims decision outcome](/assets/images/posts/claims-evaluation-layers.svg)

**Key takeaway:** define a simple decision-level metric early, even if it is imperfect. Expand the evaluation only after the team has agreed on what success means.

## Lesson 3: Refactor continuously

Once the prototype starts getting real usage, business requests tend to become ad hoc: “Can we try this variation?”, “Can we handle this edge case?”, “Can we show one more field?” Everyone wants quick experiments and quick results. If you only keep stacking patches, the codebase becomes messy fast—and eventually turns into technical debt that slows *everything* down.

At the same time, stakeholders usually have two kinds of asks:

1. **Ad hoc requests** that need fast turnaround (to keep momentum and adoption).
2. A “**dream list**” of good-to-have features they hope to see one day.

Expectation management matters: handle the ad hoc requests efficiently, but aim to deliver the dream list selectively to build long-term trust. A well-structured codebase makes it easier to turn the most valuable dream-list ideas into experiments without destabilizing the core workflow.

To do that, you need continuous refactoring. Refactoring isn’t about elegance—it’s about buying speed and reliability later. I try to refactor whenever there’s capacity and the payoff is clear: easier debugging, safer changes, and faster extension for new features.

In this project, a few refactors paid off immediately:

- **Move configuration out of code**: we exposed routing paths and RAG settings in a prompt-template YAML so prompt iteration didn’t require code changes.
- **Make execution patterns configurable**: we refactored sequential prompt execution into a configurable sequential *or* concurrent pattern—improving throughput while preserving sequential reasoning where needed.
- **Separate the integration layer**: we carved out a clean, well-documented (and testable) interface for the IT integration layer, while keeping internal components flexible for ongoing optimization.

**Key takeaway:** refactoring is not a distraction from rapid experimentation. Done selectively, it is what allows the team to keep experimenting without every change becoming slower and riskier.

## Lesson 4: Build fast and slow feedback loops

The final lesson is simple: run the solution through more tests—but recognize that not all testing serves the same purpose.

In this project, we relied on two complementary feedback loops:

1. **A fast internal AI/data-science loop**, focused on rapid iteration and improving measurable performance.
2. **A slower but more comprehensive domain-expert loop**, in which claims consultants reviewed the complete output—not just the metrics.

The domain review was especially valuable because claims consultants compared the solution with their business-as-usual practices. They identified edge cases, behavioral misalignment, and gaps that our existing metrics did not capture. In some cases, their feedback even led us to define new metrics.

This is close to what is sometimes called **“loop engineering”**: deliberately designing feedback loops that help a system improve. In our case, the fast internal loop gave us speed, while the domain-expert loop gave us depth.

To accelerate the internal loop, we made several non-trivial engineering investments:

- **Automated test suite:** We created fake APIs and a minimal dummy dataset so every pull request could pass basic quality checks before being merged.
- **Caching and state management:** We added functions to save and reload intermediate states and cache previous LLM calls. This allowed us to test individual components without repeatedly running the entire pipeline.
- **Experiment tracking:** We integrated MLflow to log prompts, configurations, metrics, and key intermediate outputs. This made it easier to compare experiments and diagnose where problems originated.

We also invested in making domain review more efficient. We built a small web application where claims consultants could inspect each LLM-generated assessment alongside its supporting citations. Every citation linked back to the original document in SharePoint, and color-coded icons highlighted possible OCR-quality issues.

This gave reviewers the context they needed to verify an assessment without manually searching through multiple documents. As a result, even the slower domain-expert loop became faster and more actionable.

![Fast engineering and deep domain feedback loops feeding a contextual alignment layer](/assets/images/posts/claims-feedback-alignment.svg)

The domain-review loop also exposed another bottleneck: repeatedly modifying the main prompt for individual edge cases was slow, and a change that fixed one case could break cases that had already passed.

As a separate next phase, I proposed keeping the main assessment prompt relatively static and introducing a subsequent alignment step. This step uses a RAG-style approach to retrieve only the contextual guidance—or “patches”—applicable to each claim. Every patch should be versioned, traceable, and tested against both its target edge case and the broader regression suite before being promoted to the knowledge base.

**Key takeaway:** production quality does not come from a single test suite, metric, or prompt. Build a fast engineering loop for frequent iteration, a deeper domain loop for discovering what automated evaluation misses, and an architecture that can absorb new feedback without destabilizing previously tested behavior.

## Closing thoughts

The hardest part of shipping GenAI was not choosing the model or framework. It was building a process that could turn uncertain outputs and subjective feedback into measurable, maintainable improvements.

If I were starting again, I would still begin with the simplest possible prototype—but I would introduce measurement, refactoring, and structured feedback loops much earlier. A demo proves that an idea may work. These practices are what give it a chance to keep working as the data, requirements, and expectations grow.
