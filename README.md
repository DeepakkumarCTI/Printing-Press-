# Printora Studio

Responsive React + Vite + Tailwind CSS frontend for a printing press and custom merchandise business. Uses browser Local Storage for demo persistence.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Admin demo login

- Email: `admin@gmail.com`
- Password: `admin123`

Open `/login` to sign in. Successful admin login redirects to `/admin`.

## Included features

- Responsive customer website with Home, Services, Products, About, Quote Request, Order Tracking, and Contact sections.
- Product catalog with search and category filters.
- Product detail/custom order flow with size, material, quantity, optional design upload, calculated estimated price, and order creation.
- Quote request form stored locally.
- Order tracking by order ID and customer email.
- WhatsApp contact link.
- Admin dashboard to view orders and quotes, update order statuses, manage product availability/pricing, and inspect local customer requests.
- Local Storage persistence for products, orders, quotes, and demo admin session.
- Vercel rewrite for React Router routes.

## Important demo notes

This is a frontend-only demonstration. Data is saved in the current browser's Local Storage and is not shared between devices or users. The included admin credentials are public demo credentials and must not be used for a production deployment. Uploaded design files are stored as data URLs in Local Storage, so keep demo uploads small. Add a secure backend, authentication, and file storage before production use.
