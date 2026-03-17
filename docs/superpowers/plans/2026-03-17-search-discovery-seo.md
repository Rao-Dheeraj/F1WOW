# Search Discovery SEO Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Help Google find and rank individual F1 articles through sitemap, robots.txt, meta descriptions, structured data, and semantic HTML

**Architecture:**
1. Static sitemap.xml and robots.txt at site root
2. Node.js script to auto-generate sitemap from HTML files
3. JSON-LD structured data embedded in article pages
4. Meta descriptions added to all pages
5. Semantic HTML verification and fixes

**Tech Stack:** XML, Node.js (fs/glob), JSON-LD Schema.org, HTML5

---

## Chunk 1: Sitemap Generator Script

### Task 1: Create sitemap generator utility

**Files:**
- Create: `scripts/generate-sitemap.js`
- Create: `sitemap.xml` (generated output)

- [ ] **Step 1: Read existing HTML files to understand structure**

Run: `ls E:/Insta/*.html | grep -v node_modules`
Expected: List of all HTML files (index, article pages, calendar, etc.)

- [ ] **Step 2: Create sitemap generator script**

```javascript
// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SITE_URL = 'https://f1wow.com';
const OUTPUT_FILE = path.join(__dirname, '..', 'sitemap.xml');

// Priority mapping
const priorities = {
    'index.html': 1.0,
    'calendar.html': 0.7,
    'championship.html': 0.7,
    'predictor.html': 0.7,
    'subscribe.html': 0.6
};

const changeFreq = {
    'index.html': 'daily',
    'calendar.html': 'weekly',
    'championship.html': 'weekly'
};

async function generateSitemap() {
    // Get all HTML files except in node_modules
    const files = glob.sync('*.html', {
        cwd: __dirname + '/..',
        ignore: ['node_modules/**', 'test-*.html', 'debug-*.html', '*-demo.html']
    });

    const urls = files.map(file => {
        const url = `${SITE_URL}/${file}`;
        const priority = priorities[file] || (file.includes('-') ? 0.9 : 0.7);
        const changefreq = changeFreq[file] || 'monthly';

        // Get file modification time
        const stats = fs.statSync(path.join(__dirname, '..', file));
        const lastmod = stats.mtime.toISOString().split('T')[0];

        return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync(OUTPUT_FILE, sitemap);
    console.log(`✅ Sitemap generated: ${OUTPUT_FILE}`);
    console.log(`   Total URLs: ${files.length}`);
}

generateSitemap().catch(console.error);
```

- [ ] **Step 3: Ensure glob package is available**

Run: `cd E:/Insta && npm install glob --save-dev`
Expected: glob package installed

- [ ] **Step 4: Run sitemap generator**

Run: `cd E:/Insta && node scripts/generate-sitemap.js`
Expected: `✅ Sitemap generated: E:\Insta\sitemap.xml`

- [ ] **Step 5: Verify sitemap.xml was created**

Run: `cat E:/Insta/sitemap.xml`
Expected: Valid XML with all URLs listed

- [ ] **Step 6: Add generate script to package.json**

```json
"scripts": {
  "generate-sitemap": "node scripts/generate-sitemap.js"
}
```

- [ ] **Step 7: Commit sitemap generator**

```bash
git add scripts/generate-sitemap.js sitemap.xml package.json
git commit -m "feat: add sitemap generator for search engine discovery"
```

---

## Chunk 2: robots.txt

### Task 2: Create robots.txt

**Files:**
- Create: `robots.txt`

- [ ] **Step 1: Create robots.txt file**

```
User-agent: *
Allow: /

Sitemap: https://f1wow.com/sitemap.xml
```

- [ ] **Step 2: Verify robots.txt is accessible**

Run: `cat E:/Insta/robots.txt`
Expected: robots.txt content displayed

- [ ] **Step 3: Commit robots.txt**

```bash
git add robots.txt
git commit -m "feat: add robots.txt for search engine crawlers"
```

---

## Chunk 3: Homepage Meta Description

### Task 3: Add meta description to index.html

**Files:**
- Modify: `index.html` (add after title tag, around line 6)

- [ ] **Step 1: Read index.html head section**

Run: `head -n 15 E:/Insta/index.html`
Expected: See current head tag structure

- [ ] **Step 2: Add meta description after title tag**

```html
<meta name="description" content="F1wow News - Your ultimate source for Formula 1 news, race results, driver standings, and analysis. Stay updated on the 2026 F1 season with latest reports and insights.">
```

Place it after: `<title>F1wow News - F1wow</title>`

- [ ] **Step 3: Verify meta tag was added correctly**

Run: `grep -n "meta name=\"description\"" E:/Insta/index.html`
Expected: Line number showing meta description

- [ ] **Step 4: Test in browser**

Run: `start E:/Insta/index.html`
Expected: Page opens, view source shows meta description

- [ ] **Step 5: Commit homepage meta description**

