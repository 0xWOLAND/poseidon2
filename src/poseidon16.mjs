import poseidon2 from "./poseidon2";
import c from "./constants/16";

export const hash16 = (inp) => {
  return poseidon2(inp, c);
};
