# 1971 Ford F-100 Ranger XLT — Listing Site

A single-page, mobile-responsive listing site for the 1971 F-100 Ranger XLT,
designed to be linked from Facebook Marketplace, Craigslist, and direct texts
and emails.

It's **plain HTML, CSS, and one small JavaScript file** — no framework, no
build step, no tracking. The lightbox is custom (~80 lines in `script.js`)
so there's nothing external to update.

---

## What's in this project

```
f100-listing-site/
├── index.html     ← all content lives here, clearly sectioned with comments
├── styles.css     ← all styling
├── script.js      ← reveal-on-scroll + lightbox
├── photos/        ← drop your optimized photos in here (see below)
└── README.md      ← this file
```

---

## Before you deploy — two things to finish

### 1. Add the photos

The site expects **24 photos** inside the `photos/` folder, with these exact
filenames. Copy the source photos from your `source-photos/` folder, optimize
them (resize longest edge to **1800px**, compress as **JPEG quality 82**,
keep aspect ratios), and rename them like this:

| New filename | Source filename |
|---|---|
| `01-hero-charleston-profile.jpeg` | IMG_3869.jpeg |
| `02-beach.jpeg` | IMG_0081.jpeg |
| `03-front-three-quarter.jpeg` | IMG_3917.jpeg |
| `04-front-three-quarter-alt.jpeg` | IMG_3918.jpeg |
| `05-rear-three-quarter.jpeg` | IMG_3919.jpeg |
| `06-rear-three-quarter-alt.jpeg` | IMG_3920.jpeg |
| `07-downtown-front.jpeg` | IMG_3190.jpeg |
| `08-downtown-side.jpeg` | IMG_3183.jpeg |
| `09-palms.jpeg` | IMG_2799.jpeg |
| `10-juice-bar.jpeg` | IMG_3336.jpeg |
| `11-engine-wide.jpeg` | IMG_3925.jpeg |
| `12-engine-wilwood.jpeg` | IMG_3926.jpeg |
| `13-engine-opposite.jpeg` | IMG_3927.jpeg |
| `14-engine-topdown.jpeg` | IMG_3928.jpeg |
| `15-wilwood-detail.jpeg` | IMG_3929.jpeg |
| `16-valvecover-detail.jpeg` | IMG_3930.jpeg |
| `17-intake-detail.jpeg` | IMG_3931.jpeg |
| `18-interior-driver.jpeg` | IMG_3932.jpeg |
| `19-interior-wide.jpeg` | IMG_3933.jpeg |
| `20-dash-original.jpeg` | IMG_3934.jpeg |
| `21-underside-rear.jpeg` | IMG_3921.jpeg |
| `22-underside-front.jpeg` | IMG_3922.jpeg |
| `23-underside-alt.jpeg` | IMG_3923.jpeg |
| `24-underside-rear-exhaust.jpeg` | IMG_3924.jpeg |

**Easy way to resize + compress (Mac):**

1. Open all the source photos in Preview.
2. Select all → *Tools → Adjust Size* → set the long edge to 1800 px.
3. *File → Export* → Format: JPEG, Quality: ~82%.
4. Rename using the table above (a batch rename in Finder works: select files,
   right-click → *Rename…*).

Or if you're comfortable with the command line and have ImageMagick installed:

```bash
cd source-photos
mkdir -p ../photos
for f in *.jpeg; do
  magick "$f" -resize '1800x1800>' -quality 82 "../photos/$f"
done
# …then rename the outputs per the table above.
```

### 2. Fill in your contact method

Open `index.html` and search for `[CONTACT METHOD — FILL IN BEFORE DEPLOY]`.
Replace both the link text and the `href="#"` with whatever you want buyers
to use:

- **Phone:** `<a class="cta-button" href="tel:+18435551234">Call or Text (843) 555-1234</a>`
- **Email:** `<a class="cta-button" href="mailto:you@example.com">Email You@Example.com</a>`
- **Messenger:** `<a class="cta-button" href="https://m.me/yourprofile">Message on Facebook</a>`

