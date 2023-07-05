import poseidon2 from "./poseidon2/index.js";
import c from "./constants/2.mjs";

export const hash2 = (inp) => {
  return poseidon2(inp, c);
};
