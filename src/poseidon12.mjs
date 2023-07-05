import poseidon2 from "./poseidon2";
import c from "./constants/12";

export const hash12 = (inp) => {
  return poseidon2(inp, c);
};
