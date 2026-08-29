export function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ||= []).push(item);
    return acc;
  }, {});
}

export function partition(items, predicate) {
  const pass = [];
  const fail = [];
  for (const item of items) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}
