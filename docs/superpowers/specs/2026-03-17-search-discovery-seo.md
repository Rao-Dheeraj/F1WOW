# Search Discovery SEO Design

**Date:** 2026-03-17
**Status:** Approved
**Author:** Claude (Superpowers Brainstorming)

## Goal

Help Google find and rank individual F1 articles on F1wow News.

## Scope

**In scope:**
- Sitemap.xml generation
- robots.txt configuration
- Meta descriptions for all pages
- Structured data (JSON-LD) for articles
- Semantic HTML improvements

**Out of scope:**
- Social sharing meta tags (Open Graph, Twitter Cards)
- Social image generation
- RSS feeds

## Implementation

### 1. Sitemap.xml

Create `sitemap.xml` at site root listing all pages with priorities:
- Homepage: priority 1.0, changefreq daily
- Article pages: priority 0.9, changefreq monthly
- Other pages: priority 0.7, changefreq weekly

### 2. robots.txt

Create `robots.txt` at site root:
```
User-agent: *
Allow: /
Sitemap: https://f1wow.com/sitemap.xml
```

### 3. Meta Descriptions

Add `<meta name="description">` to:
- `index.html` - 160 chars, emphasize F1 news, 2026 season
- All article pages - ensure each has unique description
- Other pages (calendar, championship, etc.)

### 4. Structured Data (JSON-LD)

Add NewsArticle schema to article pages including:
- Headline, datePublished, author
- Publisher info with logo
- About: SportsEvent (race), Person (drivers), Organization (teams)

### 5. Semantic HTML

Ensure proper heading hierarchy:
- One `<h1>` per page (article title)
- `<h2>` for major sections
- `<h3>` for subsections
- Use `<article>`, `<time>` tags

## Files to Create

- `sitemap.xml` - Site URL map
- `robots.txt` - Crawler instructions
- `generate-sitemap.js` - Script to auto-generate sitemap from articles

## Files to Modify

- `index.html` - Add meta description
- `*.html` (article pages) - Add JSON-LD, verify meta descriptions
- `ARTICLE_TEMPLATE.html` - Add JSON-LD template

## Success Criteria

- Site appears in Google search results
- Individual articles rank for F1 queries
- Google Search Console shows indexed pages
- Rich snippets appear for article searches
