const oneFrom = options => {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
};

export const bool = () => oneFrom([true, false]);

export const number = ({
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER
} = {}) => Math.floor(Math.random() * (max - min + 1)) + min;

export const int = options => Math.floor(number(options));

export const string = ({ maxLength = 250, minLength = 0 } = {}) => {
  const stringLength = int({ max: maxLength, min: minLength });
  return Array(stringLength)
    .fill()
    .map(() => String.fromCharCode(int({ max: 126, min: 32 })))
    .join("");
};

export const object = shape => () => {
  const entries = Object.entries(shape).map(([key, value]) => ({
    [key]: value.gen()
  }));
  return Object.assign({}, ...entries);
};
