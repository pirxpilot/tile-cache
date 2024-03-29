require('fake-indexeddb/auto');
/* global globalThis */

globalThis.self = globalThis;

const { describe, it } = require('node:test');
const { supported } = require('../');

describe('supported', async function () {

  await it('should be supported with callback', function (_, done) {
    supported(function (err, ok) {
      ok.should.be.ok();
      done(err);
    });
  });

  await it('should be supported with promise', async function () {
    const ok = await supported();
    ok.should.be.ok();
  });

});
