import depict, { isValid, explain, conform } from "../lib";
import { boolean, string } from "../lib";

describe("isValid", () => {
  test("positive", () => {
    expect(isValid(boolean, false)).toBe(true);
  });
  test("negative", () => {
    expect(isValid(boolean, "asdf")).toBe(false);
  });
  test("custom depiction", () => {
    const boat = depict("boat", boolean);
    expect(isValid(boat, false)).toBe(true);
  });
});

describe("explain", () => {
  test("simple", () => {
    expect(explain(boolean, "asdf")).toEqual([
      {
        value: "asdf",
        depiction: "boolean",
        validator: "boolean",
        dPath: ["boolean"],
        vPath: []
      }
    ]);
  });
  test("custom depiction", () => {
    const boat = depict("boat", boolean);
    expect(explain(boat, "asdf")).toEqual([
      {
        value: "asdf",
        depiction: "boat",
        validator: "boolean",
        dPath: ["boat"],
        vPath: []
      }
    ]);
  });
});

describe("conform", () => {
  test("simple", () => {
    expect(conform(boolean, "asdf")).toBe(true);
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
