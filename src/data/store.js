// Store-wide settings for the front-end-only shop simulation.
// Everything here is a PLACEHOLDER: confirm the policies and fabric specs before launch.

export const DEMO_MODE = true; // shows "demo checkout, no payment is taken" on checkout

export const FREE_SHIPPING_AT = 1999; // subtotal (₹) for free standard shipping, i.e. 2 tees
export const SHIPPING_FEE = 99;
export const EXPRESS_FEE = 149;
export const PREPAID_OFF = 0.05; // extra 5% off on UPI / card (cuts COD share and RTO)
export const EXCHANGE_DAYS = 7;

export const COUPONS = {
  WELCOME10: { pct: 10, label: '10% off your first order' },
};
export const WELCOME_CODE = 'WELCOME10';

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

// Garment measurements in inches (oversized, dropped shoulder).
export const SIZE_CHART = [
  { size: 'S', chest: 42, length: 27, shoulder: 21 },
  { size: 'M', chest: 44, length: 28, shoulder: 22 },
  { size: 'L', chest: 46, length: 29, shoulder: 23 },
  { size: 'XL', chest: 48, length: 30, shoulder: 24 },
  { size: 'XXL', chest: 50, length: 31, shoulder: 25 },
];

export const SPECS = [
  ['Fit', 'Oversized, dropped shoulder. Take your usual size for the boxy look, or one size down for a closer fit.'],
  ['Fabric', '100% cotton, heavyweight 240 GSM jersey.'],
  ['Print', 'Full-colour artwork across the back; Artistic Fit oval on the chest.'],
  ['Care', 'Machine wash cold, inside out. Do not iron on the print. Dry in shade.'],
];

export const FAQ = [
  ['How does the fit run?', 'Every tee is cut oversized with a dropped shoulder. Take your usual size for the relaxed, boxy look, or one size down if you prefer it closer to the body. The size guide on each product has exact measurements.'],
  ['How long does delivery take?', 'Orders ship within 24–48 hours. Metro cities usually receive them in 3–5 days, and the rest of India in 5–7.'],
  ['Do you offer cash on delivery?', 'Yes, COD is available across India. Pay by UPI or card instead and you get an extra 5% off.'],
  ['What if it doesn’t fit?', `Exchange it within ${EXCHANGE_DAYS} days of delivery. The tee must be unworn and unwashed, with tags on. We pick it up from your door.`],
  ['Will the print crack or fade?', 'Turn the tee inside out, wash it cold and dry it in the shade, and the print will hold up for years. Never iron directly on the artwork.'],
];

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
