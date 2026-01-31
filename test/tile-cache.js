import test from 'node:test';
import * as tileCache from '../lib/tile-cache.js';

const tile1 = new Uint8Array([1, 2, 3, 4]).buffer;
const tile2 = new Uint8Array([4, 3, 2, 1, 0]).buffer;

test.beforeEach(() => tileCache.put('tile', [1, 1, 5], tile1));

test.after(() => tileCache.drop('tile'));

test('must retrieve stored tiles', async t => {
  const tile = await tileCache.get('tile', [1, 1, 5]);
  t.assert.ok(tile, 'should be found');
  t.assert.equal(tile.byteLength, 4);
  t.assert.deepEqual(tile, tile1);
});

test('must return empty when not found', async t => {
  const tile = await tileCache.get('tile', [1, 2, 5]);
  t.assert.ok(!tile, 'should be not be found');
});

test('must store new tiles', async t => {
  await tileCache.put('tile', [2, 1, 5], tile2);
  const tile = await tileCache.get('tile', [2, 1, 5]);
  t.assert.ok(tile, 'should be found');
  t.assert.equal(tile.byteLength, 5);
  t.assert.deepEqual(tile, tile2);
});

test('must remove previously added tiles', async t => {
  await tileCache.remove('tile', [1, 1, 5]);
  const tile = await tileCache.get('tile', [1, 1, 5]);
  t.assert.ok(!tile, 'should be not be found');
});

test('must confirm that the added tile is in cache', async t => {
  const ok = await tileCache.check('tile', [1, 1, 5]);
  t.assert.ok(ok);
});

test('must confirm that the new tile is NOT in cache', async t => {
  const ok = await tileCache.check('tile', [7, 1, 5]);
  t.assert.ok(!ok);
});

test('must clear cache on drop', async t => {
  await tileCache.drop('tile');
  const tile = await tileCache.get('tile', [1, 1, 5]);
  t.assert.ok(!tile, 'should be not be found');
});
