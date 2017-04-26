module.exports = {
  putTile: putTile,
  getTile: getTile,
  removeTile: removeTile,
  checkTile: checkTile
};

var db = require('./db')('tile-cache');

function putTile(tile, data, fn) {
  db.put(tile, data, fn);
}

function getTile(tile, fn) {
  db.get(tile, fn);
}

function removeTile(tile, fn) {
  db.remove(tile, fn);
}

function checkTile(tile, fn) {
  db.count(tile, function(err, count) {
    fn(err, count > 0);
  });
}
