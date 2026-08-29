# Portfolio

Source for [jeromeadoniszw.web.app](https://jeromeadoniszw.web.app), my personal site.

Built with Next.js 15 on the App Router, statically exported and served from
Firebase Hosting. No server runtime, no CMS, no component library. Content lives in
one file so the site is edited as data rather than as markup.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15, App Router, `output: "export"` |
| UI | React 19, CSS Modules, no UI library |
| Motion | GSAP with ScrollTrigger |
| 3D | Three.js |
| Hosting | Firebase Hosting, analytics via the Firebase web SDK |

## Running it

```bash
npm install
npm run dev
```

`npm run build` performs the static export into `out/`, which is what
`firebase.json` serves. Deploying is `firebase deploy --only hosting`.

## How it is organised

```
app/                 routes: /, /resume, /work/[slug]
components/
  VideoIntro/        split hero, video plate on the right
  CinematicLayer/    Three.js background
  sections/          Work, SelectedWork, Research, Leadership, Contact
  ui/                SectionNav, CollapsibleSection, StatusBadge, GlassButton
lib/
  projects.js        the content model, described below
  site.js            metadata and profile links
public/
  media/             hero video and poster
  sw.js              media service worker
resume-latex/        LaTeX source for the resume PDF
```

## The content model

`lib/projects.js` is the single source of truth for everything the site claims.
Two rules govern it, and they are the reason the file exists:

1. **Every project carries an honest `status`.** One of `deployed`, `production`,
   `award`, `finalist`, `prototype`, `hackathon`, `design` or `concept`, rendered by
   `StatusBadge`. A concept is labelled a concept. One overstatement makes a reader
   discount every other claim on the page.
2. **`links` holds only URLs verified to resolve publicly.** An empty array is a
   correct value. It renders a short note explaining why there is no link, rather
   than a button that leads to a 404 or a private repo.

Results carry `kind: "measured"` or `kind: "projected"`. Projected numbers render
dimmed and tagged, so an estimate can never be mistaken for something measured.

## Notes on a few decisions

**The hero video is cached by a service worker.** `public/sw.js` runs cache-first
over `/media/`, slicing Range requests into 206 responses by hand, because the video
is large and scrolling back up to a re-downloading video looked broken.

**Entrance and scroll animations never share an element.** A GSAP `.from()` renders
its start state immediately, and a scrubbed `.to()` created afterwards records that
state as its scroll start, so the element disappears on the way back up. The hero
splits these onto `.showcase` and `.showcaseInner` for exactly that reason.

**The Product Lab grid is flex, not grid.** With `repeat(auto-fit, ...)` the column
count is fixed by container width, so any card count that does not divide evenly
leaves holes in the last row. Flex items with `flex-grow: 1` consume the remainder
instead, so the block stays flush at any number of cards.

**Sections collapse with native `<details>`.** It stays keyboard accessible, remains
indexable, and works with JavaScript disabled.

## Licence

The code is available to read and learn from. The content, writing, images and video
are mine and are not licensed for reuse.
