# Edlin Muzones portfolio

React + Vite + Tailwind CSS + Framer Motion.

## Run it locally

Needs Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## Where things are

| Path | What it holds |
|---|---|
| `src/data/profile.js` | Name, headline, intro, links, the three roles |
| `src/styles/globals.css` | Colour and type tokens (`@theme` block) |
| `src/components/` | One file per section |
| `public/images/` | Optimised photos and project screenshots |

## Deploy to GitHub Pages

1. Create a GitHub repository and push this `site` folder as its root.
2. In the repository, open Settings > Pages and set Source to "GitHub Actions".
3. Every push to `main` now builds and publishes the site
   (see `.github/workflows/deploy.yml`).

`vite.config.js` uses relative asset paths, so no repo name needs configuring.
