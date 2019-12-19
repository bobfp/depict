import * as P from "./predicates.js";
import * as G from "./generators.js";

const couple = (predicate, generator) => ({
  predicate,
  generator,
  with: options => ({
    predicate: val => predicate(val, options),
    generator: () => generator(options)
  })
});

export const isBool = couple(P.isBool, G.bool);
export const isNumber = couple(P.isNumber, G.number);
export const isString = couple(P.isString, G.string);

export const isObject = shape => ({
  predicate: P.isObject(shape),
  generator: G.object(shape)
});
