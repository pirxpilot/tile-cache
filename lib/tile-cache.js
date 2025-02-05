module.exports = {
  put,
  get,
  check,
  drop,
  remove,
  supported: require('./is-supported')
};

const db = require('mlasq')('tile-cache', [
  'tiles',
  'fonts',
  'data',
  'images'
]);

const stores = {
  tile: db.store('tiles'),
  font: db.store('fonts'),
  json: db.store('data'),
  image: db.store('images')
};

function put(name, key, data) {
  return stores[name].put(key, data);
}

function get(name, key) {
  return stores[name].get(key);
}

function remove(name, key) {
  return stores[name].remove(key);
}

async function check(name, key) {
  const store = stores[name];
  const count = await store.count(key);
  return count > 0;
}

function drop(name) {
  return stores[name].clear();
}
