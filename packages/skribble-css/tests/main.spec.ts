import { test, expect } from 'vitest';

import { sum } from '../';

test('sum', () => {
  expect(sum(1, 2)).toEqual(3);
});