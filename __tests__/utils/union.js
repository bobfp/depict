import { union, branch } from "~/lib/utils/union";

test("create new 'union'", () => {
  const validationT = union("success", "fail");
  const payload = Symbol();
  const validation = validationT.success(payload);
  expect(validation.success).toBe(payload);
  expect(validation.fail).toBe(undefined);
});

describe("branch", () => {
  test("happy path", () => {
    const validationT = union("success", "fail");
    const successPayload = Symbol("success");
    const failPayload = Symbol("fail");
    const success = validationT.success(successPayload);
    const fail = validationT.fail(failPayload);
    const successResult = branch(
      {
        success: (payload) => payload,
        fail: (payload) => payload,
      },
      success
    );
    expect(successResult).toBe(successPayload);

    const failResult = branch(
      {
        success: (payload) => payload,
        fail: (payload) => payload,
      },
      fail
    );
    expect(failResult).toBe(failPayload);
  });
  test("console warn", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const validationT = union("success", "fail");
    const successPayload = Symbol("success");
    const success = validationT.success(successPayload);
    const successResult = branch(
      {
        success: (payload) => payload,
      },
      success
    );
    expect(successResult).toBe(successPayload);
    expect(consoleSpy).toHaveBeenCalledWith("Missing keys in branch: fail");
  });
});
