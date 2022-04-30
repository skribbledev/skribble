import { expect, test } from 'vitest';

import { overrides } from '../overrides';

test('can add overrides', () => {
  overrides.setValues({ random: ['a', 'b'] });
  expect(overrides.get('random')).toEqual(['a', 'b']);
});
