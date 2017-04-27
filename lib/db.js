var waterfall = require('run-waterfall');
var once = require('./run-once');

module.exports = database;

/* global indexedDB */

function database(name, stores) {
  var open = once(function(fn) {
    do_open(name, 1, stores, fn);
  });

  var self = {
    store: getStore,
    execute: execute
  };

  function getStore(name) {
    return store(self, name);
  }

  function execute(operation, fn) {
    waterfall([
      open,
      operation
    ], fn);
  }

  return self;
}

function store(db, name) {
  var self = {
    put: put,
    get: get,
    remove: remove,
    count: count
  };

  function put(key, item, fn) {
    db.execute(function(db, fn) {
      do_put(db, name, key, item, fn);
    }, fn);
  }

  function get(key, item, fn) {
    db.execute(function(db, fn) {
      do_get(db, name, key, item, fn);
    }, fn);
  }

  function count(key, fn) {
    db.execute(function(db, fn) {
      do_count(db, name, key, fn);
    }, fn);
  }

  function remove(key, fn) {
    db.execute(function(db, fn) {
      do_delete(db, name, key, fn);
    }, fn);
  }

  return self;
}

function do_open(name, version, stores, fn) {
  var request = indexedDB.open(name, version);

  request.onupgradeneeded = function() {
    var db = request.result;
    stores.forEach(function(store) {
      db.createObjectStore(store);
    });
  };

  addHandlers(request, fn);
}

function do_put(db, store, key, item, fn) {
  var request = db.transaction(store, 'readwrite')
    .objectStore(store)
    .put(item, key);

  addHandlers(request, fn);
}

function do_get(db, store, key, fn) {
  var request = db.transaction(store)
    .objectStore(store)
    .get(key);

  addHandlers(request, fn);
}

function do_count(db, store, key, fn) {
  var request = db.transaction(store)
    .objectStore(store)
    .count(key);

  addHandlers(request, fn);
}

function do_delete(db, store, key, fn) {
  var request = db.transaction(store, 'readwrite')
    .objectStore(store)
    .delete(key);

  addHandlers(request, fn);
}

function addHandlers(request, fn) {
  function handler(e) {
    fn(e.target.error, e.target.result);
  }

  request.onerror = handler;
  request.onsuccess = handler;
}
