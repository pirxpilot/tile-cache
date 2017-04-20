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

```js
var tileCache = require('tile-cache');

var key = [0, 3, 5]; // x, y, zoom
var tile; // Blob or ArrayBuffer representing tile

tileCache.putTile(key, tile, function(err) {
  // tile is now in cache
});

tileCache.getTile(key, function(err, tile) {
  // tile retrieved
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
