module.exports = isSupported;

var db = require('mlasq')('test-tile-cache', ['data']);

function equalBuffers(a, b) {
  if (a === b) {
    return true;
  }
  if (!(a && b)) {
    return false;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  var av = new Uint8Array(a);
  var bv = new Uint8Array(b);

  var i = av.length;
  while (i--) {
    if (av[i] !== bv[i]) {
      return false;
    }
  }

  return true;
}

function isSupported(fn) {
  var data = new Uint8Array([1, 2]).buffer;
  var key = ['a', 5];

  var store = db.store('data');
  var supported = false;

  function done() {
    fn(null, supported);
  }

  function put(fn) {
    store.put(key, data, fn);
  }

  function verify(fn) {
    store.get(key, function(err, dataFromDb) {
      if (err) { return fn(); }
      supported = equalBuffers(data, dataFromDb);
      db.remove(fn);
    });
  }

  put(function(err) {
    if (err) { return done(); }
    verify(done);
  });

}
