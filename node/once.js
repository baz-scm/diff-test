function once(fn) {
  let called = false;
  let result;
  return function runOnce(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

module.exports = { once };
