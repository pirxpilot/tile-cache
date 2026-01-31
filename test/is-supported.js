require('fake-indexeddb/auto');
/* global globalThis */

globalThis.self = globalThis;

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { supported } = require('../lib/tile-cache.js');

describe('supported', async () => {
  await it('should be supported with promise', async () => {
    const ok = await supported();
    assert.ok(ok);
  });
});
