# مداد · Midad

A single-page site for verses and sayings: one piece per screen, Arabic first, with an English toggle.

## Files

- `index.html`: the page, its styles and its behaviour. You only need to open it to change the name, the tagline or the colours.
- `pieces.js`: the content. Every quote and poem lives here.
- `.nojekyll`: tells GitHub Pages to serve the files as they are.

No build step, no dependencies, no backend. The only external resource is Google Fonts (Amiri, Aref Ruqaa, Cormorant Garamond).

## Add a piece

Open `pieces.js` and add an object to the `window.PIECES` list. The order of the list is the order on the site.

A poem. Each entry of `lines` is one bayt, written as a pair `[صدر, عجز]`:

```js
{
  kind: 'verse',
  ar: {
    lines: [
      ['صدر البيت الأول', 'عجز البيت الأول'],
      ['صدر البيت الثاني', 'عجز البيت الثاني']
    ],
    author: 'اسم الشاعر',
    source: 'الديوان'
  },
  en: {
    lines: [
      ['first half of the first line', 'second half of the first line'],
      ['first half of the second line', 'second half of the second line']
    ],
    author: 'Poet',
    source: 'The Diwan'
  }
},
```

A saying or a paragraph. Each string in `lines` is one paragraph:

```js
{
  kind: 'own',
  ar: { lines: ['الجملة الأولى.', 'فقرة ثانية إن وُجدت.'], author: 'من دفتري', source: '' },
  en: { lines: ['First sentence.', 'A second paragraph if there is one.'], author: 'From my notebook', source: '' }
},
```

Notes

- `kind` is one of `'verse'`, `'saying'`, `'own'`. The site does not use it yet; it is there for a later filter, for example a page with your own writing only.
- `source` can be `''`; the line is then hidden.
- `en` is optional. A piece without an English block shows its Arabic text when the site is in English, right to left and in the Arabic typeface.
- Keep the diacritics in the Arabic text. Amiri renders them well and they make the verses easier to read.
- Mind the commas and the quotes. If a piece breaks the file, the page loads with no pieces at all; the browser console (F12) names the line.

## Change the name, the tagline or the colours

In `index.html`, find `var UI = {` near the top of the script. The `name`, `tagline`, `intro` and `end` strings exist once per language. The `<title>` and the `<meta name="description">` at the top of the file carry the name for search engines and browser tabs; change them too.

The colours are the variables at the top of the stylesheet (`--paper`, `--ink`, `--accent` and their neighbours), with a second set for dark mode a few lines below.

## Run it on your computer

Double-click `index.html`. Everything works from a file; no server is needed.

## Publish on GitHub Pages

1. Create a new public repository on GitHub, for example `midad`.
2. Put the files in it. Either upload them in the browser (Add file, then Upload files) or from a terminal:

```
git clone https://github.com/USERNAME/midad.git
cd midad
# copy index.html, pieces.js, .nojekyll and README.md here
git add .
git commit -m "First version"
git push
```

3. In the repository, open Settings, then Pages. Under "Build and deployment" choose "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
4. After about 1 to 2 minutes the site is live at `https://USERNAME.github.io/midad/`.

Every later push redeploys the site. To add a quote from your phone, open `pieces.js` on GitHub, press the pencil icon, edit, and commit.

If you want the site at `https://USERNAME.github.io/` with nothing after it, name the repository `USERNAME.github.io`. A custom domain can be added on the same Pages page.

## When the list grows

The page builds every piece once at load. Each piece is a few lines of text, so a few hundred pieces cost nothing noticeable. The random draw and the index jump straight to a piece without scrolling through the ones in between. Once the index becomes hard to scan, the natural next additions are a search box in the index and a filter by `kind` or by author.

## Content

The classical verses in the starter list are public domain. The two placeholder entries signed "من دفتري" are meant to be replaced with your own writing.
