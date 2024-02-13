require('fake-indexeddb/auto');

/* global globalThis */
globalThis.self = globalThis;

const { describe, it, beforeEach, after } = require('node:test');
const should = require('should');
const tileCache = require('../');

describe('tile-cache callbacks', function () {
  const tile1 = new Uint8Array([1, 2, 3, 4]).buffer;
  const tile2 = new Uint8Array([4, 3, 2, 1, 0]).buffer;

  beforeEach(function (done) {
    tileCache.put('tile', [1, 1, 5], tile1, done);
  });

  after(function (done) {
    tileCache.drop('tile', done);
  });

  it('must retrieve stored tiles', function (_, done) {
    tileCache.get('tile', [1, 1, 5], function (err, tile) {
      should.not.exist(err);
      tile.should.have.property('byteLength', 4);
      tile.should.eql(tile1);
      done(err);
    });

  });

  it('must return empty when not found', function (_, done) {
    tileCache.get('tile', [1, 2, 5], function (err, tile) {
      should.not.exist(tile);
      done(err);
    });
  });

  it('must store new tiles', function (_, done) {
    tileCache.put('tile', [2, 1, 5], tile2, function (err) {
      should.not.exist(err);
      tileCache.get('tile', [2, 1, 5], function (err, tile) {
        should.not.exist(err);
        tile.should.have.property('byteLength', 5);
        tile.should.eql(tile2);
        done(err);
      });
    });
  });

  it('must remove previously added tiles', function (_, done) {
    tileCache.remove('tile', [1, 1, 5], function (err) {
      should.not.exist(err);

      tileCache.get('tile', [1, 1, 5], function (err, tile) {
        should.not.exist(tile);
        done(err);
      });
    });
  });

  it('must confirm that the added tile is in cache', function (_, done) {
    tileCache.check('tile', [1, 1, 5], function (err, ok) {
      should.not.exist(err);
      ok.should.be.ok();
      done(err);
    });
  });

  it('must confirm that the new tile is NOT in cache', function (_, done) {
    tileCache.check('tile', [7, 1, 5], function (err, ok) {
      should.not.exist(err);
      ok.should.not.be.ok();
      done(err);
    });
  });

  it('must clear cache on drop', function (_, done) {
    tileCache.drop('tile', function (err) {
      should.not.exist(err);

      tileCache.get('tile', [1, 1, 5], function (err, tile) {
        should.not.exist(tile);
        done(err);
      });
    });
  });

});


describe('tile-cache promises', async function () {
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
    tile.should.have.property('byteLength', 4);
    tile.should.eql(tile1);
  });

  await it('must return empty when not found', async function () {
    const tile = await tileCache.get('tile', [1, 2, 5]);
    should.not.exist(tile);
  });

  await it('must store new tiles', async function () {
    await tileCache.put('tile', [2, 1, 5], tile2);
    const tile = await tileCache.get('tile', [2, 1, 5]);
    tile.should.have.property('byteLength', 5);
    tile.should.eql(tile2);
  });

  await it('must remove previously added tiles', async function () {
    await tileCache.remove('tile', [1, 1, 5]);
    const tile = await tileCache.get('tile', [1, 1, 5]);
    should.not.exist(tile);
  });

  await it('must confirm that the added tile is in cache', async function () {
    const ok = await tileCache.check('tile', [1, 1, 5]);
    ok.should.be.ok();
  });

  await it('must confirm that the new tile is NOT in cache', async function () {
    const ok = await tileCache.check('tile', [7, 1, 5]);
    ok.should.not.be.ok();
  });

  await it('must clear cache on drop', async function () {
    await tileCache.drop('tile');
    const tile = await tileCache.get('tile', [1, 1, 5]);
    should.not.exist(tile);
  });

});
