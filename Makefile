BIN     = ./node_modules/.bin

.PHONY: run
run: src node_modules
	node src/index.js

.PHONE: codestyle
codestyle: jscs jshint

.PHONY: jscs
jscs:
	@$(BIN)/jscs src/**.js test/**.js
	@echo "\033[0;32m ✔ \033[0m No code style errors found by JSCS."

.PHONY: jshint
jshint:
	@$(BIN)/jshint src/**.js test/**.js
	@echo "\033[0;32m ✔ \033[0m No checkstyle errors found by JSHint."

.PHONY: test
test:
	@$(BIN)/mocha

.PHONY: watch
watch:
	@$(BIN)/mocha -w

.PHONY: cover
cover: coverage

.PHONY: coverage
coverage:
	@multi='spec=- travis-cov=- html-cov=coverage.html' $(BIN)/mocha --require blanket -R mocha-multi
	@echo "\033[0;32m ✔ \033[0m"
	@echo Opening coverage.html file in your browser now
	@xdg-open coverage.html

node_modules:
	npm install

.PHONY: clean
clean: clean-coverage

.PHONY: clean-coverage
clean-coverage:
	rm -rf coverage.html
