# TanStack Router Setup

## Routes

- `/` - Home page with payment options (Layout component)
- `/payment/:id` - Payment details page
- `/checkout/mfs/:provider/:type/:hash` - MFS checkout page

## Example URLs

- Home: `http://localhost:5173/`
- Payment: `http://localhost:5173/payment/123`
- bKash Checkout: `http://localhost:5173/checkout/mfs/bkash/1/bac303ad226facb3bbea00fcc5e2a078b1cd8284`
- Nagad Checkout: `http://localhost:5173/checkout/mfs/nagad/1/bac303ad226facb3bbea00fcc5e2a078b1cd8284`

## Parameters

### `/checkout/mfs/:provider/:type/:hash`
- `provider`: Payment provider (bkash, nagad, rocket, cellfin, upay)
- `type`: Payment type (1 for personal, 2 for merchant, etc.)
- `hash`: Transaction hash for security

## Development

Run the dev server:
```bash
npm run dev
```

The TanStack Router plugin will automatically generate the route tree at `src/routeTree.gen.ts`.
