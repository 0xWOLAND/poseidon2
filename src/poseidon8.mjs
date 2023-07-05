import poseidon2 from "./poseidon2";
import c from "./constants/8";

export const hash8 = (inp) => {
  return poseidon2(inp, c);
};
