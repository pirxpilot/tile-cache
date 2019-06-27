module.exports = isSupported;

const db = require('mlasq')('test-tile-cache', ['data']);

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

  const av = new Uint8Array(a);
  const bv = new Uint8Array(b);

  let i = av.length;
  while (i--) {
    if (av[i] !== bv[i]) {
      return false;
    }
  }

  return true;
}

function isSupported(fn) {
  const data = new Uint8Array([1, 2]).buffer;
  const key = ['a', 5];

  const store = db.store('data');
  let supported = false;

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
