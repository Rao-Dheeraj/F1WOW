---
name: article
description: Automated F1 article generation from Instagram posts. Creates well-researched articles with embedded Instagram posts and updates the website.
---

# /article Command - F1 Article Generation Workflow

When the user types `/article`, follow this workflow to create a complete F1 news article from an Instagram post.

## Step 1: Get Instagram Post Link

Use `AskUserQuestion` to get the Instagram post URL from the user:

```
Question: What is the Instagram post link you want to create an article from?
Options:
- Paste the URL (allows custom input)
```

## Step 2: Fetch and Analyze Instagram Post

Use `mcp__web_reader__webReader` to fetch the Instagram post content:

```javascript
// Extract these details:
- Post URL
- Image URL (from og:image meta tag)
- Caption text
- Username (@f1wow or other)
- Post date (if available)
```

Identify the F1 topic from the caption:
- **Driver News** - Driver transfers, contracts, performances, quotes
- **Race News** - Grand Prix results, qualifying, practice sessions
- **Team News** - Team updates, technical changes, management
- **F1 Business** - Regulations, calendar, commercial news

## Step 3: Research the Topic

Use `WebSearch` to gather recent news and context:

```javascript
// Search queries based on topic:
- "[Driver Name] F1 2026 news"
- "[Event Name] F1 results"
- "[Team Name] F1 update"
- "Formula 1 [topic] recent"
```

Gather 3-5 relevant sources from major F1 news outlets:
- **Sky Sports F1** - Expert analysis and reporter quotes
- **Motorsport.com** - Technical insights and commentary
- **Formula1.com** - Official F1 statements and reports
- **BBC Sport / ESPN** - Broader sports coverage
- **AutoSport / The Race** - Specialized F1 journalism

Extract:
- Key facts and statistics
- Notable quotes from reporters (e.g., Ted Kravitz, Karun Chandhok, Scott Mitchell)
- Driver and team quotes
- Background context
- Related storylines

## Step 4: Generate Article Content

Follow these **core writing rules** (from article-writing skill):

1. **Lead with the concrete thing** - Start with numbers, results, or specific moments
2. **Explain after the example** - Never front-load context
3. **Short, direct sentences** - Avoid padding and filler
4. **Specific numbers only** - Never invent facts or statistics
5. **No generic phrases** - Delete: "In today's F1", "game-changing", etc.

### Banned Patterns - Never Use:
- "In today's rapidly evolving landscape"
- "Moreover", "Furthermore", "Additionally"
- "Game-changer", "cutting-edge", "revolutionary"
- Vague claims without evidence
- Biography claims not backed by sources

### Article Structure:

1. **SEO Title** - Engaging, keyword-rich (60-70 characters)
   - Example: "Kimi Antonelli Wins Maiden Formula 1 Race at Chinese Grand Prix"

2. **Meta Description** - Summary for search engines (150-160 characters)
   - Example: "Kimi Antonelli claims his first Formula 1 victory at the 2026 Chinese Grand Prix. Lewis Hamilton secures first Ferrari podium."

3. **Article Category** - One of:
   - Race Report / Race News
   - Driver News
   - Team News
   - Technical / Business
   - Breaking News

4. **Article Intro** - Start with concrete facts (3-4 sentences)
   - **DO**: "5.515 seconds. That was the gap Kimi Antonelli crossed the finish line..."
   - **DON'T**: "In today's exciting race, a young driver showed promise..."
   - Hook with specific result, stat, or moment
   - Include key facts (who, what, when, where)

5. **Instagram Embed** - Centered card with the actual post
   - Use the extracted image URL
   - Link to the original Instagram post
   - Include @f1wow username

6. **Main Content** - Evidence-first sections (3-5 paragraphs, 300-600 words)
   - **Every section starts with** example, number, quote, or specific moment
   - Use section headers with icons
   - Include relevant details from research
   - Add quotes if available from sources:
     - Driver quotes (team radio, post-race interviews)
     - Team principal quotes
     - **Famous reporter quotes** (when relevant and adds credibility):
       - Sky Sports: Ted Kravitz, Karun Chandhok, Martin Brundle
       - Motorsport.com: Scott Mitchell, Mark Hughes, Valtteri Bottas (columnist)
       - Formula1.com: Official statements, Lawrence Barretto
       - BBC Sport: Andrew Benson, Jennyfer Robinson
   - Use specific statistics/data only from research
   - Credit the source when quoting reporters

7. **Sources Section** - Links to referenced articles
   - List 3-5 sources at the end
   - Format: `[Source Name](URL)`

### Article Sections to Include (as relevant):

