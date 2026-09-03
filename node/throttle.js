function throttle(fn, waitMs) {
  let last = 0;
  return function throttled(...args) {
    const now = Date.now();
    if (now - last >= waitMs) {
      last = now;
      fn.apply(this, args);
    }
  };
}

module.exports = { throttle };
