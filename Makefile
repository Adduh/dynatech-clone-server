BIN            = node_modules/.bin
COVERAGE_INDEX = coverage/lcov-report/src/index.html

ifeq ($(shell uname), Darwin)
	OPEN-CMD = open
else
	OPEN-CMD = xdg-open
endif

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
	@$(BIN)/istanbul cover $(BIN)/_mocha -- -R min test 2>/dev/null
	@echo "Opening $(COVERAGE_INDEX) file in your browser now"
	@$(OPEN-CMD) $(COVERAGE_INDEX)

node_modules:
	npm install

.PHONY: api
api:
	@$(BIN)/http-server -c-1 doc

.PHONY: open-api
open-api:
	@$(BIN)/http-server doc -c-1 -o

.PHONY: clean
clean: clean-coverage

.PHONY: clean-coverage
clean-coverage:
	rm -rf coverage/