- **Race Summary** - For race reports
- **Key Moments** - Highlight important events
- **Final Results** - Results table for races
- **Championship Implications** - Standings impact
- **Quotes** - Driver/team quotes
- **What's Next** - Upcoming events
- **Background** - Context for news stories

## Step 5: Generate Filename

Create a descriptive filename using lowercase with hyphens:

```
driver-name-event.html          // e.g., verstappen-china-win.html
team-news.html                  // e.g., mercedes-new-driver.html
race-review.html                // e.g., japan-gp-2026-review.html
driver-topic.html               // e.g., hamilton-ferrari-podium.html
```

## Step 6: Create Article File

Use the `antonelli-maiden-win.html` format as reference. Include:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[SEO Title] - F1wow News</title>
    <link rel="icon" type="image/svg+xml" href="favicon1.svg">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <meta name="description" content="[Meta description]">
    <script async src="//www.instagram.com/embed.js"></script>
</head>
<body>
    <!-- Header (copy from antonelli-maiden-win.html) -->
    <!-- Main content with article structure -->
    <!-- Instagram embed with extracted image -->
    <!-- Footer -->
</body>
</html>
```

## Step 7: Update data.json

Add new entry to data.json:

```json
{
  "latestPost": {
    "title": "[Article Title]",
    "quote": "[Engaging quote/summary]",
    "driver": "[Driver Name or Team]",
    "source": "@f1wow",
    "sourceLink": "[Instagram Post URL]",
    "image": "[Extracted Image URL]",
    "date": "[Month DD, YYYY]",
    "event": "[Event Name or Category]",
    "articleLink": "[filename.html]",
    "tags": ["tag1", "tag2", "tag3", ...]
  }
}
```

Tags should include: f1, f12026, formula1, relevant driver names, team names, event names

## Step 8: Update index.html

Add the new article to the homepage:

1. **If it's a major story** - Update the featured article section (lines 136-160)
2. **Always** - Add to the articles grid (after line 193)

Article card format:
```html
<a href="[filename.html]" class="article-preview-card">
    <div class="article-preview-content">
        <div class="article-preview-meta">
            <span class="preview-category">[Category]</span>
            <span class="preview-date">[Date]</span>
        </div>
        <h3 class="article-preview-title">[Title]</h3>
        <p class="article-preview-excerpt">[Excerpt]</p>
        <div class="article-preview-footer">
            <span class="preview-driver">[Driver/Team]</span>
            <span class="preview-event">[Event]</span>
        </div>
    </div>
</a>
```

## Step 9: Verification

After creating the article:

1. Read the new article file - verify formatting
2. Check Instagram embed image URL is correct
3. Verify data.json has correct entry
4. Check index.html article appears correctly
5. Confirm all internal links work

## Article Guidelines

- **Length**: 300-600 words for optimal engagement
- **Tone**: Professional yet engaging F1 journalism
- **Style**: Use existing F1wow styling conventions
- **Mobile**: Responsive by default (inherited from template)
- **SEO**: Include keywords in title and description
- **Dates**: Use "Month DD, YYYY" format

### Writing Quality Standards

**DO:**
- Start every section with concrete evidence (numbers, quotes, moments)
- Use short, direct sentences
- Include specific lap times, gaps, positions from sources
- Explain context after presenting facts
- Use driver quotes when available
- Include relevant quotes from famous F1 reporters (Sky Sports, Motorsport.com, F1 Official) with proper attribution

**DON'T:**
- Write generic intros like "The Chinese Grand Prix was exciting..."
- Use filler words (moreover, furthermore, additionally)
- Invent statistics or facts not in sources
- Use hype phrases (game-changer, revolutionary, cutting-edge)
- Write vague claims without backing evidence

## Categories

| Category | Usage |
|----------|-------|
| Race Report / Race News | Grand Prix results, qualifying, practice |
| Driver News | Driver transfers, contracts, performances |
| Team News | Team updates, technical changes |
| Technical | Regulations, technical analysis |
| Breaking News | Time-sensitive major announcements |
| Business | Calendar, commercial, regulations |

## Example Workflow

```
User: /article

Claude: [AskUserQuestion for Instagram link]

User: [Provides https://www.instagram.com/f1wow/p/XXXXX/]

Claude:
1. Fetches Instagram post
2. Extracts: image, caption, topic
3. Searches web for related news
4. Generates article content
5. Creates [filename].html
6. Updates data.json
7. Updates index.html
8. Reports completion with summary
```

## Notes

- Always include the actual Instagram image URL (extracted from og:image meta tag)
- Credit all sources properly in the Sources section
- Use the existing article styling for consistency
- Test all links before reporting completion
- If the Instagram post is from a different account, still credit @f1wow as the source if applicable
