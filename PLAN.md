# Personal AI Blog Upgrade Plan

## Executive recommendation

Keep Jekyll for now. The site is fast, stable, already indexed, has 37 posts and working archives, and does not yet need application-like features. The highest-return upgrade is not a framework migration; it is a sharper personal position, a purpose-built homepage, cleaner content taxonomy, and more deliberate presentation of projects and essays.

The strongest credible position already visible in the recent work is:

> Practical AI applications, architecture, system design, and working prototypes—from early ideas and pilots to production systems.

This is more distinctive than a general “AI blog” and more current than “a data science self-learning journey.” It connects the strongest recent posts on claims, underwriting, OCR/document intelligence, RAG, DSPy, and production engineering without discarding the older archive.

## Audit scope and evidence

This review covers the repository structure and content plus the live desktop experience at `www.ichaoran.com` on 2026-08-09.

Reader journey reviewed:

1. **Homepage — functional, but weak as a personal-brand landing page.** Recent posts are easy to scan, but an empty H1 and generic author rail mean the page does not explain what Chaoran does, who the writing is for, or what a new reader should explore first.
2. **Projects — visually strongest section.** The card layout, real screenshots/video, summaries, tags, and explicit actions communicate applied work well. It still describes the portfolio as general “data science” and does not foreground AI/document intelligence.
3. **About — readable, but outdated.** It tells a warm origin story from 2015, yet stops at becoming interested in data science and does not establish current expertise, experience, point of view, or future AI focus.
4. **Article — strong long-form reading experience.** The claims article has a clear title, useful table of contents, diagrams, concrete lessons, and related content. The persistent author rail consumes substantial width and repeats an outdated bio; metadata and next actions could be stronger.

Accessibility-positive observations: skip links exist, headings are mostly structured, project media has meaningful alternative text, keyboard focus styling is present on the custom project cards, and article navigation is labeled. Verification still needed: keyboard traversal, visible focus across theme controls, contrast in both themes, zoom/reflow at 200–400%, screen-reader behavior of the search overlay and Disqus iframe, reduced-motion behavior, and mobile layouts.

Build note: `bundle exec jekyll build` reached the remote-theme download and then failed because this environment could not resolve `codeload.github.com`. That is a network/dependency-fetch limitation, not evidence of a template error. The repository currently uses GitHub Pages 223 / Jekyll 3.9.0 and a comment indicating Minimal Mistakes 4.20.2.

## What is already working

- The custom domain `ichaoran.com` is short, personal, pronounceable, and broad enough to survive changes in topic.
- The latest posts form a coherent body of real-world AI material rather than generic tutorials.
- The insurance/document-intelligence angle supplies uncommon domain credibility.
- The site owns a decade-long learning archive, which demonstrates continuity and should be curated rather than hidden or deleted.
- Articles use diagrams, concrete examples, takeaways, and implementation detail.
- The Projects page already feels more authored and contemporary than the stock theme pages.
- GitHub Pages keeps operating cost and publishing complexity low.

## Highest-impact problems

### 1. The stated identity trails the actual work

Current labels such as **“Chaoran's Data Story,” “A data science self-learning journey,”** and **“A data science enthusiast”** position the author as an early learner. Recent posts demonstrate production experience and a specific point of view. This is the biggest credibility leak because it appears in the masthead, homepage, sidebar, metadata, and About page.

### 2. The homepage is an archive, not an introduction

The first screen offers no visible page title, positioning statement, featured work, topic entry points, or subscription/follow action. New visitors must infer the site's purpose from post titles.

### 3. The taxonomy reflects accumulation rather than editorial intent

Categories mix formats (`thoughts`, `guide`), technologies (`LLM`, `RAG`, `OCR`), application areas (`claims`, `underwriting`), and legacy disciplines (`visualization`, `deep-learning`, `data-engineering`). Capitalization is inconsistent (`WebApp`, `LLM`). This makes “Topics” less useful and weakens internal linking.

### 4. The visual system is split between stock theme and custom portfolio

