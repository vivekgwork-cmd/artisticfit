Artistic Fit — coming soon storefront (React + Vite)

  npm install        install dependencies
  npm run dev        local dev server (http://localhost:5173)
  npm run build      production build into dist/ (deploy that folder to any static host)
  npm run logo       regenerate public/logo-ink.png and public/logo-paper.png from artisticfit-logo.png
  npm run panels     re-crop the artwork panels (public/panels) from the back-view photos in public/products

Products, names, colours and prices live in src/data/products.js (price: null shows "Coming soon").
Product photos are 2000x2000 on a #d9d2c8 backdrop; the site palette in src/styles.css is matched to them.
The signup form is front-end only; hook SignupForm.jsx's submit() up to your mailing list provider.
