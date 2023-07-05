import poseidon2 from "./poseidon2";
import c from "./constants/4";

export const poseidon4 = (inp) => {
  poseidon2(inp, c);
};
