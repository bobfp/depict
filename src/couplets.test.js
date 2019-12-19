import depict from "./index";
import * as C from "./couplets";

const testN = (depiction, n = 1000) => {
  const values = Array(n)
    .fill()
    .map(() => {
      const val = depiction.gen();
      //console.log(val);
      return depiction.validate(val) ? true : val;
    })
    .filter(result => result !== true);
  expect(values).toEqual([]);
};

test("boolean", () => {
  const bool = depict("bool", C.isBool);
  testN(bool);
});

describe("number", () => {
  test("simple", () => {
    const simple = depict("simpleNumber", C.isNumber);
    testN(simple);
  });
  test("number with range", () => {
    const num = depict(
      "numInRange",
      C.isNumber.with({ max: 1239234.4, min: -32298.39398 })
    );
    testN(num);
  });
});

describe("string", () => {
  test("simple", () => {
    const s = depict("simpleString", C.isString);
    testN(s);
  });
  test("string in range", () => {
    const s = depict(
      "stringInRange",
      C.isString.with({ maxLength: 12, minLength: 3 })
    );
    testN(s);
  });
});

describe("object", () => {
  test("simple", () => {
    const name = depict("name", C.isString);
    const age = depict("age", C.isNumber);
    const o = depict("user", C.isObject({ name, age }));
    testN(o);
  });
});
