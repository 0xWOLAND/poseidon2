import poseidon2 from "./hash";
import c from "./constants/24";

export const hash24 = (inp) => {
  return poseidon2(inp, c);
};
