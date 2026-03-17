# F1wow Commands

## /article - Automated Article Generation

When you type `/article`, Claude will:

1. **Ask for Instagram Link** - Provide the Instagram post URL
2. **Fetch & Analyze** - Extract image, caption, topic from the post
3. **Research** - Search for recent F1 news on the topic
4. **Generate Article** - Create a 300-600 word well-researched article
5. **Create File** - Generate `[filename].html` with proper formatting
6. **Update data.json** - Add article metadata
7. **Update index.html** - Add article to homepage grid
8. **Verify** - Check all links and formatting

### Article Categories

- **Race Report** - Grand Prix results, qualifying, practice
- **Driver News** - Driver transfers, contracts, performances
- **Team News** - Team updates, technical changes
- **Technical** - Regulations, technical analysis
- **Breaking News** - Major announcements

### Filename Convention

- `driver-name-event.html` (e.g., `antonelli-maiden-win.html`)
- `team-news.html` (e.g., `mercedes-new-driver.html`)
- `race-review.html` (e.g., `japan-gp-2026-review.html`)

### Example Usage

```
You: /article
Claude: What is the Instagram post link?
You: https://www.instagram.com/f1wow/p/DV5hMjwjFm2/
Claude: [Creates complete article with research and updates website]
```
