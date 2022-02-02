import { expect, test } from 'vitest';

import { c } from '../src/c';

test('generate classnames', () => {
  expect(c.md.p.$2_5).toMatchInlineSnapshot('"md:p:-$2_5"');
  expect(c.sm.pbl.$10).toMatchInlineSnapshot('"sm:pbl:-$10"');
});

test('types', () => {
  // @ts-expect-error
  expect(`${c.md.doesNotExist}`).toBe('');

  // @ts-expect-error
  c.md.$1;
});

test('generate dynamic atom class names', () => {
  expect(c.md.p('100px')).toMatchInlineSnapshot('"md:p:-[100px]"');
});

test('generate fully dynamic class names', () => {
  expect(c('padding-right', '80px')).toMatchInlineSnapshot('"[padding-right:80px]"');
  expect(c.md('padding-left', '100px')).toMatchInlineSnapshot('"md:-[padding-left:100px]"');
});

test('toString is empty string', () => {
  expect(`${c}`).toBe('');
  expect(`${c.md}`).toBe('');
  expect(`${c.md.p}`).toBe('');

  expect(c.toString()).toBe('');
  expect(c.md.toString()).toBe('');
  expect(c.md.p.toString()).toBe('');
});
