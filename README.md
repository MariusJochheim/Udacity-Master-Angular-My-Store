# MyStore Angular Storefront

MyStore is a single-page ecommerce storefront built with Angular for the Udacity Frontend Nanodegree project. It loads product data from the provided JSON file, lets users add products to a shared cart, validates checkout input, and shows an order confirmation page after checkout.

## Features

- Product list loaded with Angular `HttpClient` from `src/assets/data.json`
- Product detail page with photo, name, price, and description
- Shared shopping cart service for product list, product detail, and cart pages
- Editable cart quantities, remove buttons, and total cost
- Template-driven checkout form with validation
- Confirmation page after successful checkout
- Angular routing with `routerLink` and `<router-outlet>`

## Install and Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open `http://localhost:4200/` in a browser.

## Build and Test

Create a production build:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

## Project Structure

- `src/app/components`: product list, product item, product detail, cart, and confirmation components
- `src/app/layout`: shared header component
- `src/app/models`: product, cart, checkout, and order TypeScript models
- `src/app/services`: product loading, cart state, and order confirmation services
- `src/assets/data.json`: product data used by the store
