PROJECT=tile-cache
NODE_BIN=./node_modules/.bin
SRC = index.js $(wildcard lib/*.js)

all: check compile

check: lint test

compile: build/build.js

build:
	mkdir -p $@

build/build.js: node_modules $(SRC) | build
	$(NODE_BIN)/browserify --require ./index.js:$(PROJECT) --outfile $@

.DELETE_ON_ERROR: build/build.js

node_modules: package.json
	yarn && touch $@

lint: | node_modules
	$(NODE_BIN)/jshint $(SRC) test

test:
	$(NODE_BIN)/electron-mocha --require should --renderer

clean:
	rm -fr build node_modules

.PHONY: all clean check lint compile test
