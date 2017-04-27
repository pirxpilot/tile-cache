module.exports = {
  putTile: putTile,
  getTile: getTile,
  removeTile: removeTile,
  checkTile: checkTile,
  putFont: putFont,
  getFont: getFont
};

var db = require('./db')('tile-cache', [
  'tiles',
  'fonts'
]);
var tiles = db.store('tiles');
var fonts = db.store('fonts');

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

function putFont(font, data, fn) {
  fonts.put(font, data, fn);
}

function getFont(font, fn) {
  fonts.get(font, fn);
}
