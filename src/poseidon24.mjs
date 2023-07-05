import poseidon2 from "./poseidon2";
import c from "./constants/24";

export const poseidon24 = (inp) => {
  poseidon2(inp, c);
};
