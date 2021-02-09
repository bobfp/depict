import { success, fail } from "../utils/validation";

export const validator = (data) => {
  const details = {
    validator: "boolean",
    data,
    dataPath: [],
  };
  return typeof data === "boolean" ? success(details) : fail(details);
};

export const generator = ({ seed }) => pickOne([true, false]);
