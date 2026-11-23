# API Integration Handover — Real Capita B2B

## Purpose

Real Capita is the intermediary between **Chinese exporters/supplier stores** and **Bangladeshi business buyers**. The website must remain independent of supplier-specific API formats.

```text
Chinese supplier APIs (different stores)
       ↓
Node.js / TypeScript supplier connectors (private credentials)
       ↓
Normalization + currency/price rules + caching + validation
       ↓
Real Capita products and quotation backend
       ↓
Frontend product catalog and buyer/admin dashboards
```

## Current frontend adapter

All demo data calls pass through `assets/js/api.js` (exposed as `window.RC_API`):

- `getProducts({query,category})`
- `getCategories()`
- `getProductById(id)`
- `getRFQs()`
- `submitRFQ(rfq)`
- `getProfile()` and `saveProfile(profile)`
- `signIn()`, `register()`, `getSession()`, `signOut()` — **local preview account flow only; not production authentication**
- `getSaved()` and `toggleSaved(id)`
- `getAdminStatuses()` and `setAdminStatus(id,status)` — local preview RFQ status changes
- `addProduct(product)` and `deleteProduct(id)` — local preview catalog management
- `deleteRFQ(id)` and `resetPreviewData()` — local preview utilities

The current adapter stores preview accounts, RFQs, profile changes, saved products, admin statuses and custom products in browser `localStorage`. The demo buyer/admin credentials are public in the frontend and are only for supervisor preview. This is not shared data or real authentication. Swap the local adapter for calls to authenticated Real Capita backend routes when the backend is developed. Do not put supplier credentials in frontend JavaScript.

## Suggested future REST endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/products` | Paginated normalized catalog; filter, search, sort |
| GET | `/api/v1/products/:id` | Product detail + latest availability/source metadata |
| GET | `/api/v1/categories` | Controlled internal category hierarchy |
| POST | `/api/v1/auth/register` | Register a company user (server validation) |
| POST | `/api/v1/auth/login` | Secure login / session |
| GET/PATCH | `/api/v1/company/me` | Authorized company profile |
| POST | `/api/v1/rfqs` | Create RFQ (requires server-side checks) |
| GET | `/api/v1/rfqs/mine` | Business-owned requests only |
| GET | `/api/v1/admin/rfqs` | Restricted admin RFQ queue |
| PATCH | `/api/v1/admin/rfqs/:id/status` | Privileged workflow transition |
| GET | `/api/v1/admin/integrations` | Safe connection health, no secrets |

## Normalized product contract (example)

```json
{
  "id": "RC-1001",
  "externalProductId": "supplier-source-product-id",
  "sourceCode": "SUPPLIER_A",
  "name": "Industrial 3-Phase Electric Motor",
  "category": "Industrial Machinery",
  "description": "Industrial AC motor",
  "currency": "BDT",
  "indicativePrice": 12500,
  "moq": 10,
  "unit": "units",
  "images": [],
  "sourceUpdatedAt": "2026-12-01T00:00:00Z"
}
```

Production decisions still needed from the Real Capita supervisor: real source API providers and access contracts, product catalog ownership, how markups and shipping estimates are calculated, business verification requirements, quotation approval roles, and real importer/logistics process.

## Security checklist

1. Store supplier keys only in backend environment variables / secure secret storage.
2. Run all external supplier calls server-side; add timeouts, retries, rate limits and caching.
3. Validate, sanitize and normalize upstream product data; enforce clear provenance and refresh timestamps.
4. Protect buyer data by company/tenant; implement roles for customer, sourcing staff and admin.
5. Add signed/verified sessions, CSRF strategy where applicable, request validation and audit logging.
6. Treat foreign-currency product prices as indicative until a Real Capita quotation includes confirmed costs, freight, tax, duty and margin.
7. Never treat this demo's localStorage data as secure or as production recordkeeping.
