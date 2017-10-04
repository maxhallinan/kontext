export const branch = (predicate) => (left) => (right) => (...xs) =>
  (predicate(...xs)
    ? right(...xs)
    : left(...xs));

export const entries = (src) => Object.keys(src)
  .map(key => ([ key, src[key], ]));

export const typeOf = (x)  =>
  ({}).toString
    .call(x)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
