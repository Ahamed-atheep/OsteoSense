# 🌐 OsteoSense — Website Deployment & Hosting Guide
*(Static Website Format — No Git Push Required)*

The project is compiled into an optimized, self-contained static website in the **`dist/`** directory. You can host and deploy this static bundle anywhere without requiring Git.

---

## 📁 What is Inside the `dist/` Distribution Folder?

```
e:/Sih004/dist/
├── index.html                   # Minified production HTML5 entry
├── _redirects                   # Netlify/Cloudflare SPA rewrite rules
├── favicon.svg                  # SVG favicon (medical shield & pulse)
├── manifest.json                # PWA manifest for mobile installability
└── assets/
    ├── index.css                # TailwindCSS stylesheet
    └── index.js                 # OsteoSense application logic
```

---

## 🚀 Deployment Options (Without Git)

### Option 1: Netlify Drop (Easiest — 30 Seconds)
1. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the **`dist`** folder directly into the browser window.
3. Your website is instantly live with a free SSL certificate (`https://your-site.netlify.app`).
*(SPA rewrites are already handled by the included `dist/_redirects` file).*

---

### Option 2: Vercel Direct Deploy
1. Open a terminal in `e:\Sih004`.
2. Run:
   ```bash
   npx vercel deploy --prod
   ```
3. Follow the CLI prompt. The included [vercel.json](file:///e:/Sih004/vercel.json) handles all SPA route fallbacks automatically.

---

### Option 3: Cloudflare Pages Direct Upload
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
2. Click **Create Application** → **Pages** → **Upload Assets**.
3. Drag and drop the **`dist`** folder.
4. Click **Deploy Site**.

---

### Option 4: Traditional Web Hosting (cPanel / Apache / Shared Hosting)
1. Open your cPanel File Manager or FTP client (FileZilla).
2. Navigate to your website's root directory (usually `public_html/` or `www/`).
3. Upload and extract all contents of the **`dist/`** folder into `public_html/`.
4. Ensure an `.htaccess` file exists in `public_html/` for SPA route rewriting:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Option 5: Containerized Hosting (Docker / AWS ECS / Google Cloud Run / DigitalOcean)
A production multi-stage [Dockerfile](file:///e:/Sih004/Dockerfile) and [nginx.conf](file:///e:/Sih004/nginx.conf) are included in the repository.

1. Build the Docker container image:
   ```bash
   docker build -t osteosense .
   ```
2. Run the container locally or on a cloud server:
   ```bash
   docker run -d -p 80:80 --name osteosense-app osteosense
   ```
3. Access the site at `http://localhost/` or your server IP.

---

## 💻 Running the Production Website Locally

### 1-Click Method (Windows):
Double-click the **[start_website.bat](file:///e:/Sih004/start_website.bat)** file in the root directory.

### Command Line Method:
```bash
# Option A: Zero-dependency Node server (serves on port 5000)
npm run serve
# Local URL: http://localhost:5000/

# Option B: Built-in Vite production preview
npm run preview
```

---

## 🔄 Rebuilding After Code Edits
Whenever you make further modifications to the source code in `src/`, re-generate the `dist/` website bundle with:
```bash
npm run build
```
