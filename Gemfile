source "https://rubygems.org"
ruby "~> 4.0.0"

# GitHub Pages 223 pins Liquid 4.0.3, which still calls the taint API removed
# in Ruby 4. Preserve its final no-op behavior until GitHub Pages updates it.
unless Object.method_defined?(:tainted?)
  ::Object.class_eval do
    define_method(:tainted?) { false }
    define_method(:taint) { self }
    define_method(:untaint) { self }
  end
end

gem "github-pages", group: :jekyll_plugins
gem "csv"
gem "base64"
gem "bigdecimal"
gem "mutex_m"
gem "ostruct"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jemoji"
  gem "jekyll-include-cache"
  gem "jekyll-algolia"
  gem "faraday-retry"
  gem "tzinfo"
  gem 'tzinfo-data'
  gem 'wdm', '>= 0.1.0', platforms: [:mingw, :x64_mingw, :mswin]
end
gem "webrick", "~> 1.8"
