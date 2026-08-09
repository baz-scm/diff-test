export function chunk(items, size) {
  if (size < 1) {
    throw new RangeError("size must be at least 1");
  }
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function unique(items) {
  return [...new Set(items)];
}
