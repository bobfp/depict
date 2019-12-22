import * as P from "./predicates.js";
import * as G from "./generators.js";
import depict from "./index.js";

const couple = (predicate, generator, optionShape) => ({
  predicate,
  generator,
  with: options => ({
    predicate: val => predicate(val, options),
    generator: () => generator(options)
  })
});

export const isBool = couple(P.isBool, G.bool);
export const isNumber = couple(P.isNumber, G.number);
export const isInt = couple(P.isInt, G.int);
export const isString = couple(P.isString, G.string);
export const isObject = shape => ({
  predicate: P.isObject(shape),
  generator: G.object(shape)
});
export const and = couplets => ({
  predicate: val =>
    couplets.reduce(
      (bool, couplet) =>
        bool
          ? couplet.predicate
            ? couplet.predicate(val)
            : couplet(val)
          : false,
      true
    ),
  generator: () => {
    const [generatingC, ...filteringCs] = couplets;
    const makeAttempt = attempt => {
      const result = generatingC.generator();
      const isResultValid = filteringCs.reduce(
        (bool, couplet) =>
          bool
            ? couplet.predicate
              ? couplet.predicate(result)
              : couplet(result)
            : false,
        true
      );
      if (isResultValid) {
        return result;
      }
      if (attempt > 1000) {
        return Error("no value found");
      }
      return makeAttempt(attempt + 1);
    };
    return makeAttempt(0);
  }
});
