---
layout: single
title: "Featured Projects"
show_title: false
permalink: /projects/
author_profile: true
classes: wide

projects:
  - id: sgp1
    updated: "2026-08-01"
    image_path: assets/images/projects/sgp1.png
    video_path: assets/videos/projects/sgp1-school-finder-promo.mp4
    project_url: https://sgp1.ichaoran.com
    alt: "Promo video for the Singapore Primary School Registration Companion"
    title: "Singapore Primary School Registration Companion"
    summary: "A planning companion that helps parents compare school options and make more informed Primary One registration decisions."
    role: "Product design, data pipeline, decision logic, and implementation"
    status: "Working product"
    outcome: "Turns scattered registration data into a focused comparison and planning workflow for parents."
    tags:
      - Nuxt
      - Firebase
      - TailwindCSS

  - id: vital-sign-prediction
    updated: "2024-08-24"
    image_path: assets/images/projects/header-vital-sign-prediction.png
    alt: "Vital sign prediction demo showing estimated pulse and respiratory measurements"
    title: "A Live Demo of Predictive Vital Measurement"
    summary: "An in-browser demo that estimates age, BMI, heart rate, and respiratory rate while keeping camera data on the user's device."
    role: "Model deployment and browser application"
    status: "Research prototype"
    outcome: "Demonstrates privacy-aware, on-device inference without uploading camera frames."
    project_url: "/posts/2021-06-11-bmi-prediction-using-tfjs/"
    case_url: "/posts/2021-06-11-deploy-deep-learning-models-in-browser-using-tfjs/"
    tags:
      - TensorFlow.js
      - rPPG
      - Edge AI

  - id: summarytools
    updated: "2024-08-24"
    image_path: assets/images/projects/summarytools-header.png
    alt: "DataFrame summary output in a Jupyter Notebook"
    title: "DataFrame Summary Tool in Jupyter Notebook"
    summary: "A Python implementation of summarytools for generating standardized, comprehensive DataFrame summaries inside Jupyter."
    role: "Open-source package design and maintenance"
    status: "Open source"
    outcome: "Makes repeatable exploratory data summaries available inside Python notebooks."
    project_url: https://pypi.org/project/summarytools
    case_url: "/posts/2021-03-11-summarytools-for-jupyter-notebook/"
    source_url: https://github.com/6chaoran/jupyter-summarytools
    tags:
      - Python
      - Pandas
      - Jupyter
      - Open source

  - id: sgpr-profiler
    updated: "2024-08-24"
    image_path: assets/images/projects/sprapp.png
    alt: "SGPR Profiler web application showing recent assessment records"
    title: "Singapore PR Profile Assessment App"
    summary: "A profile assessment app that estimates PR residency odds from voluntarily contributed records and shares high-level insights."
    role: "Product design, data analysis, and implementation"
    status: "Experiment"
    outcome: "Explores how community-contributed records can support clearer self-assessment."
    project_url: https://spr.ichaoran.com
    case_url: "/posts/2023-06-16-sgprprofile-vue-demo/"
    tags:
      - Python
      - Streamlit
      - Pandas
      - Data analysis

  - id: med-doc-parser
    updated: "2024-08-17"
    image_path: assets/images/projects/med-doc-parser.png
    alt: "Medical Document Parser web application"
    title: "Medical Document Parser"
    summary: "A web app that turns photos and PDFs of medical reports into structured tables for easier review of personal health history."
    role: "Document pipeline and application implementation"
    status: "Prototype"
    outcome: "Converts difficult-to-review medical documents into a structured personal history."
    project_url: https://med-doc-parser.ichaoran.com
    tags:
      - Python
      - OCR
      - Streamlit
      - Pandas
---

