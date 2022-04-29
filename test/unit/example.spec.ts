import { expect, test } from 'vitest';

test('Default', () => {
  expect('test')
    .toMatch('test');
});
