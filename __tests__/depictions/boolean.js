import { validator } from "~/lib/depictions/boolean";
import { success, fail } from "~/lib/utils/validation";

describe("boolean validator", () => {
  test("success", () => {
    const data = true;
    const result = validator(data);
    expect(result).toEqual(
      success({
        validator: "boolean",
        data: true,
        dataPath: [],
      })
    );
  });
  test("fail", () => {
    const data = "cat";
    const result = validator(data);
    expect(result).toEqual(
      fail({
        validator: "boolean",
        data: "cat",
        dataPath: [],
      })
    );
  });
});
