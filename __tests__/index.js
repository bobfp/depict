import depict, { isValid, explain, conform, execute } from "../lib";
import { boolean, string, list } from "../lib";

test("simple execute", () => {
  expect(execute(list(list(string)), [["asdf"], ["qwert"]])).toEqual([]);
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
