'use strict';

var assert = require('assert');

function noop() {}

describe('hexo-browsersync', function() {
  var filter,
    bs;

  var hexoEvents = {};
  var bsEvents = {};

  var mockHexo = {
    extend: {
      filter: {
        register: noop
      }
    },
    config: {},
    on: function(key, val) {
      hexoEvents[key] = val;
    },
    route: {
      on: function(key, val) {
        bsEvents[key] = val;
      }
    }
  };

  var mockApp = {
    use: noop
  };

  global.hexo = mockHexo;

  require('../index');
  filter = require('../lib/browsersync').bind(mockHexo);

  it('initializes', function() {
    filter(mockApp);
    assert.equal(typeof mockHexo.browsersync, 'object');
    assert.equal(typeof mockHexo.browsersync.condition, 'function');
    assert.equal(typeof mockHexo.browsersync.converter, 'function');
    bs = mockHexo.browsersync;
  });

  it('browsersync initializes', function(done) {
    mockHexo.browsersync.emitter.on('init', function() {
      done();
    });
  });

  it('runs the condition', function() {
    var mockResHtml = {
      getHeader: function() {
        return 'text/html';
      }
    };
    var mockResText = {
      getHeader: function() {
        return 'text/plain';
      }
    };
    bs.condition(null, mockResHtml);
    bs.condition(null, mockResText);
  });

  it('runs the converter', function() {
    var contentBody = '<html><body></body></html>';
    var contentNoBody = 'just text';
    bs.converter(contentBody, null, null, function(err, res) {
      assert.equal(err, null);
      assert(res.indexOf('script') > -1);
    });
    bs.converter(contentNoBody, null, null, function(err, res) {
      assert.equal(err, null);
      assert.equal(res, contentNoBody);
    });
  });

  it('fires events', function() {
    Object.keys(hexoEvents).forEach(function(key) {
      hexoEvents[key]();
    });
    Object.keys(bsEvents).forEach(function(key) {
      bsEvents[key]();
    });
  });

  it('exits', function() {
    // hexoEvents.exit();
    mockHexo.browsersync.exit();
  });
});
