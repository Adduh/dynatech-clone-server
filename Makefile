BIN 	= ./node_modules/.bin
BROWSER = google-chrome

instrument: clean-coverage
	$(BIN)/istanbul instrument --output lib-cov --no-compact --variable global.__coverage__ src

.PHONY: test
test:
	$(BIN)/mocha

.PHONY: cover
cover: coverage

.PHONY: coverage
coverage: instrument
	COVER=1 $(BIN)/mocha --reporter mocha-istanbul
	@echo
	@echo Opening html-report/index.html file in your browser now
	$(BROWSER) html-report/index.html

.PHONY: clean
clean: clean-coverage

.PHONY: clean-coverage
clean-coverage:
	-rm -rf cov
	-rm -rf html-report
