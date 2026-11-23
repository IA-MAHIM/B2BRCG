# Functional preview guide

## Test buyer flow
1. Open `register.html` and create a test business account with a valid email and a password of at least 8 characters.
2. You will be redirected to the buyer dashboard.
3. Open the catalog, search for a product, filter by category/MOQ, and save a product with the heart icon.
4. Open a product detail and submit a quotation request.
5. Return to the buyer dashboard. The new RFQ and saved product count should be visible.
6. Open Company Profile, edit company information and save it.
7. Use Sign out in the buyer sidebar.

## Test admin flow
1. Open `login.html`.
2. Sign in with `admin@realcapita.demo` and `Admin@123`.
3. Open RFQ Queue and change the status of a request.
4. Open Product Catalog, add a local sample product, and then open the public catalog to find it.
5. Remove a custom product from the admin product panel if required.
6. Open Supplier Integrations to review the future API connector plan.

## Demo buyer account
- Email: `buyer@realcapita.demo`
- Password: `Buyer@123`

## Demo admin account
- Email: `admin@realcapita.demo`
- Password: `Admin@123`

## Data reset
Browser preview records are stored in localStorage. To reset the preview, clear this website's site data in your browser developer/settings tools. This removes demo accounts, RFQs, saved products, profile changes and custom products from that browser.

## Honest scope statement
The front-end interactions are functional in the current browser, but they do not transmit data to Real Capita. Shared data, verified authentication, role authorization, supplier API calls and production workflows require the backend and database.