The Projects page has a modern card system and clearer hierarchy, while the homepage, About page, and articles mostly retain the stock Minimal Mistakes appearance. Large desktop widths, the repeated author sidebar, small base article sizing (`.page { font-size: 0.8em; }`), and muted generic branding make the site feel older than the content.

### 5. The About page does not convert credibility into a memorable story

The current copy is personable but ornate and generic. It omits current focus, representative outcomes, the intended audience, a concise professional arc, and a clear invitation to connect or read a flagship series.

### 6. Technical and trust details need maintenance

- The theme/toolchain is several generations behind current Jekyll-era tooling and depends on downloading a remote theme at build time.
- The repository contains an untracked `_algolia_api_key`; even a search-only key should be treated intentionally, documented, and named so it cannot be confused with a write/admin credential.
- Disqus and old Twitter/Facebook share buttons add third-party scripts and visual clutter; their value should be measured.
- SEO/person metadata is incomplete (`social.type`, `social.name`, profile links, site-wide fallback teaser).
- The README only documents three commands and does not explain architecture, writing workflow, image conventions, local Ruby version, deployment, or taxonomy.

## Recommended brand direction

### Preferred naming system

- **Site title:** `Chaoran's Applied AI Notes`
- **Descriptor:** `AI applications, architecture, system design, and working prototypes`
- **Short bio:** `I build practical AI applications and share the architectures, prototypes, and lessons behind them.`
- **Editorial promise:** `Practical notes for turning AI ideas into working pilots—and pilots into production systems.`

This keeps the site personal without making the author's name the entire brand. It supports technical writing, portfolio work, startup and SME pilots, and enterprise projects without defining the site around regulation or a single industry.

### Alternative site names

1. **Applied AI Field Notes** — professional and experience-led; best reserved for a newsletter or recurring series.
2. **From Demo to Dependable** — memorable and aligned with the strongest production-AI thesis; better as a newsletter or recurring series name than the whole site.
3. **The AI Fieldbook** — accessible and editorial, but less ownable and less personal.
4. **AI Systems in Practice** — technical and authoritative, but less personal than the selected title.
5. **Document Intelligence in Practice** — excellent as a topic hub or series, too restrictive as the umbrella brand.

Avoid generic names built from “AI + insights/lab/journey.” They are crowded, difficult to own, and undersell the domain experience.

### Domain recommendation

Keep `ichaoran.com` and redirect the bare domain consistently to the preferred canonical host. It is already a good long-term personal domain. A migration would spend SEO and reader recognition without fixing the positioning problem.

Optional domains should be campaign redirects only, subject to availability and trademark checks:

- `chaoran.ai` — clean personal redirect if reasonably priced.
- `appliedainotes.com` — descriptive but longer.
- `demotodependable.com` — useful for a future newsletter/series.
- `decisiongrade.ai` — useful only if deliberately building a niche publication.

Do not change domains merely to obtain an `.ai` suffix.

## Content architecture

### Four durable pillars

Use one primary pillar per post and tags for secondary concepts.

1. **AI Engineering** — system design, orchestration, deployment, performance, observability, private/internal model integration.
2. **Evaluation & Reliability** — eval design, metrics, feedback loops, regression testing, evidence, quality assurance.
3. **Document Intelligence** — OCR/VLM, extraction, layout, retrieval, citations, critical fields.
4. **AI in Practice** — applications, adoption, product lessons, pilot delivery, business workflows, and team practices.

Keep **Archive** as the home for older data science, R, visualization, recommendation, and Kaggle material. Archive is a time dimension, not a fifth competing pillar.

### Formats

Express format separately from topic:

- `Field Note` — concise observation or experiment.
- `Guide` — reproducible implementation.
- `Case Study` — problem, constraints, decisions, result, lessons.
- `Essay` — argument or framework.
- `Project` — a maintained artifact with demo/source links.

Add front matter such as `pillar`, `format`, `featured`, and `series`; keep `tags` for technologies and domain nouns. Generate topic pages from this controlled vocabulary.

### Initial remapping examples

