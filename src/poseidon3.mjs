import poseidon2 from "./poseidon2";
import c from "./constants/3";

export const poseidon3 = (inp) => {
  poseidon2(inp, c);
};
