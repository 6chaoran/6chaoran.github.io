---
title: "OCR Evaluation, Rebuilt for Insurance Claims in GenAI Era"
date: 2026-06-30
toc: true
toc_sticky: true
categories:
- thoughts
- LLM
- OCR
excerpt: "Processing scanned claim PDFs used to be “good enough” if the text was mostly readable. In the GenAI era, that’s no longer true: if OCR misses a checkbox, scrambles a table, or loses layout context, the document becomes unreliable for extraction, retrieval, and automated decisions. Insurance makes this worse—many documents are old, low-quality scans with handwriting and dense forms—so we need evaluation that reflects real usability, not just character-perfect transcription." 
--- 

## Motivations

Processing unstructured scanned PDF documents has become non-trivial as more companies see the value of using GenAI/LLMs/RAG to unlock new insights and improve productivity. In the insurance domain, many historical documents are scanned and low quality. Digitizing them so they are usable for downstream LLM applications is increasingly challenging. 

Traditional OCR mainly targets text reconstruction, and common metrics focus on character-level (CER) and word-level error rates (WER). Today, what we need is more layout-aware and semantically grounded understanding of documents. “Document Intelligence” may be a better term for the task.

We searched online for an established OCR/Document Intelligence evaluation framework. The closest benchmark we found is the [OmniAI OCR Benchmark](https://getomni.ai/blog/ocr-benchmark).

<div style="background-color: #f0f0f0; display: inline-block; padding: 10px; border-radius: 1rem;">
  <img src="https://framerusercontent.com/images/0a2TPawpmgA43BwCsRaLVNBkLtQ.png" alt="OmniAI OCR Benchmark method">
</div>

The best part of this framework is that it doesn’t evaluate the raw OCR output directly (which can be massive and hard to compare). Instead, it extracts structured information using a defined schema, making comparisons measurable. This approach has become practical now that LLMs are strong enough to generate JSON reliably.

However, we find the `JSON accuracy` metric too strict because it relies on exact-match comparisons of extracted values. This motivates us to enhance the framework to better fit our evaluation needs.

## Our approach

  <img src="/assets/images/posts/ocr-evals-our-approach.jpg" alt="Diagram-of-our-approach">

1. Define the critical fields that matter and include them in a JSON schema. For each field, we also add metadata (e.g., checkbox, numeric, dates, handwriting, tables) to capture performance along different challenging dimensions.
2. For pages of interest, annotate only the critical fields in the schema. This saves substantial effort compared to labeling everything.
3. Convert the schema into a `pydantic` model and use JSON mode to extract structured outputs from OCR’ed text.
4. When comparing predicted vs. annotated `JSON`, apply basic text normalization and use a suite of metrics with increasing semantic tolerance:
    1. **Exact match** (strict): best for numbers, dates, and categorical variables (e.g., gender, marital status)
    2. **NLP overlap metrics**: ROUGE-L and BLEU for short spans
    3. **Semantic similarity**: word/sentence embeddings for longer free-text fields
    4. **LLM-as-a-judge** with objective rubrics for tables
5. Aggregate scores across fields and compare them across OCR candidates for benchmarking.

## OCR eval in practice

We collected user feedback on OCR issues and grouped it into several broad categories.

Over two days, we annotated 600+ fields and used them as the basis for a preliminary OCR evaluation.

Here are a few observations from insurance claim documents:

1. A mainstream document intelligence model (Azure Read prebuilt) significantly outperformed Tesseract (our open-source baseline).
2. Traditional OCR performs well on printed text, numbers, and some handwriting, but still struggles with doctor’s handwriting, tables, complex layouts (e.g., form understanding), and certain checkmarks.
3. Vision-language models (we tested [MiniCPM-V-2.6](https://huggingface.co/openbmb/MiniCPM-V-2_6)) can hallucinate—especially for numbers and dates. On pages with dense or complex layouts, they also tend to stop mid-generation.

## Other considerations

1. **Bounding boxes / polygons**: preferable, since they enable visual grounding and downstream applications.
2. **Confidence scores**: preferable, since they enable quality monitoring and human review workflows.
3. **Robustness, speed, and cost**: traditional OCR is still the practical default.
4. **Output format**: Markdown is often preferable to plain text because it preserves layout cues.

## Final recommendations

A mainstream document intelligence model is usually enough to prototype quickly and cover ~80% of typical document-ingestion needs.

Vision-language models look attractive, but we don’t recommend them as a primary OCR solution—at least for our use case.

In practice, we want traditional OCR to provide:

- bounding boxes (for grounding)
- confidence scores (for QA and human-in-the-loop)

We also explored combining traditional OCR and VLMs to get the best of both worlds. Two promising approaches:

1. Feed the page image *and* OCR’ed text/Markdown into a VLM, with prompts designed to correct foreseeable OCR issues.
2. Use layout-aware OCR to segment the page, then route only low-confidence regions (bounding boxes/segments) to a VLM—balancing quality gains against VLM cost.

Finally, evaluation shouldn’t be a one-and-done exercise. As OCR models improve (or as your ingestion mix shifts), new failure modes will surface—new templates, lower-quality scans, handwriting styles, stamps, and table layouts. Your benchmark should evolve with these realities: continuously add fresh, challenging examples and refine the scoring rubric so the test stays representative and discriminative. When the benchmark becomes “too easy,” that’s the signal to raise the bar and upgrade the evaluation—not to declare victory.