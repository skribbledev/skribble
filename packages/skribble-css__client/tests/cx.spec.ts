import { expect, test } from 'vitest';

import { c, cx } from '../';

test('matches shorthands', () => {
  expect(cx(c.md.$hidden, c.md.$block)).toMatchInlineSnapshot('"md::$block"');
});

test('matches atoms', () => {
  expect(cx(c.p.$0, c.p.$0_5)).toMatchInlineSnapshot('"p::$0_5"');
});

test('matches arguments', () => {
  expect(cx(c.p.$0, c.p('100px'), c.p('200px'))).toMatchInlineSnapshot('"p::[200px]"');
});

test('matches arguments with values', () => {
  expect(
    cx(c('padding', '10px'), c('padding', '100px'), c('padding', '200px')),
  ).toMatchInlineSnapshot('"[padding:200px]"');
  expect(
    cx(c('margin', '10px'), c('padding', '100px'), c('padding', '200px')),
  ).toMatchInlineSnapshot('"[margin:10px] [padding:200px]"');
});

test('understands css groups', () => {
  expect(cx(c.p.$0, c.px('100px'), c.pt('200px'))).toMatchInlineSnapshot(
    '"p::$0 px::[100px] pt::[200px]"',
  );
  expect(cx(c.p.$0, c.pt.$1, c.py('100px'))).toMatchInlineSnapshot('"p::$0 py::[100px]"');
  expect(cx(c.pt('200px'), c.py('100px'), c.p.$0)).toMatchInlineSnapshot('"p::$0"');
});

////////////////////////////////////////////////////////////////////////////////
// The rest of the tests taken from the `classnames` package to ensure        //
// compatibility.                                                             //
////////////////////////////////////////////////////////////////////////////////

test('keeps object keys with truthy values', () => {
  const out = cx({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 });
  expect(out).toBe('a f');
});

test('joins arrays of class names and ignore falsy values', () => {
  const out = cx('a', 0, null, undefined, true, 1, 'b');
  expect(out).toBe('a 1 b');
});

test('supports heterogenous arguments', () => {
  expect(cx({ a: true }, 'b', 0)).toBe('a b');
});

test('should be trimmed', () => {
  expect(cx('', 'b', {}, '')).toBe('b');
});

test('returns an empty string for an empty configuration', () => {
  expect(cx({})).toBe('');
});

test('supports an array of class names', () => {
  expect(cx(['a', 'b'])).toBe('a b');
});

test('joins array arguments with string arguments', () => {
  expect(cx(['a', 'b'], 'c')).toBe('a b c');
  expect(cx('c', ['a', 'b'])).toBe('c a b');
});

test('handles multiple array arguments', () => {
  expect(cx(['a', 'b'], ['c', 'd'])).toBe('a b c d');
});

test('handles arrays that include falsy and true values', () => {
  expect(cx(['a', 0, null, undefined, false, true, 'b'])).toBe('a b');
});

test('handles arrays that include arrays', () => {
  expect(cx(['a', ['b', 'c']])).toBe('a b c');
});

test('handles arrays that include objects', () => {
  expect(cx(['a', { b: true, c: false }])).toBe('a b');
});

test('handles deep array recursion', () => {
  expect(cx(['a', ['b', ['c', { d: true }]]])).toBe('a b c d');
});

test('handles arrays that are empty', () => {
  expect(cx('a', [])).toBe('a');
});

test('handles nested arrays that have empty nested arrays', () => {
  expect(cx('a', [[]])).toBe('a');
});

test('handles all types of truthy and falsy property values as expected', () => {
  const out = cx({
    // falsy:
    null: null,
    emptyString: '',
    noNumber: Number.NaN,
    zero: 0,
    negativeZero: -0,
    false: false,
    undefined: undefined,

    // truthy (literally anything else):
    nonEmptyString: 'foobar',
    whitespace: ' ',
    function: Object.prototype.toString,
    emptyObject: {},
    nonEmptyObject: { a: 1, b: 2 },
    emptyList: [],
    nonEmptyList: [1, 2, 3],
    greaterZero: 1,
  });

  expect(out).toBe(
    'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero',
  );
});
