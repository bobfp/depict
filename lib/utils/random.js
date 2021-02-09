import { alea as seedrandom } from "seedrandom";

export const getSeed = () => {
  if (process.env) {
    return process.env.seed || seedrandom()();
  }
  return seedrandom()();
};

export const rng = (defaultSeed) => {
  const seed = defaultSeed || getSeed();
  return seedrandom(seed);
};

export const getRandomInt = (min, max, seed) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = rng(seed)();
  return Math.floor(randomNumber * (max - min + 1)) + min;
};

export const pickOne = (options, seed) => {
  const randomIndex = getRandomInt(0, options.length - 1, seed);
  return options[randomIndex];
};
