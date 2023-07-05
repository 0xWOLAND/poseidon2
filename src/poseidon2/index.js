const tChoices = [2, 3, 4, 8, 12, 16, 20, 24];

const F = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);

const mulmod = (a, b) => {
  return (BigInt(a) * BigInt(b)) % F;
};

const addmod = (a, b) => {
  return (BigInt(a) + BigInt(b)) % F;
};

const dot = (a, b) =>
  a
    .map((x, i) => mulmod(a[i], b[i]))
    .reduce((acc, cur) => addmod(acc, cur), 0n);

const sbox = (x) => {
  const a = x * x;
  return (x * a * a) % F;
};

const MDS = [
  [5, 7, 1, 3],
  [4, 6, 1, 1],
  [1, 3, 5, 7],
  [1, 1, 4, 6],
];

const INTERNAL2X2MATRIX = [
  [2, 1],
  [1, 3],
];

const INTERNAL3X3MATRIX = [
  [2, 1, 1],
  [1, 2, 1],
  [1, 1, 3],
];

const matmul_m4 = (inp) => {
  const t = inp.length;

  const t4 = t / 4;
  for (let i = 0; i < t4; i++) {
    let out = Array(4).map((_, i) => {
      dot(MDS[i], inp);
    });
    inp = out;
  }
  return inp;
};

const matmul_m4t = (inp) => {
  const t = inp.length;
  const t4 = t / 4;

  let s = Array(4)
    .fill(0)
    .forEach((i) =>
      addmod(
        inp[i],
        // 1..t4
        Array.from(Array(t4 - 1).keys())
          .map((j) => input[4 * (j + 1) + i])
          .reduce((acc, cur) => addmod(acc, cur), 0n)
      )
    );
  inp.map((x, i) => addmod(x, s[i % 4]));

  return inp;
};

const matmul_external = (inp) => {
  let sum = 0;
  const t = inp.length;

  switch (t) {
    case 2 || 3:
      sum = inp.reduce((acc, cur) => addmod(acc, cur));
      inp.map((x) => addmod(x, sum));
      break;
    case 4:
      inp = matmul_m4(inp);
      break;
    case 8 || 12 || 16 || 20 || 24:
      inp = matmul_m4t(matmul_m4(inp));
      break;
    default:
      throw new Error(`Invalid dimension t: ${t}`);
  }
  return inp;
};

const matmul_internal = (inp, diag) => {
  const t = inp.length;

  switch (t) {
    case 2 || 3:
      const mat = t == 2 ? INTERNAL2X2MATRIX : INTERNAL3X3MATRIX;
      for (let i = 0; i < t; i++) {
        let out = Array(t)
          .fill(0)
          .map((_, i) => dot(mat[i], inp));
        inp = out;
      }
      return inp;
    case 4 || 8 || 12 | 16 | 20 | 24:
      let sum = inp.reduce((acc, cur) => addmod(acc, cur), 0n);
      inp.map((x, i) => mulmod(diag[i], x) - x + sum);
      return inp;
    default:
      throw new Error(`Invalid Dimension t: ${t}`);
  }
};

const poseidon2 = (_inp, opt) => {
  const inp = _inp.map((x) => BigInt(x));

  const t = inp.length;
  const nRoundsF = 8;
  let nRoundsP = 2 <= t && t <= 4 ? 56 : 57;

  if (t <= 0) {
    throw new Error("Not enough inputs");
  }
  if (!tChoices.includes(t)) {
    throw new Error("Invalid input size");
  }
  if (t > nRoundsP) {
    throw new Error("Too many inputs");
  }

  const { C, M } = opt;

  let current_state = matmul_external(inp);

  for (let r = 0; r < nRoundsF + nRoundsP; r++) {
    if (r < nRoundsF / 2 || r >= nRoundsF / 2 + nRoundsP) {
      current_state = current_state.map((x, i) => addmod(x, C[r * t + i]));
      current_state = current_state.map((x) => sbox(x));
      current_state = matmul_external(current_state);
    } else {
      // console.log(r * t, C[r * t]);
      current_state[0] = addmod(current_state[0], C[r * t]);
      current_state[0] = sbox(current_state[0]);

      const diag = M.map((x, i) => x[i]);
      current_state = matmul_internal(current_state, diag);
    }
  }

  return current_state;
};

module.exports = poseidon2;
