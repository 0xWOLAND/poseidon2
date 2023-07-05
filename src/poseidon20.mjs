import poseidon2 from "./poseidon2";
import c from "./constants/20";

export const hash20 = (inp) => {
  return poseidon2(inp, c);
};
