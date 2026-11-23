# QA checklist — functional frontend preview

## Source checks completed for this package
- JavaScript syntax checked with Node.js for all files in `assets/js/`.
- HTML pages checked for required local CSS, JavaScript and image references.
- API adapter smoke-tested for demo admin login, buyer registration, registered buyer login, RFQ persistence, admin status persistence and custom product creation.
- ZIP should be tested after extraction and after GitHub Pages deployment.

## Manual browser checklist before supervisor demonstration
- [ ] Homepage opens and official logo loads.
- [ ] Header search submits to product catalog.
- [ ] Category links open the catalog with the selected category.
- [ ] Product catalog search works.
- [ ] Category and MOQ filters work.
- [ ] Sort by price/name works.
- [ ] Product detail modal opens.
- [ ] Product save/unsave works and saved-only filter works.
- [ ] RFQ modal opens from product cards and floating action.
- [ ] RFQ submission appears in buyer and admin dashboard in the same browser.
- [ ] New buyer registration creates a local account and opens buyer dashboard.
- [ ] Registered buyer can sign in again with the same email/password.
- [ ] Buyer can save company profile changes.
- [ ] Admin demo login opens admin dashboard.
- [ ] Admin can update an RFQ status.
- [ ] Admin can add a custom sample product and see it in the catalog.
- [ ] Admin can remove a custom sample product.
- [ ] Sign out clears the current local session.
- [ ] Layout works at desktop and mobile sizes.

## Note
This checklist does not certify production security, backend integration, supplier API connectivity, Google OAuth, payments, or order fulfillment.
