# 6 Figure Business Credit — Landing Site

## Deploy to Vercel

### Option 1: Push to GitHub + Auto Deploy
1. Create a new GitHub repo
2. Push this project to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) → "Add New Project"
4. Import your GitHub repo
5. Vercel auto-detects Vite — click **Deploy**
6. Done! Your site is live.

### Option 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the prompts. Vercel detects the Vite config automatically.

## Local Development
```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`

## Build for Production
```bash
npm run build
```
Output goes to `/dist`

## After Deploying

### Connect Custom Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add `derickoppong.com`
3. Update your DNS records as Vercel instructs

### Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://derickoppong.com`
3. Verify via DNS or HTML tag
4. Submit sitemap: `https://derickoppong.com/sitemap.xml`

### Add OG Image
Replace `/public/og-image.jpg` with a 1200x630px branded image for social sharing previews.

### Add Favicon
Replace the favicon files in `/public/`:
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`

## Project Structure
```
6figure-site/
├── public/
│   ├── derick-oppong.jpg      # Photo
│   ├── robots.txt             # SEO
│   └── sitemap.xml            # SEO
├── src/
│   ├── App.jsx                # All pages & components
│   ├── main.jsx               # React entry point
│   └── styles.css             # All styles
├── index.html                 # SEO meta tags + structured data
├── package.json
├── vite.config.js
├── vercel.json                # SPA routing + caching
└── .gitignore
```
