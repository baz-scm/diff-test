export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function applyDiscount(amount, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError("percent must be between 0 and 100");
  }
  return amount * (1 - percent / 100);
}

export function total(items, discountPercent = 0) {
  return applyDiscount(subtotal(items), discountPercent);
}