<div class="projects-page">
  <section class="projects-intro" aria-labelledby="projects-intro-copy">
    <div class="projects-intro__content">
      <p class="projects-eyebrow">Selected work · {{ page.projects | size }} projects</p>
      <p id="projects-intro-copy" class="projects-intro__copy">
        Applied AI and data products built around practical decisions, privacy-aware workflows, and useful tools. Recent work leads; earlier projects remain as a record of learning in public.
      </p>
    </div>
  </section>

  {% assign sorted_projects = page.projects | sort: "updated" | reverse %}
  <section class="projects-list" aria-label="Project portfolio">
    {% for project in sorted_projects %}
      <article class="project-card" id="{{ project.id }}">
        <div class="project-row__media">
          {% if project.video_path %}
            <video controls playsinline preload="metadata" poster="{{ project.image_path | relative_url }}" aria-label="{{ project.alt }}">
              <source src="{{ project.video_path | relative_url }}" type="video/mp4">
              Your browser does not support embedded video.
              <a href="{{ project.video_path | relative_url }}">Download the video</a> instead.
            </video>
          {% else %}
            <a href="{{ project.project_url }}"{% if project.project_url contains '://' %} target="_blank" rel="noopener noreferrer"{% endif %} aria-label="View {{ project.title }}">
              <img src="{{ project.image_path | relative_url }}" alt="{{ project.alt }}" loading="lazy">
            </a>
          {% endif %}
        </div>

        <div class="project-row__content">
          <p class="project-row__meta"><time datetime="{{ project.updated }}">Updated {{ project.updated | date: "%b %Y" }}</time> · {{ project.status }}</p>
          <h2><a href="{{ project.project_url }}"{% if project.project_url contains '://' %} target="_blank" rel="noopener noreferrer"{% endif %}>{{ project.title }}</a></h2>
          <p class="project-row__summary">{{ project.summary }}</p>
          <dl class="project-details"><div><dt>Role</dt><dd>{{ project.role }}</dd></div><div><dt>Outcome</dt><dd>{{ project.outcome }}</dd></div></dl>

          <ul class="project-tags" aria-label="Technologies used">
            {% for tag in project.tags %}
              <li>{{ tag }}</li>
            {% endfor %}
          </ul>

          <div class="project-actions">
            <a class="project-action project-action--primary" href="{{ project.project_url }}"{% if project.project_url contains '://' %} target="_blank" rel="noopener noreferrer"{% endif %}>
              Explore project <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            {% if project.case_url %}
              <a class="project-action project-action--secondary" href="{{ project.case_url | relative_url }}">
                <i class="far fa-file-alt" aria-hidden="true"></i> Case study
              </a>
            {% endif %}
            {% if project.source_url %}
              <a class="project-action project-action--secondary" href="{{ project.source_url }}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i> Source code
              </a>
            {% endif %}
          </div>
        </div>
      </article>
    {% endfor %}
  </section>
</div>