```bash
git add index.html
git commit -m "feat: add meta description to homepage for SEO"
```

---

## Chunk 4: Article Pages JSON-LD Structured Data

### Task 4: Add JSON-LD to article template

**Files:**
- Modify: `ARTICLE_TEMPLATE.html` (add JSON-LD script before closing head)

- [ ] **Step 1: Read ARTICLE_TEMPLATE.html head section**

Run: `head -n 30 E:/Insta/ARTICLE_TEMPLATE.html`
Expected: See template structure

- [ ] **Step 2: Add JSON-LD template before </head>**

```html
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "[ARTICLE_TITLE]",
      "datePublished": "[PUBLISH_DATE]",
      "dateModified": "[PUBLISH_DATE]",
      "author": {
        "@type": "Organization",
        "name": "F1wow News"
      },
      "publisher": {
        "@type": "Organization",
        "name": "F1wow",
        "url": "https://f1wow.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://f1wow.com/favicon1.svg"
        }
      },
      "description": "[ARTICLE_DESCRIPTION]",
      "about": [
        {
          "@type": "SportsEvent",
          "name": "[RACE_OR_EVENT]"
        }
      ]
    }
    </script>
</head>
```

- [ ] **Step 3: Commit template update**

```bash
git add ARTICLE_TEMPLATE.html
git commit -m "feat: add JSON-LD structured data template to articles"
```

### Task 5: Add JSON-LD to existing article pages

**Files:**
- Modify: `antonelli-maiden-win.html`
- Modify: `verstappen-article.html`
- Modify: `regulations-2026-article.html`
- Modify: `cancellation-article.html`
- Modify: `alonso-vibrations-retirement.html`
- Modify: `australia-gp.html`
- Modify: `china-gp.html`

- [ ] **Step 1: Add JSON-LD to antonelli-maiden-win.html**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Kimi Antonelli Wins Maiden Formula 1 Race at Chinese Grand Prix",
  "datePublished": "2026-03-15",
  "author": {
    "@type": "Organization",
    "name": "F1wow News"
  },
  "publisher": {
    "@type": "Organization",
    "name": "F1wow",
    "url": "https://f1wow.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://f1wow.com/favicon1.svg"
    }
  },
  "description": "Kimi Antonelli claims his first Formula 1 victory at the 2026 Chinese Grand Prix. Lewis Hamilton secures first Ferrari podium in dramatic Shanghai race.",
  "about": [
    {
      "@type": "SportsEvent",
      "name": "Chinese Grand Prix 2026"
    },
    {
      "@type": "Person",
      "name": "Kimi Antonelli"
    },
    {
      "@type": "Person",
      "name": "Lewis Hamilton"
    }
  ]
}
</script>
```

- [ ] **Step 2: Add JSON-LD to verstappen-article.html**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Verstappen Criticizes 2026 F1 Cars: 'It's a Joke'",
  "datePublished": "2026-03-14",
  "author": {
    "@type": "Organization",
    "name": "F1wow News"
  },
  "publisher": {
    "@type": "Organization",
    "name": "F1wow",
    "url": "https://f1wow.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://f1wow.com/favicon1.svg"
    }
  },
  "description": "Max Verstappen launches scathing attack on new 2026 regulations, calling the future of F1 'a joke' after Chinese GP testing.",
  "about": [
    {
      "@type": "Person",
      "name": "Max Verstappen"
    }
  ]
}
</script>
```

- [ ] **Step 3: Add JSON-LD to regulations-2026-article.html**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "F1 2026 vs 2025 Regulations: The Complete Guide",
  "datePublished": "2026-03-10",
  "author": {
    "@type": "Organization",
    "name": "F1wow News"
  },
  "publisher": {
    "@type": "Organization",
    "name": "F1wow",
    "url": "https://f1wow.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://f1wow.com/favicon1.svg"
    }
  },
  "description": "Power units, active aerodynamics, sustainable fuels, and new manufacturers—everything you need to know about the biggest regulatory shakeup in decades.",
  "about": [
    {
      "@type": "SportsEvent",
      "name": "Formula 1 World Championship 2026"
    }
  ]
}
</script>
```

- [ ] **Step 4: Add JSON-LD to cancellation-article.html**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "F1 Announces Cancellation of Bahrain and Saudi Arabian GPs",
  "datePublished": "2026-03-08",
  "author": {
    "@type": "Organization",
    "name": "F1wow News"
  },
  "publisher": {
    "@type": "Organization",
    "name": "F1wow",
    "url": "https://f1wow.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://f1wow.com/favicon1.svg"
    }
  },
  "description": "Formula 1 officially announces cancellation of Bahrain and Saudi Arabian GPs due to unforeseen regional circumstances.",
  "about": [
    {
      "@type": "SportsEvent",
      "name": "Bahrain Grand Prix 2026"
    },
    {
      "@type": "SportsEvent",
      "name": "Saudi Arabian Grand Prix 2026"
    }
  ]
}
</script>
```

