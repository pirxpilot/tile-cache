PROJECT=tile-cache
NODE_BIN=./node_modules/.bin
SRC = index.js $(wildcard lib/*.js)

check: lint test

node_modules: package.json
	yarn
	touch $@

lint: | node_modules
	$(NODE_BIN)/jshint $(SRC) test

test:
	node --require should --test

clean:
	rm -fr node_modules

.PHONY: all clean check lint test
