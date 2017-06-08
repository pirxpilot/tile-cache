var supported = require('../').supported;

describe('tile-cache', function () {

  it('should be supported', function(done) {
    supported(function(err, ok) {
      ok.should.be.ok();
      done(err);
    });
  });

});
