# Static Site (Light + Paper + Athena + Buttondown + Investor Gate)

## What’s included
- Light theme with paper texture background (`images/paper.jpg`)
- Athena font setup (`@font-face`), drop files into `/assets/fonts/`
- Buttondown newsletter form with honeypot + time-gate anti-bot
- Investors page `/investors/` with:
  - Client-side unlock (password hash + QR key)
  - Optional Netlify Basic Auth via `_headers`
  - `teaser.pdf` placeholder

## Quick setup (5–10 min)
1. **Branding**
   - Edit `index.html` copy and nav labels.
   - In `styles.css`, set `--accent` to your brand color.
2. **Images**
   - Replace images in `/images` (keep filenames or update `<img src>`).
3. **Fonts (Athena)**
   - Put your `.otf`/`.woff2` in `/assets/fonts/` and adjust filenames in `styles.css` if needed.
4. **Newsletter (Buttondown)**
   - In `index.html`, replace `YOUR_BUTTONDOWN_USERNAME` in the form `action`.
5. **Investors gate**
   - In `/investors/index.html`:
     - Set `const KEY = "YOUR-QR-INVITE-KEY"` (use this in your QR URL query: `?k=YOUR-QR-INVITE-KEY`).
     - Replace `const HASH = "..."` with the SHA‑256 of your chosen password (or ask Ember to generate it).
   - Replace `/investors/teaser.pdf` with your real teaser deck.
6. **Optional: Real protection (recommended)**
   - In `_headers`, change `Basic-Auth: investor:changeme` to `investor:YOURPASSWORD`.
   - Deploy to Netlify (drop the folder). PDF is then server-protected.

## Notes
- Client-side gates are convenience only. Use Netlify/Vercel auth or a data room for sensitive docs.
- To change fonts for headings only: in `styles.css`, set `h1,h2,h3 {{ font-weight:700; }}` etc.
