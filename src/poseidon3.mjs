import poseidon2 from "./poseidon2/index.js";
import c from "./constants/3.mjs";

export const hash3 = (inp) => {
  return poseidon2(inp, c);
};
