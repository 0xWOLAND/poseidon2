import poseidon2 from "./poseidon2";
import c from "./constants/4";

export const hash4 = (inp) => {
  return poseidon2(inp, c);
};
