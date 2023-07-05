import poseidon2 from "./poseidon2";
import c from "./constants/12";

export const poseidon12 = (inp) => {
  poseidon2(inp, c);
};