- Claims production lessons → `AI in Practice` / `Case Study`; tags: `insurance`, `claims`, `production-ai`, `feedback-loops`.
- Critical-field extraction → `Document Intelligence` / `Essay`; tags: `underwriting`, `structured-extraction`, `evidence`.
- OCR evaluation → `Evaluation & Reliability` / `Case Study`; tags: `document-intelligence`, `ocr`, `insurance`.
- DSPy internal endpoint → `AI Engineering` / `Guide`; tags: `dspy`, `private-llm`, `enterprise-ai`.
- RAGFlow integration → `AI Engineering` / `Guide`; tags: `rag`, `private-llm`, `ragflow`.

Preserve existing post URLs. Change front matter and archive presentation, not permalinks.

### Editorial series worth building

- **From Demo to Dependable** — productionization, evaluation, observability, human feedback, change management.
- **Document Intelligence in Practice** — OCR/VLM, retrieval, structured extraction, citations, decision-grade evidence.
- **Enterprise AI Patterns** — internal endpoints, security constraints, deployment architecture, testing.
- **Build Notes** — short, frequent notes tied to public demos or code.

The first two series provide the clearest differentiation. Add series landing pages that give readers an ordered path, not just a tag dump.

### Suggested next posts

1. “A Reference Architecture for Decision-Grade Document AI”
2. “How We Build an Evaluation Set Before We Tune the Prompt”
3. “OCR vs. Vision-Language Models: Choosing by Failure Mode”
4. “Designing Evidence and Citations for Human Review”
5. “A Practical Regression Suite for LLM Workflows”
6. “What to Log in a Production GenAI Pipeline”
7. “When RAG Is the Wrong Fix for Missing Information”
8. “The Fast Loop and the Domain Loop: A Review System Template”

Each substantial article should ship with one reusable artifact: checklist, diagram, evaluation schema, notebook, small repo, or decision table. This turns the blog from a set of opinions into a professional reference library.

## Recommended information architecture

Primary navigation:

- **Home**
- **Writing**
- **Topics**
- **Projects**
- **About**

Optional later addition: **Now** or **Newsletter**, only if it will be maintained.

`Writing` should replace “Posts” and default to recent work with filters for pillar and format. `Topics` should expose the four curated pillars and the two flagship series. Keep a clearly labeled `Archive: 2015–present` for chronological browsing and older topics.

## Page-by-page layout plan

### Homepage

Replace the stock home archive with an authored landing page:

1. **Hero:** name, one-sentence position, short supporting line, photo, and two actions: `Read the latest` and `Explore projects`.
2. **Featured thesis:** one flagship essay or series, preferably “From Demo to Dependable.”
3. **Latest writing:** three to five cards with pillar, format, date, title, and a concise outcome-led excerpt.
4. **Explore by problem:** four pillar cards written in reader language.
5. **Selected work:** two or three AI-relevant projects with outcome, role, status, and source/demo/case-study links.
6. **Proof and perspective:** a compact timeline or facts strip (writing since 2015, applied AI focus, Singapore, open-source work) without turning the page into a résumé.
7. **Follow:** RSS, LinkedIn, and GitHub. Add email only when there is a real newsletter cadence and privacy policy.

Remove the desktop author sidebar from the homepage. It duplicates the hero and constrains the content column.

### Article pages

- Use a centered reading column around 680–760px and a comfortable base size around 18px; remove the global `0.8em` reduction.
- Keep the table of contents on wide screens, but move author information to a compact byline under the title.
- Add publication date, updated date when materially revised, pillar, format, and series.
- Add a one- or two-sentence “What you will learn” dek for long guides.
- End with `Key takeaways`, one relevant next article/series link, and then social/follow actions.
- Replace generic related-post matching with editorially selected `recommended` links for cornerstone posts.
- Add code-copy controls, consistent captions, visible link styling, and image dimensions to reduce layout shift.
- Consider removing Facebook/Twitter share controls; retain copy-link and LinkedIn if analytics show use.

### Topics / writing archive

- Lead with the four controlled pillars and descriptions.
- Provide a chronological list below, grouped by year.
- Show format and pillar consistently on every row/card.
- Do not expose dozens of low-volume tag/category headings as the primary experience.
- Keep search, but make it a supplement rather than the only route through the archive.

