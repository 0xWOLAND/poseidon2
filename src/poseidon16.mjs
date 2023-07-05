import poseidon2 from "./poseidon2";
import c from "./constants/16";

export const poseidon16 = (inp) => {
  poseidon2(inp, c);
};