- [ ] **Step 5: Add JSON-LD to alonso-vibrations-retirement.html**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Fernando Alonso Retirement Rumors: Vibration Issues Continue",
  "datePublished": "2026-03-12",
  "author": {
    "@type": "Organization",
    "name": "F1wow News"
  },
  "publisher": {
    "@type": "Organization",
    "name": "F1wow",
    "url": "https://f1wow.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://f1wow.com/favicon1.svg"
    }
  },
  "description": "Fernando Alonso continues to struggle with vibration issues in the Aston Martin, sparking renewed retirement speculation.",
  "about": [
    {
      "@type": "Person",
      "name": "Fernando Alonso"
    }
  ]
}
</script>
```

- [ ] **Step 6: Add JSON-LD to australia-gp.html and china-gp.html**

Similar structure with race-specific details

- [ ] **Step 7: Commit all article JSON-LD additions**

```bash
git add *.html
git commit -m "feat: add JSON-LD structured data to all article pages"
```

---

## Chunk 5: Semantic HTML Verification

### Task 6: Verify and fix heading hierarchy

**Files:**
- Modify: Article HTML files if needed

- [ ] **Step 1: Check article pages for proper heading structure**

Run: `grep -E "<h[123]>" E:/Insta/antonelli-maiden-win.html | head -10`
Expected: Single h1 followed by h2s

- [ ] **Step 2: Ensure article title uses h1**

Each article should have: `<h1 class="article-title">` as the main heading

- [ ] **Step 3: Add time element for publish dates where missing**

```html
<time datetime="2026-03-15" class="article-date">March 15, 2026</time>
```

- [ ] **Step 4: Verify article wrapper uses semantic HTML**

```html
<article class="article">
```

- [ ] **Step 5: Commit semantic HTML fixes**

```bash
git add *.html
git commit -m "feat: improve semantic HTML for SEO (headings, time, article tags)"
```

---

## Chunk 6: Meta Descriptions for Remaining Pages

### Task 7: Add meta descriptions to other pages

**Files:**
- Modify: `calendar.html`, `championship.html`, `predictor.html`, `subscribe.html`

- [ ] **Step 1: Add meta description to calendar.html**

```html
<meta name="description" content="F1 2026 Race Calendar - Complete schedule of Formula 1 Grand Prix races with dates, venues, and countdown to upcoming events.">
```

- [ ] **Step 2: Add meta description to championship.html**

```html
<meta name="description" content="F1 2026 Drivers' and Constructors' Championship standings - Live points table, race results, and championship battle analysis.">
```

- [ ] **Step 3: Add meta description to predictor.html**

```html
<meta name="description" content="F1 Race Predictor Game - Predict race results, compete with friends, and test your Formula 1 knowledge.">
```

- [ ] **Step 4: Add meta description to subscribe.html**

```html
<meta name="description" content="Subscribe to F1wow News newsletter - Get the latest Formula 1 news, race results, and analysis delivered to your inbox.">
```

- [ ] **Step 5: Commit meta descriptions**

```bash
git add calendar.html championship.html predictor.html subscribe.html
git commit -m "feat: add meta descriptions to remaining pages"
```

---

## Chunk 7: Validation and Testing

### Task 8: Validate SEO implementation

**Files:**
- None (validation only)

- [ ] **Step 1: Validate sitemap.xml**

Run: `curl -s https://www.xml-sitemaps.com/validate-xml-sitemap.php -d "sitemap=@E:/Insta/sitemap.xml"`
Or manually: Upload to Google Search Console or use online validator
Expected: Valid XML

- [ ] **Step 2: Test robots.txt accessibility**

Run: `curl http://localhost:5500/robots.txt` (or equivalent local server)
Expected: robots.txt content served

- [ ] **Step 3: Validate JSON-LD using Google Rich Results Test**

1. Open https://search.google.com/test/rich-results
2. Enter article URL (or paste HTML)
3. Verify NewsArticle structured data is detected

- [ ] **Step 4: Check for missing meta descriptions**

Run: `grep -L "meta name=\"description\"" E:/Insta/*.html | grep -v node_modules`
Expected: No output (all files have meta descriptions)

- [ ] **Step 5: View page source to verify all meta tags**

Open: `E:/Insta/index.html` in browser, view source
Expected: Meta description visible

- [ ] **Step 6: Final verification commit**

```bash
git add .
git commit -m "chore: SEO implementation complete and validated"
```

---

## Post-Implementation Steps

1. **Submit sitemap to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property (if not already added)
   - Submit sitemap.xml

2. **Monitor indexing**
   - Check "Coverage" report in GSC
   - Verify articles are being indexed

3. **Generate fresh sitemap after each new article**
   - Run: `npm run generate-sitemap`
   - Commit updated sitemap.xml
