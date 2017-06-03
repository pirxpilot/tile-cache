[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# tile-cache

Client side splippy tile cache

## Install

```sh
$ npm install --save tile-cache
```

## Usage

The following collections/stores are provided by tile cache:

-  tile - map tiles
-  font - glyphs needed to render labels
-  json - styles and other json data
-  image - sprites

`tile-cache` methods take a store name as the first parameter. The examples below us `tile` store.

```js
var tileCache = require('tile-cache');

var key = [0, 3, 5]; // x, y, zoom
var tile; // Blob or ArrayBuffer representing tile

tileCache.put('tile', key, tile, function(err) {
  // tile is now in cache
});

tileCache.get('tile', key, function(err, tile) {
  // tile retrieved
});

tileCache.check('tile', key, function(err, inCache) {
  // inCache is truthy is tile was in cache
});

tileCache.remove('tile', key, function(err) {
  // specific tile is removed from cache
});

tileCache.drop('tile', function(err, tile) {
  // all tiles are removed from cache
});
```

## License

MIT © [Damian Krzeminski](https://furkot.com)

[npm-image]: https://img.shields.io/npm/v/tile-cache.svg
[npm-url]: https://npmjs.org/package/tile-cache

[travis-url]: https://travis-ci.org/pirxpilot/tile-cache
[travis-image]: https://img.shields.io/travis/pirxpilot/tile-cache.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/tile-cache.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/tile-cache
