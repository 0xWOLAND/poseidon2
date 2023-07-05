import poseidon2 from "./hash";
import c from "./constants/2";

export const hash2 = (inp) => {
  return poseidon2(inp, c);
};
