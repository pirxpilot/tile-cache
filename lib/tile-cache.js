module.exports = {
  putTile: putTile,
  getTile: getTile,
  checkTile: checkTile
};

var db = require('./db')('tile-cache');

function putTile(tile, data, fn) {
  db.put(tile, data, fn);
}

function getTile(tile, fn) {
  db.get(tile, fn);
}

function checkTile(tile, fn) {
  db.count(tile, function(err, count) {
    fn(err, count > 0);
  });
}
