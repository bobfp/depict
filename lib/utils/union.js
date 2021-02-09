const branches = Symbol("branches");

export const union = (...keys) =>
  keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: (payload) => ({ [key]: payload, [branches]: keys }),
    }),
    {}
  );

export const branch = (union, value) => {
  const [[key, payload]] = Object.entries(value);
  const missingKeys = value[branches].filter(
    (x) => !Object.keys(union).includes(x)
  );
  if (missingKeys.length > 0) {
    console.warn(`Missing keys in branch: ${missingKeys}`);
  }
  return union[key](payload);
};
