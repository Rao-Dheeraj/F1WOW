# F1wow News Website

A Formula 1 news and analysis website featuring the latest F1 news, race results, championship standings, calendar, and race predictor.

## 🌐 Live Site

[https://motorsports-news.github.io/F1WOW/](https://motorsports-news.github.io/F1WOW/)

## 📁 Project Structure

```
E:\Insta/
├── index.html              # Homepage with featured articles and news grid
├── styles.css              # Main stylesheet
├── script.min.js           # JavaScript functionality
├── sitemap.xml             # XML sitemap for SEO
├── favicon1.svg            # Website favicon
├── F1 Car Scatch.png       # Hero section background image
│
├── Articles/               # F1 News and Race Reports
│   ├── piastri-unwanted-record.html
│   ├── japan-gp-2026.html
│   ├── antonelli-maiden-win.html
│   ├── alonso-vibrations-retirement.html
│   ├── verstappen-article.html
│   ├── regulations-2026-article.html
│   ├── cancellation-article.html
│   └── f1-33-day-break-japan-miami.html
│
└── Pages/
    ├── calendar.html       # F1 2026 Race Calendar
    ├── championship.html   # Drivers' & Constructors' Standings
    ├── predictor.html      # Race Result Predictor
    ├── subscribe.html      # Newsletter Subscription
    ├── australia-gp.html   # Australian GP Info
    └── china-gp.html       # Chinese GP Info
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Motorsports-News/F1WOW.git
   cd F1WOW
   ```

2. **Open locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000

     # Node.js
     npx serve
     ```

3. **Visit** `http://localhost:8000`

## 📝 Adding New Articles

When creating a new article:

1. **Create the article HTML file**
   - Use `ARTICLE_TEMPLATE.html` as a starting point
   - Include proper SEO meta tags, Open Graph, and structured data
   - Name it descriptively (e.g., `driver-event.html`)

2. **Add to homepage**
   - Add article card to `<div class="articles-grid">` in `index.html`
   - Update the **Featured Story** section (line ~210)

3. **Update sitemap**
   - Add entry to `sitemap.xml`
   - Include proper `<lastmod>` date

4. **Add internal links** (for SEO)
   - Link to 2-3 related articles within content
   - Use `<a href="article.html" class="article-link">` format

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Add article: Title"
   git push
   ```

## 🎨 Customization

### Hero Image Visibility
Edit `styles.css` line ~353:
```css
.hero-car-gif {
    opacity: 0.8;           /* 0-1 scale */
    filter: brightness(1.3) contrast(1.2);
}
```

### Featured Story
Edit `index.html` line ~211:
```html
<a href="your-article.html" class="featured-article">
    <!-- Update content here -->
</a>
```

## 📊 SEO Features

- Canonical URLs
- Open Graph meta tags
- Twitter Card support
- Structured data (Schema.org NewsArticle)
- XML Sitemap
- Internal linking strategy

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling (custom framework)
- **JavaScript** - Interactivity
- **Google Analytics** - Traffic tracking

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

All F1 related content belongs to their respective owners.

## 🔗 Social Media

- **Instagram**: [@f1wow](https://instagram.com/f1wow)

---

**Built with ❤️ for F1 fans**
