# Phase 0 Site Baseline

Captured: 2026-08-09  
Canonical site: <https://www.ichaoran.com>  
Repository baseline commit: `6c4b64e77194ac178f65a994c00f13560d1edd61`

## Content and routes

- Published posts: **37**
- Post permalink contract: `/posts/:year-:month-:day-:title/`
- Pagination: 5 posts per page
- Primary routes:
  - `/`
  - `/projects/`
  - `/year-archive/`
  - `/categories/`
  - `/about/`
  - `/about/zh/`
  - `/search/`
  - `/sitemap/`
- Canonical host configured in `_config.yml`: `https://www.ichaoran.com`
- Custom domain in `CNAME`: `www.ichaoran.com`

`ruby tools/check_site.rb` treats the 37 current post filenames and their generated permalinks as the Phase 0 URL contract. If a post is intentionally added, removed, or renamed, update the expected count in the checker as part of that reviewed change. Existing URLs should be redirected rather than silently removed.

## Reader-flow baseline

The live desktop review covered:

1. Home: recent-post list and author sidebar.
2. Writing: `/year-archive/`.
3. Topics: `/categories/`.
4. Projects: custom five-project portfolio.
5. About: English biography and blog origin story.
6. Long-form case study: `/posts/2026-07-15-claims-ai-hard-earned-lessons/`.
7. Technical guide: `/posts/2026-06-23-dspy-setup-custom-llm/`.

Desktop and mobile screenshots belong in the external release/QA artifact, not Git, to avoid binary churn. Capture the routes above at **1440×900** and **390×844** before Phase 1 visual changes. Use matching viewport sizes for later comparisons.

## Analytics baseline to record privately

Analytics values should not be committed because exports may reveal visitor or business information. Record the following in the project's private analytics workspace for the trailing 90 days, using 2026-08-09 as the comparison date:

- Top 20 landing pages: sessions, engaged sessions, engagement rate, and average engagement time.
- Search Console queries: clicks, impressions, click-through rate, and average position.
- Outbound clicks grouped by destination: GitHub, LinkedIn, project demos, PyPI, and WordPress.
- Internal search terms, if Algolia exposes them.
- Device split and country at aggregate level only.
- RSS/feed requests if available from hosting logs.

Use these values to judge the redesign by engaged reading, movement into related work, project/source clicks, and relevant inbound conversations—not page views alone.

## Toolchain baseline

- Ruby: 2.6.10
- Bundler: 2.4.6
- GitHub Pages: 223
- Jekyll: 3.9.0
- Remote theme: `mmistakes/minimal-mistakes` (configuration comment references 4.20.2)

Ruby 2.6 is end-of-life. Phase 0 pins the currently working toolchain to remove ambiguity; upgrading it is a separate, tested maintenance change.

## Secrets and third-party services

- `_algolia_api_key` exists locally, is ignored by `*api_key`, and is not tracked by Git.
- `_config.yml` contains an Algolia **search-only** key, which is intended to be public in a browser client. Never place an Algolia admin/write key in `_config.yml` or the repository.
- Google Analytics measurement ID is public configuration, not a secret.
- Disqus, Algolia, Google Analytics, LinkedIn, GitHub, and external project hosts are third-party dependencies and should be included in privacy/performance reviews.
- A scan of tracked text files found no common private-key or provider-token signatures at baseline.

## Phase 0 quality commands

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build
ruby tools/check_site.rb
```

The quality workflow runs the same production build and checker on pushes and pull requests.
