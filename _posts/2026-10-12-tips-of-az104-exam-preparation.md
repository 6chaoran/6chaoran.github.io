---
pillar: ai-in-practice
format: case-study
title: "How I Passed AZ-104 in Three Weeks with an AI-Assisted Learning Loop"
date: 2026-10-12
toc: true
toc_sticky: true
header:
  og_image: "/assets/images/posts/az104-cover-v2.png"
  teaser: "/assets/images/posts/az104-cover-v2.png"
categories:
- thoughts
- Azure
- LLM
excerpt: "My AI-assisted approach to AZ-104 preparation: turn practice questions into structured material, record misconceptions, and retest with a personal mock-test site."
---

I passed AZ-104 after three weeks of preparation and earned the **Microsoft Certified: Azure Administrator Associate** certification. Along the way, I used Codex to prepare a structured question bank and build a mock-test site for focused revision.

## Why AZ-104

My mid- to long-term career goal is to move from data science into AI solution architecture, with AZ-104 and AZ-305 as milestones along the way. I started with AZ-104 to strengthen my Azure foundation. Following a tip I found online, I booked the exam three weeks ahead to set a deadline and stop putting off the preparation.

As a data scientist, my instinct was to use AI to accelerate the learning process. I began with Microsoft Learn and hands-on labs, then used question practice to find gaps in my understanding. The aim was to make each mistake useful in the next study session.

## My AI-assisted learning approach

The loop was simple: **attempt → diagnose → record → prioritize → retest**.

{% include article-figure.html
  src="/assets/images/posts/az104-learning-loop.svg"
  alt="Attempt a question, diagnose the misconception with AI, record a learning note, prioritize it for review, and retest before revealing the note. Repeat the loop."
  caption="Keep the lesson beside the question, then bring it back into focused practice."
  kind="diagram" %}


### 1. Turn questions into structured learning material

I wrote a reusable instruction file for Codex to process questions consistently. It asked AI to extract text from screenshots, explain the answer and competing options, cite Microsoft Learn, flag potentially outdated assumptions, and save the result in a predefined YAML schema with increasing question IDs.

Each question was categorized by the skills and sub-skills in the [official AZ-104 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104). I manually worked through and recorded **500+ questions over about five evenings after work**. AI made organizing the material easier, but I still had to put in the work to understand it.

Here is a simplified sample, with an example learning note for revision:

```yaml
- id: 812
  skill: Deploy and manage Azure compute resources
  sub-skill: Create and configure virtual machines
  question: |
    VM1 uses a supported Azure VM size. You must encrypt its
    temporary disk and OS/data disk caches without installing
    encryption software inside the guest OS. What should you enable?
  choices:
    A: Azure Disk Encryption
    B: Encryption at host
    C: Azure Storage encryption on a blob container
    D: Transport Layer Security for the application
  answer: B
  explanation: |
    Encryption at host covers the temporary disk and disk caches.
    The other choices address guest encryption, blobs, or traffic.
    [Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption)
  learning_note: |
    Identify where encryption must happen: guest OS, VM host,
    stored data, or network traffic.
  tags: [must-review]
```

For the first few questions, I checked selected Microsoft Learn citations and compared answers from different models. That gave me confidence to become more hands-off. Later, an answer that contradicted my understanding would trigger another documentation check. The bank was selectively checked; model agreement alone did not establish correctness.

I marked questions flagged as potentially outdated with `skip-review`, so they stayed out of focused revision. I could have added a separate tag for the reason, but kept the system simple for this preparation.

### 2. Save the misconception, not just the answer

One storage-redundancy question revealed that I had been treating **LRS → ZRS → GRS → RA-GRS** as a ladder of increasingly better choices. If you are studying for AZ-104, this is a useful distinction to learn. For everyone else, the example shows how AI helped me uncover a mistaken assumption.

AI helped me separate the requirements: ZRS provides synchronous replication across primary-region zones; GRS adds asynchronous replication to another region while using local replication within each region. GZRS combines zone redundancy with geo-replication. The choice depends on the failure scenario and access needs, rather than a single ranking. [Microsoft's redundancy documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy).

I saved that distinction in the question's `learning_note` and tagged it `must-review`. The answer told me which option to select; the note preserved what needed to change in my reasoning.


### 3. Build a small tool for focused retesting

Once the bank was structured, **Codex built the initial mock-test site in roughly 5 minutes**. Preparing the material took five evenings; building the first interface was much quicker.

Some mock-test sites I considered required paid subscriptions. ChatGPT conversations were awkward for hiding answers and navigating by review priority, and preparing separate flashcards felt like extra work. A small site could use my existing YAML directly.

It let me:

- answer before revealing the explanation and learning note;
- filter by exam skill, sub-skill, or `must-review`, and exclude `skip-review` questions;
- keep review marks across sessions and sync them across devices when signed in.

{% include article-figure.html
  src="/assets/images/posts/az104-mock-test-site.jpg"
  alt="AZ-104 mock-test screen showing a question with its answer hidden, must-review and skip-review controls, and a question navigator."
  caption="The structured question becomes a practice screen, with review priorities beside it and the answer hidden until I check."
  kind="screenshot" %}

When revisiting the redundancy question, I would answer first, then reveal the note to check my understanding. That completed the loop: the misconception became something I deliberately tested again.

### 4. Check the gaps before the exam

I also asked Codex to compare the bank with the current exam objectives. Broad topic coverage still left gaps, such as explicit practice on "encryption at host". It generated **20 supplemental practice scenarios** in `2026.yaml`; these were AI-generated study material, not official exam questions.

Finally, I asked it to summarize my recorded mistakes into review notes. This gave me a focused revision list instead of another reason to reread the entire syllabus.

The three-week deadline kept the process practical, but it also limited how much I checked. Next time, I would spend more time on labs and test corrected concepts with fresh scenarios. 

## Sharing is caring

I’m opening up the work from my preparation to help others studying for AZ-104. There are three pieces you can use:

- **[Codex instructions — AGENT.md](https://github.com/6chaoran/az104-exam-preparation/blob/main/AGENT.md):** adapt the workflow for breaking down questions, checking sources, and recording what you learn.
- **[Processed question bank](https://github.com/6chaoran/az104-exam-preparation/tree/main/past_questions):** explore the questions, explanations, skill categories, and learning notes, or use the structure for your own material.
- **[AZ-104 mock-test site](https://az104-mock-practice.ichaoran.com/):** try focused practice with hidden answers and personal review priorities.

I hope sharing the repository and question bank saves you some setup time and helps you spend more of it learning. The explanations are study aids; check uncertain answers against current documentation.

To me, AI is becoming an everyday commodity: readily available help with explanations, organization, and building tools. It is also changing how I learn. I can turn my own mistakes into study material and shape the practice around what I need to understand next.

That is the habit I want to keep: attempt, reflect, save the lesson, and test it again.
