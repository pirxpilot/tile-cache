module.exports = {
  putTile: putTile,
  getTile: getTile,
  removeTile: removeTile,
  checkTile: checkTile
};

var db = require('./db')('tile-cache', [
  'tiles'
]);
var tiles = db.store('tiles');

function putTile(tile, data, fn) {
  tiles.put(tile, data, fn);
}

function getTile(tile, fn) {
  tiles.get(tile, fn);
}

function removeTile(tile, fn) {
  tiles.remove(tile, fn);
}

function checkTile(tile, fn) {
  tiles.count(tile, function(err, count) {
    fn(err, count > 0);
  });
}
