import test from 'node:test';
import { supported } from '../lib/tile-cache.js';

test('should be supported with promise', async t => {
  const ok = await supported();
  t.assert.ok(ok);
});
