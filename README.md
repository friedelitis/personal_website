# christianfriedrich.org

Personal website of Christian Friedrich – organizational consultant, podcaster, facilitator.

## Stack

- **Generator:** Hugo (static site)
- **Hosting:** Reclaim Hosting
- **Deployment:** GitHub Actions → rsync
- **Languages:** German (default) + English

## Local Development

```bash
hugo server -D
```

Site available at `http://localhost:1313/`

## Build

```bash
hugo --minify
```

Output in `public/`.

## Deployment

Push to `main` triggers GitHub Actions. Required secrets:

| Secret | Description |
|---|---|
| `DEPLOY_HOST` | Reclaim Hosting SSH hostname |
| `DEPLOY_PORT` | SSH port (usually 22) |
| `DEPLOY_USER` | SSH username |
| `DEPLOY_KEY` | SSH private key |
| `DEPLOY_PATH` | Remote path (e.g. `/home/user/public_html/`) |

## Structure

```
├── content/
│   ├── de/_index.md      # German homepage
│   └── en/_index.md      # English homepage
├── data/
│   └── references.toml   # Client references (bilingual)
├── i18n/
│   ├── de.toml           # German strings
│   └── en.toml           # English strings
├── layouts/
│   ├── _default/baseof.html
│   ├── page/home.html    # One-pager layout
│   └── partials/         # nav, footer, overscroll, vollgas-toggle
├── static/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/              # Portrait photos
└── hugo.toml             # Site config
```

## Photos

| File | Type | Usage |
|---|---|---|
| `_MHZ2744.jpg` | Color, front | Hero |
| `_MHZ2658.jpg` | Color, smiling | About |
| `_MHZ2695.jpg` | B/W, side | Available |
| `_MHZ2648.jpg` | B/W, close crop | Available |
