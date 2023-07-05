import poseidon2 from "./poseidon2";
import c from "./constants/3";

export const hash3 = (inp) => {
  return poseidon2(inp, c);
};