<style>
  .page__title {
    margin-bottom: 0.35rem;
    color: #17212b;
    font-size: clamp(2rem, 4vw, 3.25rem);
    letter-spacing: -0.035em;
  }

  .projects-page {
    --projects-accent: var(--brand-primary);
    --projects-accent-dark: var(--brand-primary-hover);
    --projects-text: #1e2935;
    --projects-muted: #64707c;
    --projects-border: #dce4e8;
    --projects-surface: #f6f9fa;
    max-width: 82rem;
    color: var(--projects-text);
  }

  .page__content p {
    margin: 0
  }

  .projects-intro {
    padding: clamp(1.25rem, 2.5vw, 1rem) 0;
  }

  .projects-eyebrow,
  .project-row__meta {
    margin: 0;
    color: var(--projects-accent-dark);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .projects-intro__copy {
    max-width: 46rem;
    margin: 0.7rem 0 0;
    color: #3e4a56;
    font-size: clamp(1.05rem, 1.7vw, 1.3rem);
    line-height: 1.6;
  }

  .project-row__content h2 a:focus-visible {
    border-radius: 0.2rem;
    outline: 3px solid var(--brand-focus);
    outline-offset: 3px;
  }

  .projects-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(1.25rem, 2.5vw, 2rem);
  }

  .project-card {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.95fr);
    min-width: 0;
    overflow: hidden;
    align-items: stretch;
    border: 1px solid var(--projects-border);
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 0.25rem 1rem rgba(28, 48, 61, 0.05);
    transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
  }

  .project-card:hover {
    border-color: #b8cbd2;
    box-shadow: 0 0.8rem 2rem rgba(28, 48, 61, 0.1);
    transform: translateY(-3px);
  }

  .project-row__media {
    overflow: hidden;
    min-height: 19rem;
    background: #f3f5f6;
  }

  .project-row__media a,
  .project-row__media img,
  .project-row__media video {
    display: block;
    width: 100%;
    height: 100%;
  }

  .project-row__media img,
  .project-row__media video {
    object-fit: cover;
  }

  .project-row__media img {
    transition: transform 400ms ease;
  }

  .project-card:hover .project-row__media img {
    transform: scale(1.025);
  }

  .project-row__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: clamp(1.25rem, 2.5vw, 2rem);
  }

  .project-row__meta {
    margin-bottom: 0.65rem;
    color: #75818c;
    font-size: 0.64rem;
  }

  .project-row__content h2 {
    margin: 0 0 0.75rem;
    font-size: clamp(1.25rem, 2vw, 1.65rem);
    line-height: 1.25;
    letter-spacing: -0.015em;
  }

  .project-row__content h2 a {
    color: var(--projects-text);
    text-decoration: none;
  }

  .project-row__content h2 a:hover {
    color: var(--projects-accent);
  }

  .project-row__summary {
    max-width: 44rem;
    margin: 0;
    color: #4f5a65;
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
  }

  .project-tags li {
    margin: 0;
    padding: 0.28rem 0.58rem;
    border: 1px solid #acd0da;
    border-radius: 0.25rem;
    color: #317284;
    background: #f8fcfd;
    font-size: 0.72rem;
    font-weight: 500;
    line-height: 1;
  }

  .project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    align-items: center;
    margin-top: auto;
    padding-top: 1.35rem;
  }

  .project-action {
    display: inline-flex;
    gap: 0.55rem;
    align-items: center;
    justify-content: center;
    min-height: 2.55rem;
    font-size: 0.84rem;
    font-weight: 600;
    text-decoration: none !important;
    transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
  }

  .project-action:hover {
    transform: translateY(-1px);
  }

  .project-action:focus-visible {
    outline: 3px solid rgba(8, 124, 152, 0.25);
    outline-offset: 3px;
  }

  .project-action--primary,
  .project-action--primary:visited {
    padding: 0.6rem 0.95rem;
    border: 1px solid var(--projects-accent);
    border-radius: 0.5rem;
    color: #fff;
    background: var(--projects-accent);
  }

  .project-action--primary:hover,
  .project-action--primary:focus,
  .project-action--primary:active {
    border-color: var(--projects-accent-dark);
    color: #fff;
    background: var(--projects-accent-dark);
  }

  .project-action--secondary {
    color: var(--projects-accent-dark);
  }

  .project-action--secondary:hover {
    color: var(--projects-accent-dark);
  }

  @media (max-width: 64rem) {
    .project-card {
      grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.9fr);
    }
  }

  @media (max-width: 48rem) {
    .page__title {
      display: none;
    }

    .projects-intro {
      display: none;
    }

    .project-card {
      grid-template-columns: 1fr;
    }

    .project-row__media {
      min-height: 0;
      aspect-ratio: 16 / 9;
    }

    .project-row__content h2 {
      font-size: 1.35rem;
    }

    .project-row__summary {
      font-size: 0.92rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-card,
    .project-action,
    .project-row__media img {
      transition: none;
    }

    .project-card:hover,
    .project-action:hover,
    .project-card:hover .project-row__media img {
      transform: none;
    }
  }
</style>
