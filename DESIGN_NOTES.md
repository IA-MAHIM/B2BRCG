# Real Capita UI / Design Notes

## Visual direction

- White background, dark professional typography, green for buying / quotation actions, blue for supporting sourcing services.
- Compact marketplace masthead: logo → category menu → search → services → saved/RFQ/account icons.
- Persistent desktop category rail; mobile uses a collapsible navigation menu.
- Wide sourcing banners, source-category collection cards, compact quotation-centric product cards and floating support controls.
- Banners and product illustrations use local SVG graphics; official company branding uses the provided Real Capita PNG logo. All these assets work offline.

## UI scope

Seven static HTML entrypoints share one CSS, one UI JavaScript bundle and a mock API layer. No supplier integration, backend authorization or payment processing is implemented. Prices, lead times, labels and RFQ data are illustrative.

## Updated account experience

- The official logo is visible across all seven pages.
- Login and registration are separate routes, with separate visual layouts and forms.
- Extended business registration provides details that can later support buyer verification and targeted RFQs.
- Google Identity Services integration can be activated by configuring a Web Client ID and backend verification URL; see `GOOGLE_SIGN_IN_SETUP.md`.

V5: Promotional blocks removed from home hero, login, and registration; updated full-width/centered layouts; clearer, darker text and increased font sizing across pages.
