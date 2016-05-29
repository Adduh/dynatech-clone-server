'use strict';

var assert = require('assert');
var sinon = require('sinon');

var ResourceProducer = require('../src/resourceProducer.js');

describe('ResourceProducer', () => {
  var producer;
  var location;
  beforeEach(() => {
    producer = new ResourceProducer({}, {}, 'somewhere');
    location = { has: sinon.spy(), canStore: sinon.spy() };

  });

  describe('contructor()', () => {
    it('initiates input, output and location', () => {
      assert.deepEqual(producer.input, {});
      assert.deepEqual(producer.output, {});
      assert.equal(producer.location, 'somewhere');
    });
  });
  describe('tick()', () => {
  });
});

