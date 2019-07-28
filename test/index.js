'use strict';

const assert = require('assert');

function noop() {}

describe('hexo-browsersync', () => {
  let filter = {};
  let bs = {};

  const hexoEvents = {};
  const bsEvents = {};

  const mockHexo = {
    extend: {
      filter: {
        register: noop
      }
    },
    config: {},
    on: (key, val) => {
      hexoEvents[key] = val;
    },
    route: {
      on: (key, val) => {
        bsEvents[key] = val;
      }
    }
  };

  const mockApp = {
    use: noop
  };

  global.hexo = mockHexo;

  require('../index');
  filter = require('../lib/browsersync').bind(mockHexo);

  it('initializes', () => {
    filter(mockApp);
    assert.equal(typeof mockHexo.browsersync, 'object');
    assert.equal(typeof mockHexo.browsersync.condition, 'function');
    assert.equal(typeof mockHexo.browsersync.converter, 'function');
    bs = mockHexo.browsersync;
  });

  it('browsersync initializes', done => {
    mockHexo.browsersync.emitter.on('init', () => {
      done();
    });
  });

  it('runs the condition', () => {
    const mockResHtml = {
      getHeader: () => {
        return 'text/html';
      }
    };
    const mockResText = {
      getHeader: () => {
        return 'text/plain';
      }
    };
    bs.condition(null, mockResHtml);
    bs.condition(null, mockResText);
  });

  it('runs the converter', () => {
    const contentBody = '<html><body></body></html>';
    const contentNoBody = 'just text';
    bs.converter(contentBody, null, null, (err, res) => {
      assert.equal(err, null);
      assert(res.indexOf('script') > -1);
    });
    bs.converter(contentNoBody, null, null, (err, res) => {
      assert.equal(err, null);
      assert.equal(res, contentNoBody);
    });
  });

  it('fires events', () => {
    Object.keys(hexoEvents).forEach(key => {
      hexoEvents[key]();
    });
    Object.keys(bsEvents).forEach(key => {
      bsEvents[key]();
    });
  });

  it('exits', () => {
    // hexoEvents.exit();
    mockHexo.browsersync.exit();
  });
});
