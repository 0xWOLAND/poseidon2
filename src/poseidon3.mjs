import poseidon2 from "./hash";
import c from "./constants/3";

export const hash3 = (inp) => {
  return poseidon2(inp, c);
};
