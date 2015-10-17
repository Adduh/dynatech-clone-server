BIN     = ./node_modules/.bin
BROWSER = google-chrome

.PHONY: run
run: src node_modules
	node src/index.js

.PHONY: jshint
jshint:
	$(BIN)/jshint src/**.js test/**.js

.PHONY: test
test:
	$(BIN)/mocha

.PHONY: watch
watch:
	$(BIN)/mocha -w

.PHONY: cover
cover: coverage

.PHONY: coverage
coverage:
	$(BIN)/mocha --require blanket -R html-cov > coverage/index.html
	@echo
	@echo Opening coverage/index.html file in your browser now
	$(BROWSER) coverage/index.html

node_modules:
	npm install

.PHONY: clean
clean: clean-coverage

.PHONY: clean-coverage
clean-coverage:
	-rm -rf coverage
