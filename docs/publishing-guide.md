# Publishing guide

Start from the template in `_templates/` that matches the intended reader outcome: `guide.md`, `case-study.md`, `essay.md`, or `field-note.md`. Copy it to `_posts/YYYY-MM-DD-slug.md`; do not edit the template in place.

## Required front matter

Every post requires `title`, `date`, `pillar`, `format`, and `excerpt`. Current AI posts must use one of the four editorial pillars and should use `header.og_image` plus `header.teaser`. Featured posts require a social image. Use `series` only for a key defined in `_data/editorial.yml`; use `recommended` for up to two intentional follow-on post URLs.

Run `ruby tools/check_site.rb` after a production build. Validation rejects unknown taxonomy values, invalid series, missing current-post excerpts, missing featured social images, broken recommendation URLs, broken internal links, and incomplete article metadata.

## Reusable article elements

### Diagrams and captions

Store source assets in `assets/images/posts/`. Prefer SVG for diagrams and PNG/JPEG for screenshots or social cards. Every image needs meaningful alt text.

```liquid
{% include article-figure.html
  src="/assets/images/posts/example-system.svg"
  alt="Request flow from the application through retrieval and model evaluation"
  caption="The evaluation boundary surrounds retrieval and generation."
  kind="diagram" %}
```

### Callouts

Use callouts for information that changes how the reader interprets or applies the article. Supported semantic types are `note`, `principle`, `evidence`, and `caution`.

```liquid
{% include article-callout.html type="caution" title="Production constraint" content="Never log raw customer documents." %}
```

### Code

Use fenced code blocks with an explicit language. Add a caption when the filename or role is useful.

```liquid
{% include code-caption.html title="Internal model adapter" file="src/model_adapter.py" %}
```

Follow it immediately with the fenced code block. Examples should be minimal, runnable, and free of credentials or internal endpoints.

### Social cards

Create a 1200 × 630 px image that remains legible at small sizes. Keep the title short, use the site teal/ink palette, and avoid embedding detailed diagrams. Set the same path for `header.og_image` and `header.teaser`; the first drives Open Graph and structured data, while the second drives article listings.

## Pre-publication checklist

1. Confirm the post delivers the promise in its title and excerpt.
2. Verify headings form a useful table of contents.
3. Add alt text, captions, sources, and explicit evidence boundaries.
4. Check code for secrets, internal hostnames, personal data, and unsupported claims.
5. Choose one or two next articles, then set `recommended`.
6. Build with `JEKYLL_ENV=production bundle exec jekyll build`.
7. Run `ruby tools/check_site.rb` and inspect the post on desktop and mobile.
