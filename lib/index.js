export const boolean = {
  validatorName: "boolean",
  validator: value => typeof value === "boolean",
  name: "boolean",
  conformer: value => Boolean(value)
};

export const string = {
  validatorName: "string",
  validator: value =>
    Object.prototype.toString.call(value) === "[object String]",
  name: "string"
};

export const isValid = (depiction, value) => depiction.validator(value);

export const explain = (depiction, value) =>
  depiction.validator(value)
    ? []
    : [
        {
          value,
          depiction: depiction.name,
          validator: depiction.validatorName,
          dPath: [depiction.name],
          vPath: []
        }
      ];

export const conform = (depiction, value) => depiction.conformer(value);

export default (name, depiction) => ({ ...depiction, name });
