var should = require('should');
var tileCache = require('../');

describe('tile-cache', function () {
  var tile1 = new Uint8Array([1, 2, 3, 4]).buffer;
  var tile2 = new Uint8Array([4, 3, 2, 1, 0]).buffer;

  beforeEach(function(done) {
    tileCache.put('tile', [1, 1, 5], tile1, done);
  });

  it('must retrieve stored tiles', function (done) {
    tileCache.get('tile', [1, 1, 5], function(err, tile) {
      should.not.exist(err);
      tile.should.have.property('byteLength', 4);
      tile.should.eql(tile1);
      done(err);
    });

  });

  it('must return empty when not found', function(done) {
    tileCache.get('tile', [1, 2, 5], function(err, tile) {
      should.not.exist(tile);
      done(err);
    });
  });

  it('must store new tiles', function(done) {
    tileCache.put('tile', [2, 1, 5], tile2, function(err) {
      should.not.exist(err);
      tileCache.get('tile', [2, 1, 5], function(err, tile) {
        should.not.exist(err);
        tile.should.have.property('byteLength', 5);
        tile.should.eql(tile2);
        done(err);
      });
    });
  });

  it('must remove previously added tiles', function (done) {
    tileCache.remove('tile', [1, 1, 5], function(err) {
      should.not.exist(err);

      tileCache.get('tile', [1, 1, 5], function(err, tile) {
        should.not.exist(tile);
        done(err);
      });
    });
  });

  it('must confirm that the added tile is in cache', function (done) {
    tileCache.check('tile', [1, 1, 5], function(err, ok) {
      should.not.exist(err);
      ok.should.be.ok();
      done(err);
    });
  });

  it('must confirm that the new tile is NOT in cache', function (done) {
    tileCache.check('tile', [7, 1, 5], function(err, ok) {
      should.not.exist(err);
      ok.should.not.be.ok();
      done(err);
    });
  });

  it('must clear cache on drop', function(done) {
    tileCache.drop('tile', function(err) {
      should.not.exist(err);

      tileCache.get('tile', [1, 1, 5], function(err, tile) {
        should.not.exist(tile);
        done(err);
      });
    });
  });

});
