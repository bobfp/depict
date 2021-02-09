import { union } from "./union";

export const validation = union("success", "fail");

export const success = (value, valuePath, depictionPath) =>
  validation.success({ value, valuePath, depictionPath });

export const fail = (value, valuePath, depictionPath) =>
  validation.fail({ value, valuePath, depictionPath });

export const isSuccess = (value) => Bool(value.success);

export const isFail = (value) => Bool(value.fail);

export default validation;
