[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

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
const tileCache = require('tile-cache');

const key = [0, 3, 5]; // x, y, zoom
let tile; // Blob or ArrayBuffer representing tile

await tileCache.put('tile', key, tile);
// tile is now in cache

tile = await tileCache.get('tile', key);
// tile retrieved

const inCache = await tileCache.check('tile', key);
// inCache is truthy is tile was in cache

await tileCache.remove('tile', key);
// specific tile is removed from cache

await tileCache.drop('tile');
```

## License

MIT © [Damian Krzeminski](https://furkot.com)

[npm-image]: https://img.shields.io/npm/v/tile-cache
[npm-url]: https://npmjs.org/package/tile-cache

[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/tile-cache/check.yaml?branch=main
[build-url]: https://github.com/pirxpilot/tile-cache/actions/workflows/check.yaml

[deps-image]: https://img.shields.io/librariesio/release/npm/tile-cache
[deps-url]: https://libraries.io/npm/tile-cache
