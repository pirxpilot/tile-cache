var waterfall = require('run-waterfall');
var once = require('./run-once');

module.exports = database;

/* global indexedDB */

function database(name) {
  var open = once(function(fn) {
    do_open(name, 1, fn);
  });

  var self = {
    put: put,
    get: get,
    remove: remove,
    count: count
  };

  function put(key, item, fn) {
    waterfall([
      open,
      function(db, fn) {
        do_put(db, key, item, fn);
      }
    ], fn);
  }

  function get(key, item, fn) {
    waterfall([
      open,
      function(db, fn) {
        do_get(db, key, item, fn);
      }
    ], fn);
  }

  function count(key, fn) {
    waterfall([
      open,
      function(db, fn) {
        do_count(db, key, fn);
      }
    ], fn);
  }

  function remove(key, fn) {
    waterfall([
      open,
      function(db, fn) {
        do_delete(db, key, fn);
      }
    ], fn);
  }

  return self;
}

function do_open(name, version, fn) {
  var request = indexedDB.open(name, version);

  request.onupgradeneeded = function() {
    var db = request.result;
    db.createObjectStore('tiles');
  };

  addHandlers(request, fn);
}

function do_put(db, key, item, fn) {
  var request = db.transaction('tiles', 'readwrite')
    .objectStore('tiles')
    .put(item, key);

  addHandlers(request, fn);
}

function do_get(db, key, fn) {
  var request = db.transaction('tiles')
    .objectStore('tiles')
    .get(key);

  addHandlers(request, fn);
}

function do_count(db, key, fn) {
  var request = db.transaction('tiles')
    .objectStore('tiles')
    .count(key);

  addHandlers(request, fn);
}

function do_delete(db, key, fn) {
  var request = db.transaction('tiles', 'readwrite')
    .objectStore('tiles')
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
