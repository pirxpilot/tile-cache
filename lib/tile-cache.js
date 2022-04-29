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

function put(name, key, data, fn) {
  return stores[name].put(key, data, fn);
}

function get(name, key, fn) {
  return stores[name].get(key, fn);
}

function remove(name, key, fn) {
  return stores[name].remove(key, fn);
}

function check(name, key, fn) {
  return stores[name].count(key, (err, count) => fn(err, count > 0));
}

function drop(name, fn) {
  return stores[name].clear(fn);
}
