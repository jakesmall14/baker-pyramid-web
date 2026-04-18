# The Baker Pyramid — Site Guide

This is a static Astro site. The PDF is the newspaper. Everything else exists to serve it.

---

## Adding a New Issue

Drop the PDF into `/public/issues/` with this exact naming convention:

```
pyramid-issue-21.pdf
pyramid-issue-22.pdf
```

That is all. No code changes required.

- The homepage will automatically display the highest-numbered issue.
- An archive page at `/archive/21` will be generated automatically.
- The Archive Library modal will include the new issue.

**Naming rule:** `pyramid-issue-XX.pdf` where `XX` is a zero-padded or plain integer (both `21` and `021` work, but be consistent).

---

## How the Latest Issue Is Determined

At build time, `src/utils/issues.js` reads all files in `/public/issues/`, filters for the naming pattern `pyramid-issue-(\d+).pdf`, extracts the issue numbers, sorts them numerically, and picks the highest. No manifest file, no config — just the filenames.

---

## How Archive Pages Are Generated

`src/pages/archive/[issue].astro` uses Astro's `getStaticPaths()` which calls `getIssues()` at build time. One static route per issue is generated. No hand-maintained route list exists.

---

## Adding an Interactive Resource Link

Open `resources.json` at the project root and add an entry:

```json
{ "name": "Exact Name As It Appears In The PDF", "url": "https://..." }
```

The name must match the text in the PDF exactly (case-sensitive, including accented characters). On the next build/reload, an invisible clickable anchor will appear over every occurrence of that name in the rendered PDF. Clicking it opens the URL in a new tab.

---

## Updating the Music Calendar

Open `calendar.json` at the project root and add or edit entries:

```json
{
  "venue": "Venue Name",
  "event": "Event Title",
  "day": "Wednesday",
  "time": "8:00 PM",
  "url": "https://..."
}
```

The `url` field is optional. Changes appear on the next build.

---

## Running Locally

```bash
npm install
npm run dev
```

The site is available at `http://localhost:4321`. Hot reloading is active for source files. Changes to `/public/issues/` require restarting the dev server to be picked up by the build-time scanner.

---

## Deploying Changes

```bash
npm run build
```

The built site is in `/dist`. Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

For Netlify/Vercel: push to the `main` branch and CI will build and deploy automatically.

---

## Design Constraints

- Black and white only. No color anywhere, including hover states.
- The PDF is always the primary object. The UI is secondary.
- Never reconstruct issue layout as HTML.
- Never require manual code edits to publish a new issue.
