require('fake-indexeddb/auto');

/* global globalThis */
globalThis.self = globalThis;

const { describe, it, beforeEach, after } = require('node:test');
const assert = require('node:assert/strict');
const tileCache = require('../');

describe('tile-cache', async function () {
  const tile1 = new Uint8Array([1, 2, 3, 4]).buffer;
  const tile2 = new Uint8Array([4, 3, 2, 1, 0]).buffer;

  beforeEach(function () {
    return tileCache.put('tile', [1, 1, 5], tile1);
  });

  after(function () {
    return tileCache.drop('tile');
  });

  await it('must retrieve stored tiles', async function () {
    const tile = await tileCache.get('tile', [1, 1, 5]);
    assert.ok(tile, 'should be found');
    assert.equal(tile.byteLength, 4);
    assert.deepEqual(tile, tile1);
  });

  await it('must return empty when not found', async function () {
    const tile = await tileCache.get('tile', [1, 2, 5]);
    assert.ok(!tile, 'should be not be found');
  });

  await it('must store new tiles', async function () {
    await tileCache.put('tile', [2, 1, 5], tile2);
    const tile = await tileCache.get('tile', [2, 1, 5]);
    assert.ok(tile, 'should be found');
    assert.equal(tile.byteLength, 5);
    assert.deepEqual(tile, tile2);
  });

  await it('must remove previously added tiles', async function () {
    await tileCache.remove('tile', [1, 1, 5]);
    const tile = await tileCache.get('tile', [1, 1, 5]);
    assert.ok(!tile, 'should be not be found');
  });

  await it('must confirm that the added tile is in cache', async function () {
    const ok = await tileCache.check('tile', [1, 1, 5]);
    assert.ok(ok);
  });

  await it('must confirm that the new tile is NOT in cache', async function () {
    const ok = await tileCache.check('tile', [7, 1, 5]);
    assert.ok(!ok);
  });

  await it('must clear cache on drop', async function () {
    await tileCache.drop('tile');
    const tile = await tileCache.get('tile', [1, 1, 5]);
    assert.ok(!tile, 'should be not be found');
  });
});
