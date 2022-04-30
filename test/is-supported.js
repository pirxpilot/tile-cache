const supported = require('../').supported;

describe('supported', function () {

  it('should be supported with callback', function (done) {
    supported(function (err, ok) {
      ok.should.be.ok();
      done(err);
    });
  });

  it('should be supported with promise', async function () {
    const ok = await supported();
    ok.should.be.ok();
  });

});
