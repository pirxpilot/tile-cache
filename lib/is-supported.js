const mlasq = require('mlasq');

module.exports = isSupported;

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

async function isSupported(fn) {
  const db = mlasq('test-tile-cache', ['data']);
  const data = new Uint8Array([1, 2]).buffer;
  const key = ['a', 5];
  try {
    const store = db.store('data');
    await store.put(key, data);
    const supported = equalBuffers(data, await store.get(key));
    if (fn) {
      fn(null, supported);
    }
  } catch(e) {
    if (fn) {
      return fn(e);
    } else {
      throw e;
    }
  } finally {
    await db.remove();
  }
}
