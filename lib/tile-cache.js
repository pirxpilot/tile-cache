module.exports = {
  putTile: putTile,
  getTile: getTile
};

var db = require('./db')('tile-cache');

function putTile(tile, data, fn) {
  db.put(tile, data, fn);
}

function getTile(tile, fn) {
  db.get(tile, fn);
}