### Projects

Retain the current design foundation. Improve each entry with:

- the problem and audience;
- Chaoran's role and key decisions;
- status (`maintained`, `experiment`, `archived`);
- a concrete result or learning;
- explicit `Demo`, `Source`, and `Case study` actions;
- privacy/safety notes for health, camera, immigration, or personal-data tools;
- AI relevance where genuine, without relabeling every data project as AI.

Lead with work that reinforces the intended AI position. Move legacy projects to an “Earlier work” section.

### About

Rewrite around four short sections:

1. **Now:** what you build and study today.
2. **Point of view:** reliable AI is a systems and evaluation problem, not only a model problem.
3. **Path:** chemical engineering → industrial engineering → data science → applied/production AI.
4. **This site:** who it helps, what formats to expect, and where to start.

End with three links: `Start with the production AI series`, `View projects`, and `Connect on LinkedIn`.

## Visual direction

Aim for “technical field notebook,” not “AI neon.” Preserve the calm teal already present but make the system intentional:

- Neutral warm or cool-white canvas, near-black text, teal accent, and one restrained amber/coral highlight for evidence or warnings.
- A modern sans-serif for interface/metadata and a highly readable serif or humanist sans for essays.
- Consistent spacing, border, radius, caption, code, callout, and diagram tokens shared by every page.
- Text or a simple personal monogram in the masthead; the current tiny photographic logo is indistinct.
- Use real project imagery and authored diagrams. Avoid generic robots, brains, circuit patterns, and stock AI gradients.
- Give diagrams a repeatable house style and include accessible alt text plus a written explanation.
- Support dark mode only if every custom component, diagram, syntax theme, and focus state is tested; otherwise ship one excellent theme first.

## Framework decision

### Recommendation: stay on Jekyll for the next release

Jekyll remains sufficient for a writing-first personal site. It offers stable URLs, GitHub Pages compatibility, Markdown authoring, low operating cost, and minimal client JavaScript. Migrating now would not solve the brand, taxonomy, or homepage problems.

Modernize within Jekyll first:

- Pin and document the Ruby/Bundler version.
- Update GitHub Pages/theme dependencies in a dedicated branch and test generated URL parity.
- Consider vendoring/forking the theme or using a pinned remote-theme reference so builds are reproducible and deeper design changes are controlled.
- Add CI for build, HTML validation, internal-link checking, accessibility smoke tests, and a small visual regression set.
- Add a content linter for required front matter and the controlled pillar/format vocabulary.
- Generate responsive image variants and set width/height attributes.

### Reconsider Astro when one of these becomes true

- The custom design is fighting theme overrides on most pages.
- Interactive demos or components become central to articles.
- MDX/component authoring is worth a Node-based toolchain.
- Build/plugin limitations materially slow publishing.
- A redesign is large enough that templates are being rebuilt anyway.

If migrating, Astro is the best fit: content collections, static output, component islands, strong image handling, and easy custom layouts. Preserve every existing permalink and add redirects before launch. Hugo is excellent for raw build speed but offers less benefit for this site's likely component direction. Next.js is unnecessary unless the site becomes a web application with server features, accounts, or dynamic personalized content.

## SEO, distribution, and trust

- Fill `social.type: Person`, `social.name`, and profile links; use a professional site-wide Open Graph image rather than the favicon.
- Give every new post a designed 1200×630 social image and a plain-language meta description.
- Add Person, WebSite, BreadcrumbList, and BlogPosting structured data; validate generated markup.
- Publish an RSS link visibly. Consider a lightweight JSON Feed only if useful to the audience.
- Add canonical checks and redirects for `ichaoran.com` versus `www.ichaoran.com`.
- Create cornerstone topic/series pages to earn search authority around specific problems rather than chasing generic “AI” keywords.
- Link related articles deliberately and revisit older high-traffic articles with a dated note pointing to current guidance.
- Add a short content policy: opinions are personal, examples are sanitized, and no confidential/customer data is shared.
- For AI-assisted writing or diagrams, disclose the editorial policy plainly if assistance is material; emphasize that experience, claims, and verification remain the author's responsibility.
- Measure outcomes that support the personal brand: engaged reading, return visits, project/source clicks, RSS/newsletter follows, and inbound professional conversations—not page views alone.

