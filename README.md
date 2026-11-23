# Real Capita Group — B2B Sourcing Frontend

A responsive, interactive **frontend prototype** for Real Capita Group's China-to-Bangladesh B2B product-sourcing workflow. The site is static HTML, CSS and JavaScript and is prepared for deployment with GitHub Pages.

## Pages included

| Page | File | What you can test |
|---|---|---|
| Homepage | `index.html` | Search, categories, featured products, RFQ modal |
| Product catalog | `catalog.html` | Search, category and MOQ filters, sorting, saved products, product details |
| Sign in | `login.html` | Demo buyer/admin login and locally registered accounts |
| Business registration | `register.html` | Create a local buyer account and save company information |
| Buyer dashboard | `buyer-dashboard.html` | View sample and locally submitted RFQs, saved product count |
| Company profile | `company-profile.html` | Edit and save business profile information |
| Admin dashboard | `admin-dashboard.html` | Update RFQ statuses, add/remove local catalog products, view supplier integration readiness |

## Quick preview

1. Download and extract the ZIP.
2. Open the extracted folder. `index.html` must be at the folder's top level.
3. Double-click `index.html` to preview in Chrome, Edge or Firefox.
4. For best results, use a local static server or deploy to GitHub Pages. The application uses browser `localStorage` for its preview data.

## Supervisor preview login

Use these credentials on `login.html`:

| Role | Email | Password |
|---|---|---|
| Buyer | `buyer@realcapita.demo` | `Buyer@123` |
| Admin | `admin@realcapita.demo` | `Admin@123` |

You can also create a new buyer account from the registration page. Do not use real personal passwords in this prototype.

## Functional preview features

- Product search from the header and catalog.
- Category, MOQ and saved-only filters.
- Sort products by price or name.
- Open product details.
- Save/unsave products.
- Submit an RFQ with product, quantity, company, email and notes.
- Store RFQs in the current browser and display them in buyer/admin dashboards.
- Change RFQ statuses in the admin workspace.
- Register a local buyer account and sign in again with that account.
- Save company profile changes.
- Add and remove custom sample products from the admin catalog panel.
- Responsive navigation for mobile and desktop.

## Deploy online with GitHub Pages

This package includes `.github/workflows/pages.yml` to publish the website automatically whenever you push to the `main` branch.

1. Create a new GitHub repository, for example `real-capita-b2b-frontend`.
2. Extract this ZIP on your computer.
3. Upload **all files and folders inside the extracted folder** to the repository root. Do not upload only the ZIP. Make sure `index.html`, `assets/`, and `.github/` are at the repository root.
4. Commit the files to the `main` branch.
5. In GitHub, open **Settings → Pages**.
6. Under **Build and deployment → Source**, select **GitHub Actions**.
7. Open the repository's **Actions** tab and wait for “Deploy Real Capita static frontend to GitHub Pages” to finish successfully.
8. GitHub will show the public website URL under **Settings → Pages** or in the deployment details. Share that URL with your supervisor.

If you prefer not to use the included workflow, you can remove `.github/workflows/pages.yml` and use **Deploy from a branch → main → /(root)** in Settings → Pages instead.

## Important limitations — read before presenting as production

This is a functional frontend prototype, not a complete production application:

- Product catalog content and indicative BDT prices are sample data.
- Accounts, sessions, saved products, profile updates, RFQs and admin changes are stored in the **current visitor's browser** using `localStorage`.
- A visitor's data is not shared with another visitor, browser, computer or Real Capita staff. If your supervisor submits an RFQ in their browser, you will not automatically see it in yours.
- Demo login credentials are included in public JavaScript and are not secure. The role check is only a client-side preview gate, not real authorization.
- Google sign-in is an integration placeholder. It requires a Google OAuth client ID and a secure backend verification endpoint.
- No supplier API is connected. The admin integration panel is a readiness placeholder.
- No real payment, customs, shipping booking, order placement, invoice or delivery tracking is connected.
- Never store real buyer data, passwords, supplier API keys or confidential company information in this public static demo.

## Future production architecture

`Next.js frontend → Real Capita Node.js/TypeScript backend → PostgreSQL + supplier connector layer → multiple supplier APIs`.

The browser should call only Real Capita's backend. Supplier API secrets must remain server-side. Supplier-specific product records should be normalized into one Real Capita product schema before being returned to the frontend.

## Main source folders

```text
index.html
catalog.html
login.html
register.html
buyer-dashboard.html
company-profile.html
admin-dashboard.html
assets/
  css/
  images/
  js/
.github/workflows/pages.yml
```

See `API_INTEGRATION_GUIDE.md`, `GOOGLE_SIGN_IN_SETUP.md`, `GITHUB_PAGES_DEPLOYMENT.md` and `FUNCTIONAL_PREVIEW_GUIDE.md` for additional details.
