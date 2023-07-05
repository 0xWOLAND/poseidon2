const N_ROUNDS_F = 8;
const N_ROUNDS_P = [
  56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68,
];

const dot = (a, b) =>
  a.map((x, i) => a[i] * b[i]).reduce((acc, cur) => acc + cur);

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
  /*
  5 7 1 3  x1
  4 6 1 1  x2
  1 3 5 7  x3
  1 1 4 6  x4
  */
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
    .forEach(
      (i) =>
        inp[i] +
        Array.from(Array(t4).keys())
          .map((j) => input[4 * (j + 1) + i])
          .reduce((acc, cur) => acc + cur)
    );
  inp.map((x, i) => x + s[i % 4]);

  return inp;
};

const matmul_external = (inp) => {
  let sum = 0;
  const t = inp.length;

  switch (t) {
    case 2 | 3:
      sum = inp.reduce((acc, cur) => acc + cur);
      inp.map((x) => x + sum);
      break;
    case 4:
      inp = matmul_m4(inp);
      break;
    case 8 | 12 | 16 | 20 | 24:
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
    case 2 | 3:
      const mat = t == 2 ? INTERNAL2X2MATRIX : INTERNAL3X3MATRIX;
      for (let i = 0; i < t; i++) {
        let out = Array(t).map((_, i) => {
          dot(mat, inp);
        });
        inp = out;
      }
      return inp;
    case 4 | 8 | 12 | 16 | 20 | 24:
      let sum = inp.reduce((acc, cur) => acc + cur);
      inp.map((x, i) => diag[i] * x - x + sum);
      return inp;
    default:
      throw new Error(`Invalid Dimension t: ${t}`);
  }
};

const add_round = (inp, constant) => inp.map((x, i) => x + constant[i]);

const sbox = (x) => {
  const a = x * x;
  return x * a * a;
};

const poseidon2 = (inp) => {
  let current_state = matmul_external(inp);
  const t = inp.length;
  const nRoundsF = N_ROUNDS_F;
  const nRoundsP = N_ROUNDS_P[t - 2];

  for (let r = 0; r < nRoundsF + nRoundsP; r++) {
    if (r < nRoundsF / 2 || r >= nRoundsF / 2 + nRoundsP) {
      current_state = add_round();
    }
  }
};

module.exports = poseidon2;
