# Celebrity Dockets

Static HTML site tracking celebrity court cases — every filing, every ruling, every verdict.

**Live:** https://celebritydockets.com (pending deploy)

## Local dev

```bash
python3 -m http.server 8765 --directory /Users/robert/celebritydockets
```

Then open http://localhost:8765

## Structure

Flat static site. All pages are hand-written HTML with inline `<style>` and `<script>` — no build step, no framework.

- `index.html` — homepage
- `about.html`, `recess.html`, `courtroom-culture.html`, `star-bar.html`, `objection-live.html`, `docket-directory.html`, `legal.html` — main pages
- `*-v-*.html`, `*-lawsuits.html`, etc. — individual case pages
- `logo-transparent.png`, `favicon.png`, `*-profile.jpg`, `d4vd-courtroom-sketch.png` — image assets

## Deploy

Auto-deploys to DigitalOcean App Platform on push to `main`.
