function memo(fn) {
  const cache = new Map();
  return function memoized(key) {
    if (!cache.has(key)) {
      cache.set(key, fn(key));
    }
    return cache.get(key);
  };
}

module.exports = { memo };
