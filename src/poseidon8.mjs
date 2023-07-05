import poseidon2 from "./poseidon2";
import c from "./constants/8";

export const poseidon8 = (inp) => {
  poseidon2(inp, c);
};
