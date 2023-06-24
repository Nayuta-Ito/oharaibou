const zero = 0;
const O = 'O';

const one = { k: O, x: zero, m: [] };
const t_W1 = { k: O, x: zero, m: [O] };

const two = { k: t_W1, x: one, m: [] };
const t_W1_plus_1 = { k: O, x: one, m: [] };
const t_W2 = { k: O, x: one, m: [one] };
const t_M0 = { k: O, x: one, m: [O] };
const t_K0 = { k: O, x: one, m: [zero, one] };
const t_wKM0 = { k: O, x: one, m: [one, one] };
const t_w2K0 = { k: O, x: one, m: [zero, zero, one] };
const t_w3K0 = { k: O, x: one, m: [zero, zero, zero, one] };

const t_three = { k: t_W1, x: two, m: [] };
const t_W1_plus_2 = { k: t_W2, x: two, m: [] };
const t_W2_plus_1 = { k: t_M0, x: two, m: [one] };
const t_W3 = { k: t_M0, x: two, m: [one] };
const t_M0_plus_1 = { k: t_K0, x: two, m: [] };
const t_WM0_plus_1 = { k: t_K0, x: two, m: [one] };
const t_M1 = { k: t_K0, x: two, m: [two] };
const t_w2M0 = { k: t_K0, x: two, m: [t_W1] };
const t_w3M0 = { k: t_K0, x: two, m: [t_W1_plus_1] };
const t_w4M0 = { k: t_K0, x: two, m: [t_W2] };
const t_w5M0 = { k: t_K0, x: two, m: [t_M0] };
const t_w6M0 = { k: t_K0, x: two, m: [t_K0] };
const t_K0_plus_1 = { k: t_wKM0, x: two, m: [] };
const t_WK0_plus_1 = { k: t_wKM0, x: two, m: [one] };
const t_MK0_plus_1 = { k: t_wKM0, x: two, m: [two] };
const t_w2MK0_plus_1 = { k: t_wKM0, x: two, m: [t_W1] };
const t_w3MK0_plus_1 = { k: t_wKM0, x: two, m: [t_W1_plus_1] };
const t_w4MK0_plus_1 = { k: t_wKM0, x: two, m: [t_W2] };
const t_w5MK0_plus_1 = { k: t_wKM0, x: two, m: [t_M0] };
const t_w6MK0_plus_1 = { k: t_wKM0, x: two, m: [t_K0] };
const t_K1 = { k: t_wKM0, x: two, m: [zero, one] };

const t_W0 = { k: t_W1, x: t_W1, m: [] };
const t_WW0 = { k: t_M0, x: t_W1, m: [] };
const t_WW0_plus_1 = { k: t_M0, x: t_W1, m: [one] };
const t_wnM0 = { k: t_K0, x: t_W1, m: [] };
const t_WwnM0_plus_1 = { k: t_K0, x: t_W1, m: [one] };
const t_MwnM0 = { k: t_K0, x: t_W1, m: [two] };
const t_wW0M0 = { k: t_K0, x: t_W1, m: [t_W1] };

