# GitHub Pages deployment — Real Capita B2B frontend

## Recommended method: included GitHub Actions workflow

1. Create a GitHub repository.
2. Extract the website ZIP.
3. Upload the **contents** of the extracted folder to the repository root. The root must contain `index.html`, the seven page files, `assets/`, `.nojekyll`, and `.github/`.
4. Commit to the `main` branch.
5. Go to repository **Settings → Pages**.
6. Set **Source** to **GitHub Actions**.
7. Go to **Actions** and wait for the Pages deployment workflow to complete.
8. Open **Settings → Pages** to copy the public URL.

The workflow in `.github/workflows/pages.yml` deploys the repository root as a static website. A new deployment runs after each push to `main`.

## Alternative: deploy from branch

If you do not want to use GitHub Actions:
1. Remove or disable `.github/workflows/pages.yml`.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch**.
4. Select `main` and `/(root)`.
5. Save and wait for the published URL.

## Before sharing with your supervisor

- Open the homepage.
- Test the product catalog search, category filter and saved products.
- Submit a test RFQ.
- Sign in using the demo buyer credentials and inspect the buyer dashboard.
- Sign out, then sign in using the demo admin credentials and update an RFQ status.
- Add a temporary product in the admin product tab and confirm it appears in the catalog.
- Test the website on a phone-sized screen.

Remember: all test records are saved only in the current browser. GitHub Pages hosts the static frontend; it does not provide a shared database or backend.
