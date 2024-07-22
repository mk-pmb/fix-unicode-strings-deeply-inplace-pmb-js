// -*- coding: utf-8, tab-width: 2 -*-
/* eslint-disable object-property-newline */

import eq from 'equal-pmb';

import deepFixInplace from '../index.js';

const EvadeBooleanConstructorLinting = Boolean;

function input() {
  // Since deepFixInplace operates inplace, we need a new copy each time.
  return {
    french: ['E\u0301tienne', '  François  ', 'ga\u0302teau'],
    numbers: [1, 2, 3.1415],
    german: 'u\u0308ber-  \r\nzählig',
    nope: new EvadeBooleanConstructorLinting(false),
  };
};

eq(input(), input());
eq(typeof input().nope, 'object');
eq(Boolean(input().nope), true);
eq(!!input().nope, true);

eq(deepFixInplace(input()), {
  french: ['Étienne', '  François  ', 'gâteau'],
  numbers: [1, 2, 3.1415],
  german: 'über-  \r\nzählig',
  nope: false,
});

eq(deepFixInplace(input(), { normCC: 'NFD' }), {
  french: ['E\u0301tienne', '  Franc\u0327ois  ', 'ga\u0302teau'],
  numbers: [1, 2, 3.1415],
  german: 'u\u0308ber-  \r\nza\u0308hlig',
  nope: false,
});

eq(deepFixInplace(input(), { normCC: false }), {
  french: ['E\u0301tienne', '  François  ', 'ga\u0302teau'],
  numbers: [1, 2, 3.1415],
  german: 'u\u0308ber-  \r\nzählig',
  nope: false,
});

eq(deepFixInplace(input(), { trim: true, eol: true }), {
  french: ['Étienne', 'François', 'gâteau'],
  numbers: [1, 2, 3.1415],
  german: 'über-\nzählig',
  nope: false,
});



console.info('+OK usage test passed.');