## Implementation roadmap

### Phase 0 — Baseline and safety (1–2 days)

- [ ] Record current URLs (done) and add private analytics values for top landing pages, search queries, and outbound clicks (template ready; requires analytics access/export).
- [x] Add a link checker and confirm all 37 post permalinks.
- [x] Audit repository secrets and clarify `_algolia_api_key`; never commit an admin/write key.
- [x] Pin the local Ruby/Bundler workflow and add a reproducible production-build workflow.
- [x] Define matching desktop/mobile visual-baseline routes and viewport sizes; keep binary captures in the release/QA artifact rather than Git.

Success: clean CI build, no broken internal links, and a rollback point.

### Phase 1 — Positioning and copy (2–4 days)

- [x] Adopt the `Chaoran's Applied AI Notes` title and applications/architecture descriptor across config, author bio, SEO, and masthead.
- [x] Rewrite About and the Projects introduction.
- [x] Define the four pillars and five formats in a short editorial guide.
- [x] Map all posts to the new taxonomy without changing URLs.
- [x] Select three cornerstone articles and two flagship series.

Success: a new visitor can describe the site's focus after reading only the masthead and hero.

### Phase 2 — Core experience (4–8 days)

- [x] Build the custom homepage.
- [x] Replace the sidebar-heavy article shell with the new reading layout.
- [x] Build curated Writing and Topics pages plus the legacy Archive.
- [x] Reorder Projects and add role/status/outcome fields.
- [x] Introduce shared visual tokens and responsive typography.

Success: Home → article/series/project paths are obvious on desktop and mobile; article text passes comfortable reading and zoom checks.

### Phase 3 — Publishing system (3–6 days)

- [x] Create post templates for Guide, Case Study, Essay, and Field Note.
- [x] Add required front-matter validation.
- [x] Standardize diagram, caption, code, callout, and social-card workflows.
- [x] Add curated recommendations and series navigation.
- [x] Upgrade SEO metadata and structured data.

Success: a new post can be published consistently without manual layout decisions.

### Phase 4 — Quality and distribution (ongoing)

- [ ] Run keyboard, screen-reader, contrast, zoom, and reduced-motion checks.
- [ ] Remove or retain Disqus/share scripts based on actual value and privacy cost.
- [ ] Refresh one useful legacy post per month with a current-status note.
- [ ] Publish within the two flagship series on a sustainable cadence, such as two substantial posts plus one short field note per month.
- [ ] Review analytics quarterly and improve the reader paths that produce meaningful engagement.

Success: publishing remains sustainable, readers move between related work, and the site generates relevant professional conversations.

## Definition of done for the first upgrade release

- The homepage names the author, current focus, intended audience, and two clear next actions above the fold.
- The old “data science enthusiast/self-learning journey” language is removed from global surfaces.
- All posts use a controlled pillar and format; old URLs still resolve.
- Articles have a readable mobile/desktop layout, visible focus, usable TOC, and intentional next step.
- Projects distinguish current AI-relevant work from earlier work and include role/status/outcome.
- About explains current work and point of view, not only the 2015 origin story.
- Production build, link check, metadata check, and accessibility smoke tests run in CI.
- Canonical domain, RSS, social cards, and Person/BlogPosting metadata validate.

## Recommended first decision

Approved positioning bundle for the layout work:

> **Chaoran's Applied AI Notes**  
> *AI applications, architecture, system design, and working prototypes*  
> I build practical AI applications and share the architectures, prototypes, and lessons behind them.

This is the organizing constraint for the homepage, topics, project order, About copy, portfolio presentation, and future editorial series. The audience includes startups, SMEs, enterprise teams, and practitioners building their own AI applications; financial-enterprise experience is supporting credibility rather than the defining theme.
