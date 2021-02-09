import { getSeed, rng, pickOne } from "~/lib/utils/random";
import seedrandom from "seedrandom";

describe("getSeed", () => {
  beforeEach(() => {
    jest.spyOn(seedrandom, "alea").mockImplementation(() => () => "seed1");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("no seed set", () => {
    expect(getSeed()).toBe("seed1");
  });
});

describe("rng", () => {
  test("reproducable same seed", () => {
    const seed = getSeed();
    const random1 = rng(seed)();
    const random2 = rng(seed)();
    expect(random1).toBe(random2);
  });

  test("reproducable same gen", () => {
    const seed = getSeed();
    const generator = rng(seed);
    const random1 = generator();
    const random2 = generator();
    expect(random1).not.toBe(random2);
  });
});

describe("pickOne", () => {
  beforeEach(() => {
    jest.spyOn(seedrandom, "alea").mockImplementation(() => () => 0.5);
  });
  test("simple", () => {
    const options = ["a", "b", "c"];
    const result = pickOne(options);
    expect(result).toBe("b");
  });
});
