import poseidon2 from "./poseidon2";
import c from "./constants/20";

export const poseidon20 = (inp) => {
  poseidon2(inp, c);
};