---

## Preview it locally

The simplest way: **double-click `index.html`** to open it in your browser.
That's it — no server needed.

If you prefer a local web server (some browsers are pickier about relative
image paths in local files), you can use Python:

```bash
cd path/to/this/folder
python3 -m http.server 5173
# then open http://localhost:5173
```

---

## Deploy to Vercel (recommended — easiest)

**Option A: drag-and-drop, no account required to try**

1. Go to <https://vercel.com/new> and sign in with GitHub, GitLab, or email.
2. Click the "**Deploy a Template**" dropdown → choose "**Import an existing
   project**" → pick "**Deploy without Git**" (or just the plain "Deploy" flow).
3. Drag the entire `f100-listing-site` folder onto the page.
4. Leave all settings at their defaults — there's no build step, no framework
   to select. Click **Deploy**.
5. In ~20 seconds Vercel gives you a live URL like
   `f100-listing-site.vercel.app`. That's your link.

**Option B: with Git (if you pushed this folder to GitHub)**

1. Go to <https://vercel.com/new>.
2. Click "**Import Git Repository**" and pick this repo.
3. Framework Preset: **Other**. Build Command: *(leave blank)*. Output Dir:
   *(leave blank)*. Click **Deploy**.
4. Any time you `git push`, Vercel auto-deploys.

**Custom domain:** after deploying, go to Project → Settings → Domains, and
add something like `f100.yourdomain.com` or `1971f100.com`. Vercel walks you
through the DNS setup.

---

## Deploy to Netlify (alternative)

1. Go to <https://app.netlify.com/drop>.
2. Drag the `f100-listing-site` folder onto the page. That's it — you get a
   live URL immediately.
3. (Optional) Sign in to claim the site so it doesn't expire, rename it, or
   attach a custom domain.

---

## Editing the site later

The HTML file is heavily commented. Search for these landmarks:

| To change… | Search `index.html` for… |
|---|---|
| The **price** | `$44,500` (appears in masthead and CTA) |
| The **title / trim / bed info** | `masthead-title` or `meta-row` |
| **The pitch paragraph** | `THE PITCH` |
| Any **spec line** | `SPECS` |
| The **ownership timeline** | `OWNERSHIP HISTORY` |
| The **honest-notes / cosmetic issues** | `STRAIGHT TALK` |
| **Contact info** | `[CONTACT METHOD` or `CTA` |
| **Listing date** in the footer | `Listing prepared April 2026` |
| The **Open Graph title/description** (how it looks when pasted into Facebook) | `EDITABLE META` near the top |

For styling tweaks, the color palette is at the top of `styles.css` as CSS
variables (`--cream`, `--green`, `--wood`, `--brick`, etc.) — change them in
one place and it cascades through the whole site.

---

## Notes on choices I made

- **No framework, no build step.** Pure HTML/CSS/JS. You can edit any file in
  any text editor and refresh your browser.
- **Custom lightbox** (rather than GLightbox / PhotoSwipe) to avoid an external
  dependency. It's ~80 lines at the bottom of `script.js`, supports keyboard
  arrows, Esc, click-outside-to-close, and swipe on mobile.
- **Fonts are loaded from Google Fonts** (Fraunces, JetBrains Mono, Inter) —
  that's the only external resource the site loads.
- **No analytics, no tracking, no third-party scripts.**
- **Print stylesheet** is included, so buyers can save a clean PDF of the
  listing if they want (File → Print → Save as PDF).
- **Photos aren't bundled with the code** — the `photos/` folder is empty at
  the moment. Drop them in per the table above before deploying.
- **Reveal-on-scroll animation** is gentle (fade up a few pixels once) and
  respects `prefers-reduced-motion`.

If anything feels off once you see it with real photos, most tweaks are one
variable in `styles.css` or a line of HTML.
