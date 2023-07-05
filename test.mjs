import { hash2 } from "./src/poseidon2.mjs";
import { hash3 } from "./src/poseidon3.mjs";

console.log(hash2(["0x01", "0x02"]));
console.log(hash3(["0x01", "0x02", "0x03"]));
