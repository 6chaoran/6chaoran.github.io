#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "set"
require "yaml"
require "date"

ROOT = Pathname.new(__dir__).join("..").expand_path
SITE = ROOT.join(ENV.fetch("SITE_DIR", "_site"))
POST_PATTERN = ROOT.join("_posts", "*")
ALLOWED_PILLARS = %w[archive ai-engineering evaluation-reliability document-intelligence ai-in-practice].freeze
ALLOWED_FORMATS = %w[field-note guide case-study essay project].freeze
ALLOWED_SERIES = %w[from-demo-to-dependable document-intelligence-in-practice].freeze

errors = []
warnings = []

def front_matter(path)
  text = path.read
  match = text.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return {} unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::SyntaxError => e
  { "__error__" => e.message }
end

posts = Dir.glob(POST_PATTERN.to_s).map { |file| Pathname.new(file) }.sort
expected_urls = posts.map do |post|
  data = front_matter(post)
  if data["__error__"]
    errors << "Invalid front matter in #{post.relative_path_from(ROOT)}: #{data['__error__']}"
    next
  end

  unless data["title"] && data["date"]
    errors << "Missing title or date in #{post.relative_path_from(ROOT)}"
  end

  unless ALLOWED_PILLARS.include?(data["pillar"])
    errors << "Invalid or missing pillar in #{post.relative_path_from(ROOT)}: #{data['pillar'].inspect}"
  end
  unless ALLOWED_FORMATS.include?(data["format"])
    errors << "Invalid or missing format in #{post.relative_path_from(ROOT)}: #{data['format'].inspect}"
  end
  if data["series"] && !ALLOWED_SERIES.include?(data["series"])
    errors << "Invalid series in #{post.relative_path_from(ROOT)}: #{data['series'].inspect}"
  end

  if data["pillar"] != "archive"
    errors << "Missing excerpt in #{post.relative_path_from(ROOT)}" if data["excerpt"].to_s.strip.empty?
    errors << "Current editorial post must enable toc in #{post.relative_path_from(ROOT)}" unless data.fetch("toc", true) == true
  end

  if data["featured"] == true
    header = data["header"] || {}
    social_image = header["og_image"] || header["teaser"]
    errors << "Featured post requires header.og_image or header.teaser in #{post.relative_path_from(ROOT)}" if social_image.to_s.strip.empty?
  end

  Array(data["recommended"]).each do |url|
    unless url.to_s.match?(%r{\A/posts/\d{4}-\d{2}-\d{2}-.+/\z})
      errors << "Invalid recommended URL in #{post.relative_path_from(ROOT)}: #{url.inspect}"
    end
  end
  if Array(data["recommended"]).length > 2
    errors << "Use at most 2 recommended posts in #{post.relative_path_from(ROOT)}"
  end

  match = post.basename.to_s.match(/\A(\d{4})-(\d{2})-(\d{2})-(.+)\.(?:md|markdown|html)\z/)
  unless match
    errors << "Unexpected post filename: #{post.relative_path_from(ROOT)}"
    next
  end

  published = data["date"]
  published = Date.parse(published.to_s) unless published.respond_to?(:strftime)
  "/posts/#{published.strftime('%Y-%m-%d')}-#{match[4]}/"
end.compact

if posts.length < 37
  errors << "Expected at least the Phase 0 baseline of 37 posts, found #{posts.length}"
end

featured_count = posts.count { |post| front_matter(post)["featured"] == true }
errors << "Expected exactly 3 cornerstone posts, found #{featured_count}" unless featured_count == 3

if SITE.directory?
  html_files = SITE.glob("**/*.html")
  content_html_files = html_files.reject { |path| path.relative_path_from(SITE).to_s.start_with?("assets/") }
  routes = Set.new
  SITE.glob("**/*").each do |path|
    next unless path.file?

    relative = "/#{path.relative_path_from(SITE)}"
    routes << relative
    routes << relative.sub(%r{/index\.html\z}, "/") if relative.end_with?("/index.html")
  end

  expected_urls.each do |url|
    errors << "Missing generated post URL: #{url}" unless routes.include?(url)
  end

  posts.each do |post|
    Array(front_matter(post)["recommended"]).each do |url|
      errors << "Missing recommended post URL in #{post.relative_path_from(ROOT)}: #{url}" unless routes.include?(url)
    end
  end

  content_html_files.each do |html|
    body = html.read
    relative = html.relative_path_from(SITE)

    %w[title canonical description og:title og:description].each do |field|
      present = case field
                when "title" then body.match?(%r{<title>\s*\S.*?</title>}mi)
                when "canonical" then body.match?(%r{<link[^>]+rel=["']canonical["']}i)
                when "description" then body.match?(%r{<meta[^>]+name=["']description["'][^>]+content=["']\S}i)
                else
                  property = Regexp.escape(field)
                  body.match?(%r{<meta[^>]+property=["']#{property}["'][^>]+content=["']\S}i)
                end
      errors << "Missing #{field} metadata in #{relative}" unless present
    end

    if body.match?(%r{<meta property=["']og:type["'] content=["']article["']}i)
      errors << "Missing Article JSON-LD in #{relative}" unless body.match?(%r{"@type"\s*:\s*"(?:BlogPosting|Article)"}i)
      errors << "Missing Open Graph image in #{relative}" unless body.match?(%r{<meta property=["']og:image["']}i)
    end

    body.scan(/\b(?:href|src)=["']([^"'#?]+)(?:[?#][^"']*)?["']/i).flatten.each do |target|
      next if target.empty? || target.include?("${")
      next if target.start_with?("mailto:", "tel:", "javascript:", "data:", "//")
      next if target.match?(%r{\Ahttps?://}i)

      decoded = target.gsub("%20", " ")
      candidate = if decoded.start_with?("/")
                    SITE.join(decoded.sub(%r{\A/}, ""))
                  else
                    html.dirname.join(decoded).cleanpath
                  end

      valid = candidate.file? || candidate.directory? || candidate.join("index.html").file?
      errors << "Broken internal target in #{relative}: #{target}" unless valid
    end
  end

  puts "Checked #{posts.length} source posts and #{content_html_files.length} generated content HTML files."
else
  warnings << "#{SITE.relative_path_from(ROOT)} does not exist; generated URL, link, and metadata checks were skipped"
  puts "Checked #{posts.length} source posts."
end

warnings.uniq.each { |warning| warn "WARNING: #{warning}" }
errors.uniq.each { |error| warn "ERROR: #{error}" }
exit(errors.empty? ? 0 : 1)
