module.exports = {
  put: put,
  get: get,
  check: check,
  drop: drop,
  remove: remove,
  supported: require('./is-supported')
};

var db = require('mlasq')('tile-cache', [
  'tiles',
  'fonts',
  'data',
  'images'
]);

var stores = {
  tile: db.store('tiles'),
  font: db.store('fonts'),
  json: db.store('data'),
  image: db.store('images')
};

function put(name, key, data, fn) {
  stores[name].put(key, data, fn);
}

function get(name, key, fn) {
  stores[name].get(key, fn);
}

function remove(name, key, fn) {
  stores[name].remove(key, fn);
}

function check(name, key, fn) {
  stores[name].count(key, function(err, count) {
    fn(err, count > 0);
  });
}

function drop(name, fn) {
  stores[name].clear(fn);
}
