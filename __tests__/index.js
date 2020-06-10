import depict, { isValid, explain, conform, execute } from "../lib";
import { boolean, string, list, object, req } from "../lib";

describe("execute", () => {
  test("simple", () => {
    expect(execute(string, "asdf")).toEqual({
      conformedValue: "asdf",
      validations: [
        {
          dPath: ["string"],
          success: true,
          vPath: [],
          validator: "string",
          value: "asdf"
        }
      ]
    });
  });
  test("execute", () => {
    const result = execute(list(string), ["asdf", "qwert"]);
    expect(result).toEqual({
      conformedValue: ["asdf", "qwert"],
      validations: [
        {
          dPath: ["list", "string"],
          success: true,
          vPath: [0],
          validator: "string",
          value: "asdf"
        },
        {
          dPath: ["list", "string"],
          success: true,
          vPath: [1],
          validator: "string",
          value: "qwert"
        }
      ]
    });
  });
  test("execute custom depicts", () => {
    const user = depict("user", string);
    const bananas = depict("bananas", list(user));
    const bunch = depict("bunch", list(bananas));
    console.log("user", user);
    expect(execute(bunch, [["bob"], ["adam"]])).toEqual({
      conformedValue: [["bob"], ["adam"]],
      validations: [
        {
          dPath: ["bunch", "bananas", "user"],
          success: true,
          vPath: [0, 0],
          validator: "string",
          value: "bob"
        },
        {
          dPath: ["bunch", "bananas", "user"],
          success: true,
          vPath: [1, 0],
          validator: "string",
          value: "adam"
        }
      ]
    });
  });
});

describe("object", () => {
  test("simple", () => {
    const user = depict("user", object({ name: string, human: boolean }));
    const bob = { name: "bob", human: true };
    expect(execute(user, bob)).toEqual({
      conformedValue: bob,
      validations: [
        {
          dPath: ["user", "string"],
          success: true,
          vPath: ["name"],
          validator: "string",
          value: "bob"
        },
        {
          dPath: ["user", "boolean"],
          success: true,
          vPath: ["human"],
          validator: "boolean",
          value: true
        }
      ]
    });
  });
  test("missing fields", () => {
    const user = depict("user", object({ name: string, human: boolean }));
    const bob = { name: "bob" };
    expect(execute(user, bob)).toEqual({
      conformedValue: bob,
      validations: [
        {
          dPath: ["user", "string"],
          success: true,
          vPath: ["name"],
          validator: "string",
          value: "bob"
        }
      ]
    });
  });
  test("extra fields", () => {
    const user = depict("user", object({ name: string, human: boolean }));
    const bob = { name: "bob", xp: 1000 };
    expect(execute(user, bob)).toEqual({
      conformedValue: { name: "bob" },
      validations: [
        {
          dPath: ["user", "string"],
          success: true,
          vPath: ["name"],
          validator: "string",
          value: "bob"
        }
      ]
    });
  });
});

describe("req", () => {
  test("simple", () => {
    const user = depict("user", object({ name: string, human: boolean }));
    const strictUser = req(["name", "human"], user);
    const bob = { name: "bob", human: true };
    expect(execute(strictUser, bob)).toEqual({
      conformedValue: bob,
      validations: [
        {
          dPath: ["req", "user", "string"],
          success: true,
          vPath: ["name"],
          validator: "string",
          value: "bob"
        },
        {
          dPath: ["req", "user", "boolean"],
          success: true,
          vPath: ["human"],
          validator: "boolean",
          value: true
        }
      ]
    });
  });
  test("simple fail", () => {
    const user = depict("user", object({ name: string, human: boolean }));
    const strictUser = req(["name", "human", "xp"], user);
    const bob = { name: "bob", human: true };
    expect(execute(strictUser, bob)).toEqual({
      conformedValue: bob,
      validations: [
        {
          dPath: ["req", "user", "string"],
          success: true,
          vPath: ["name"],
          validator: "string",
          value: "bob"
        },
        {
          dPath: ["req", "user", "boolean"],
          success: true,
          vPath: ["human"],
          validator: "boolean",
          value: true
        },
        {
          dPath: ["req"],
          success: false,
          vPath: ["xp"],
          validator: "req",
          value: bob
        }
      ]
    });
  });
});

/*
const int = depict("int", number);
const yes = isValid(int, 7);
const conformed = conform(shape, {});
const reason = explain(int, "asdf");
const doPlus = depictF("doPlus", {
  params: [number, number],
  ret: number,
  rel: (a, b) => a + b
});
*/
