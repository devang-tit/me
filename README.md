# Wedding Invitation Website

Single-page 3D-animated wedding site (Next.js + Three.js + GSAP ScrollTrigger), exported as a static site.

## Run it

Needs Node 18.18 or newer (`nvm use 22`).

```bash
npm install
npm run dev        # http://localhost:3000 while editing
npm run build      # writes the finished static site to ./out
npm start          # preview ./out locally
```

## Edit it — everything is in `config/site.js`

| What | Where |
| --- | --- |
| Names, hashtag, dates, countdown | section 1 |
| Phone / WhatsApp number, Google Sheets URL | section 2 |
| Photo and music paths | section 3 |
| Event names, times, calendar start/end | section 4 |
| Venue name, address, map search, travel notes | section 5 |
| Our Story milestones | section 6 |
| Every label, in English and Gujarati | section 7 |

`siteUrl` must be the final deployed address, or the WhatsApp link preview image will not load.

## Photos and music

Drop files into `public/` with these names (or change the paths in the config):

- `public/images/hero.jpg` — portrait, about 900 × 1200
- `public/images/story-1.jpg` … `story-8.jpg` — landscape, about 1200 × 750
- `public/images/gallery-1.jpg` … `gallery-8.jpg` — portrait, about 900 × 1300
- `public/music/wedding.mp3` — background song (plays only after the guest taps the music button)
- `public/og-image.png` — 1200 × 630 share preview (a generic one is included; replace it with your own photo if you like)

Any missing photo shows a labelled placeholder with the file name it expects. Keep photos under ~300 KB each so the site loads fast on phones.

## Blessings form

By default "Send Blessings" opens WhatsApp with the message addressed to `contact.whatsapp`.
To also save every entry in a Google Sheet: open the sheet → Extensions → Apps Script, paste

```js
function doPost(e) {
  SpreadsheetApp.getActiveSheet().appendRow([new Date(), e.parameter.name, e.parameter.guests, e.parameter.message]);
  return ContentService.createTextOutput('ok');
}
```

Deploy → New deployment → Web app → access "Anyone", then paste the URL into `googleSheetsUrl`.

## Deploy for free

- **Vercel**: import the repo; no settings needed.
- **Netlify**: build command `npm run build`, publish directory `out` (or drag the `out` folder onto app.netlify.com/drop).
- **GitHub Pages**: `NEXT_PUBLIC_BASE_PATH=/<repo-name> npm run build`, then publish the `out` folder (add an empty `out/.nojekyll` file).
