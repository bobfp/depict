export const boolean = {
  name: "boolean",
  validatorName: "boolean",
  validator: (value, name) => {
    const success = typeof value === "boolean";
    return {
      conformedValue: value,
      validations: [
        {
          success,
          value: value,
          dPath: [name],
          vPath: [],
          validator: "boolean"
        }
      ]
    };
  }
};

export const string = {
  name: "string",
  validatorName: "string",
  validator: (value, name) => {
    const success = Object.prototype.toString.call(value) === "[object String]";
    return {
      conformedValue: value,
      validations: [
        {
          success,
          value: value,
          dPath: [name],
          vPath: [],
          validator: "string"
        }
      ]
    };
  }
};

export const execute = (depiction, value) => {
  return depiction.validator(value, depiction.name);
};

export default (name, depiction) => ({ ...depiction, name });

/*
const result = {
  conformedValue,
	validations
}
const validation = {
	success: true,
	value,
	depiction,
	validator,
	dPath,
	vpath
}
const execute = (depiction, value) => result

 * */

export const list = depiction => {
  const defaultName = "list";
  return {
    name: defaultName,
    validatorName: defaultName,
    validator: (values, name) => {
      const results = values.map(val => execute(depiction, val));
      const conformedValue = results.map(result => result.conformedValue);
      const validations = results
        .map((result, i) => {
          return result.validations.map(validation => ({
            value: validation.value,
            dPath: [name, ...validation.dPath],
            vPath: [i, ...validation.vPath],
            success: validation.success,
            validator: validation.validator
          }));
        })
        .flat();

      return {
        conformedValue,
        validations
      };
    }
  };
};

export const object = depiction => {
  const defaultName = "object";
  return {
    name: defaultName,
    validatorName: defaultName,
    validator: (value, name) => {
      const results = Object.keys(value)
        .filter(key => depiction[key])
        .map(key => ({
          key,
          result: execute(depiction[key], value[key])
        }));
      const conformedValue = results.reduce(
        (final, { key, result }) => ({
          ...final,
          [key]: result.conformedValue
        }),
        {}
      );
      const validations = results
        .map(({ key, result }) => {
          return result.validations.map(validation => ({
            value: validation.value,
            dPath: [name, ...validation.dPath],
            vPath: [key, ...validation.vPath],
            success: validation.success,
            validator: validation.validator
          }));
        })
        .flat();

      return {
        conformedValue,
        validations
      };
    }
  };
};

export const req = (keys, depiction) => {
  const defaultName = "req";
  return {
    name: defaultName,
    validatorName: defaultName,
    validator: (value, name) => {
      const valueKeys = Object.keys(value);
      const results = execute(depiction, value);
      return {
        conformedValue: results.conformedValue,
        validations: results.validations.map(v => ({
          ...v,
          success: true,
          dPath: ["req", ...v.dPath]
        }))
      };
    }
  };
};
