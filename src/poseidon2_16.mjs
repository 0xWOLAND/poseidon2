import poseidon2 from "./poseidon2";
import c from "./constants/16";

export const poseidon2_16 = (inp) => {
  poseidon2(inp, c);
};
