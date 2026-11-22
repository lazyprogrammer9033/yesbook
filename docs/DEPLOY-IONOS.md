# Deploying yesbook.ca to IONOS

The site is a static export. `npm run build` creates an `out/` folder with every page as HTML, plus a small PHP script for the contact form. Any IONOS **Web Hosting** plan (with PHP) works. The cheapest plan is enough.

## Option A: automatic deploys from GitHub (recommended)

Every push to `main` builds the site and uploads it by SFTP, the same way as aischoolforkids.ca.

1. In IONOS, open **Hosting → SFTP & SSH** and note the host, user and password (create an SFTP user if needed).
2. In IONOS, open **Domains & SSL** and point `yesbook.ca` at a folder, for example `/yesbook`. Turn on the free SSL certificate.
3. In GitHub, open the repo → **Settings → Secrets and variables → Actions** and add:
   - `IONOS_SFTP_HOST` (e.g. `access-5012345678.webspace-host.com`)
   - `IONOS_SFTP_USER`
   - `IONOS_SFTP_PASSWORD`
   - `IONOS_SFTP_PATH` (the folder from step 2, e.g. `/yesbook`)
4. Merge to `main` (or run **Actions → Deploy to IONOS → Run workflow**). Until the secrets exist, the workflow only builds and skips the upload.

## Option B: manual upload

1. Run `npm run build` (or download the `out` folder from a GitHub Actions run).
2. Upload **everything inside** `out/` (including the hidden `.htaccess` file) to the domain's folder with the IONOS file manager or an SFTP app such as FileZilla.

## Other domains

Point `yesbook.ai` and `yesbookapp.com` (and `www.` versions) at the **same folder**. The `.htaccess` file redirects them all to `https://yesbook.ca`.

## Contact form email

- The form posts to `/api/contact.php`, which emails `contact@yesbook.ca` using IONOS's mail service.
- Create the `contact@yesbook.ca` mailbox (and `website@yesbook.ca`, the sender address) in **IONOS → Email**. Change addresses in `public/api/config.php`.
- Test it once after going live. If emails don't arrive, check the spam folder and that the "from" address exists on your domain.

## Analytics (optional, cookie-free)

Sign up for Plausible (or self-host Umami), then set `analytics.provider` in `src/lib/site.ts`. No cookie banner changes are needed because these tools don't use cookies.

## After launch

- Add the site to Google Search Console and submit `https://yesbook.ca/sitemap.xml`.
- Create a Google Business Profile for Yesbook (service area: GTA) and link to the site.