const presetsTouhou = [
  { name: '0', expression: zero },
  { name: 'O', expression: O },

  { name: '1', expression: one },
  { name: 't_W1', expression: t_W1 },

  { name: '2', expression: two },
  { name: 't_W1+1', expression: t_W1_plus_1 },
  { name: 'W2', expression: t_W2 },
  { name: 'M0', expression: t_M0 },
  { name: 'K0', expression: t_K0 },
  { name: '{wKM}0', expression: t_wKM0 },
  { name: '{w2K}0', expression: t_w2K0 },
  { name: '{w3K}0', expression: t_w3K0 },

  { name: '3', expression: t_three },
  { name: 't_W1+2', expression: t_W1_plus_2 },
  { name: 'W2+1', expression: t_W2_plus_1 },
  { name: 'W3', expression: t_W3 },
  { name: 'M0+1', expression: t_M0_plus_1 },
  { name: 'W{M0+1}', expression: t_WM0_plus_1 },
  { name: 'M1', expression: t_M1 },
  { name: '{w2M}0', expression: t_w2M0 },
  { name: '{w3M}0', expression: t_w3M0 },
  { name: '{w4M}0', expression: t_w4M0 },
  { name: '{w5M}0', expression: t_w5M0 },
  { name: '{w6M}0', expression: t_w6M0 },
  { name: 'K0+1', expression: t_K0_plus_1 },
  { name: 'W{K0+1}', expression: t_WK0_plus_1 },
  { name: 'M{K0+1}', expression: t_MK0_plus_1 },
  { name: '{w2M}{K0+1}', expression: t_w2MK0_plus_1 },
  { name: '{w3M}{K0+1}', expression: t_w3MK0_plus_1 },
  { name: '{w4M}{K0+1}', expression: t_w4MK0_plus_1 },
  { name: '{w5M}{K0+1}', expression: t_w5MK0_plus_1 },
  { name: '{w6M}{K0+1}', expression: t_w6MK0_plus_1 },
  { name: 'K1', expression: t_K1 },

  { name: 'W0', expression: t_W0 },
  { name: 'W{W0}', expression: t_WW0 },
  { name: 'W{W0+1}', expression: t_WW0_plus_1 },
  { name: 'wnM0', expression: t_wnM0 },
  { name: 'W{{wnM}0+1}', expression: t_WwnM0_plus_1 },
  { name: 'M{{wnM}0}', expression: t_MwnM0 },
  { name: '{wW0M}0', expression: t_wW0M0 },
];

const nonstandards = [];


const n_whM0 = { k: 'O', x: zero, m: [O] };
nonstandards.push({ k: n_whM0, x: zero, m: [] });
nonstandards.push({ k: n_whM0, x: zero, m: [one] });
const n_W1 = { k: 'O', x: zero, m: [one] };
const n_wwhM0M1 = { k: 'O', x: zero, m: [n_whM0] };
const n_K0 = { k: 'O', x: zero, m: [zero, one] };
const n_w2K0 = { k: 'O', x: zero, m: [zero, zero, one] };
nonstandards.push({ k: n_W1, x: zero, m: [] });
nonstandards.push({ k: n_wwhM0M1, x: zero, m: [] });
nonstandards.push({ k: n_K0, x: zero, m: [] });
nonstandards.push({ k: n_w2K0, x: zero, m: [] });
const n_wW1M0 = { k: 'O', x: zero, m: [n_W1] };
const n_wK0M1 = { k: 'O', x: zero, m: [n_K0] };
const n_ww2K0M1 = { k: 'O', x: zero, m: [n_w2K0] };
nonstandards.push({ k: n_wW1M0, x: zero, m: [] });
nonstandards.push({ k: n_wK0M1, x: zero, m: [] });
const n_wwW1M0M0 = { k: 'O', x: zero, m: [n_wW1M0] };
const n_wwK0M1M0 = { k: 'O', x: zero, m: [n_wK0M1] };
nonstandards.push({ k: n_wwW1M0M0, x: zero, m: [] });
nonstandards.push({ k: n_wwK0M1M0, x: zero, m: [] });

const presetsNew = [
  { name: '0', expression: zero },
  { name: 'O', expression: O },

  { name: '1', expression: one },
  { name: 'whM0', expression: n_whM0 },
  { name: 'W1', expression: n_W1 },
  { name: '{wwhM0M}1', expression: n_wwhM0M1 },
  { name: 'K0', expression: n_K0 },
  { name: 'w2K0', expression: n_w2K0 },
  { name: '{wW1M}0', expression: n_wW1M0 },
  { name: '{wK0M}1', expression: n_wK0M1 },
  { name: '{ww2K0M}1', expression: n_ww2K0M1 },
  { name: '{w{wW1M}0M}0', expression: n_wwW1M0M0 },
  { name: '{w{wK0M}1M}0', expression: n_wwK0M1M0 },
]

nonstandards.forEach((expression, index) => {
  presetsNew.push({ name: `non standard ${index + 1}`, expression });
})


let presets = presetsNew;