Artistic Fit — storefront (React + Vite), front-end-only shop simulation

  npm install        install dependencies
  npm run dev        local dev server (http://localhost:5173)
  npm run build      production build into dist/ (deploy that folder to any static host)
  npm run logo       regenerate public/logo-ink.png and public/logo-paper.png from artisticfit-logo.png
  npm run images     rebuild public/products (2000px + 400/800/1200px sizes) and public/panels from source/products

Images: source/products holds the original photos (not served). They are low resolution, so run the
image build with Real-ESRGAN (https://github.com/xinntao/Real-ESRGAN/releases, realesrgan-ncnn-vulkan):
  REALESRGAN=C:/path/to/realesrgan-ncnn-vulkan.exe npm run images     (about 45s per photo)
Without REALESRGAN it only resizes. When better originals arrive, drop them into source/products under
the same file names and rerun. If the print sits in a different place in new back shots, update CROP
in scripts/enhance-images.mjs.

Routes (hash-based, so no server rewrites are needed):
  #/              home
  #/shop          all products
  #/p/<key>       product page (fire, water, soil, trees, air)
  #/cart          cart
  #/checkout      checkout (simulated payment: UPI / card / COD)
  #/order/<id>    order confirmation

There is no backend. The cart, saved checkout details and placed orders live in the browser's localStorage.

Where things live:
  src/data/products.js   products, names, colours, prices (placeholder prices: set the real ones)
  src/data/store.js      shipping threshold, fees, prepaid discount, coupons, sizes, size chart, specs, FAQ,
                         DEMO_MODE (shows "no real payment is taken" on checkout)
  src/lib/cart.jsx       cart state (add / qty / remove / coupon)
  src/lib/pricing.js     totals, discounts, delivery-date estimate
  src/pages/*            Home, Shop, Product, Cart, Checkout, Order
  src/styles.css         base brand styles; src/store.css: store UI (drawer, PDP, cart, checkout)

The newsletter form (SignupForm.jsx) reveals and applies the WELCOME10 code. Connect submit() to your mailing list provider.
To go live, replace the simulated payment step in src/pages/Checkout.jsx (placeOrder) with a real gateway such as Razorpay or Cashfree.
