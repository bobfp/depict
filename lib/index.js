export const boolean = {
  validatorName: "boolean",
  validator: (value, depiction, dPath, vPath) => {
    const success = typeof value === "boolean";
    return [
      {
        success,
        value,
        depiction: depiction.name,
        validator: depiction.validatorName,
        dPath,
        vPath
      }
    ];
  },
  name: "boolean",
  conform: val => val
};

export const string = {
  validatorName: "string",
  execute: value => {
    const success = Object.prototype.toString.call(value) === "[object String]";
    return {
      conformedValue: value,
      validations: [
        {
          success,
          value,
          dPath: ["string"],
          vPath: [],
          validator: "string"
        }
      ]
    };
  },
  name: "string",
  conform: val => val
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
  return {
    execute: values => {
      const results = values.map(val => depiction.execute(val));
      const conformedValue = results.map(result => result.conformedValue);
      const validations = results
        .map((result, i) => {
          return result.validations.map(validation => ({
            value: validation.value,
            dPath: ["list", ...validation.dPath],
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

export const execute = (depiction, value) => depiction.execute(value);
