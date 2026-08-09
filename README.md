# Chaoran's Applied AI Notes

Jekyll source for <https://www.ichaoran.com>.

## Toolchain

- Ruby 2.6.10 (pinned in `.ruby-version` and `.tool-versions`)
- Bundler 2.4.6 (pinned in `Gemfile.lock`)
- GitHub Pages 223 / Jekyll 3.9.0

Ruby 2.6 is the reproducible legacy baseline and is end-of-life. Upgrade it in a dedicated change with URL and visual regression checks.

## Test the site locally

```
# install dependencies
bundle install

# run a local development server
bundle exec jekyll serve

# run the production build and publishing/quality checks
JEKYLL_ENV=production bundle exec jekyll build
ruby tools/check_site.rb

# index using algolia
bundle exec jekyll algolia
```

Algolia indexing requires a local credential. Never commit an admin/write API key. The search-only key in `_config.yml` is browser-visible by design and should remain restricted to search operations.

See [the Phase 0 baseline](docs/BASELINE.md) for the URL contract, analytics checklist, toolchain inventory, and visual-regression routes.

For new articles, copy one of the four files in `_templates/` and follow [the publishing guide](docs/publishing-guide.md). The guide covers required front matter, reusable figures and callouts, code captions, social cards, recommendations, and the pre-publication checklist.
