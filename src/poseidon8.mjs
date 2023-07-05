import poseidon2 from "./hash";
import c from "./constants/8";

export const hash8 = (inp) => {
  return poseidon2(inp, c);
};
