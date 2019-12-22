export const isBool = val => typeof val === "boolean";

export const isNumber = (
  val,
  { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = {}
) => {
  if (typeof val === "number") {
    return val <= max && val >= min;
  }
  return false;
};

export const isInt = (
  val,
  { max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER } = {}
) => {
  if (Number.isInteger(val)) {
    return val <= max && val >= min && val;
  }
  return false;
};

export const isString = (val, { maxLength = 250, minLength = 0 } = {}) => {
  if (Object.prototype.toString.call(val) === "[object String]") {
    return val.length <= maxLength && val.length >= minLength;
  }
  return false;
};

export const isObject = shape => val => {
  if (Object.prototype.toString.call(val) === "[object Object]") {
    // check keys
    const containsRequiredKeys = Object.keys(shape)
      .map(key => Object.keys(val).includes(key))
      .reduce((f, b) => f && b, true);

    if (containsRequiredKeys) {
      // validate object values
      return Object.entries(shape)
        .map(([key, depiction]) => depiction.validate(val[key]))
        .reduce((f, b) => f && b, true);
    }
  }
  return false;
};
