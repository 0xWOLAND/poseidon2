import poseidon2 from "./hash";
import c from "./constants/20";

export const hash20 = (inp) => {
  return poseidon2(inp, c);
};
