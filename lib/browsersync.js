'use strict';

const browsersync = require('browser-sync');
const injector = require('connect-injector');

const bsConfigDefaults = {
  logSnippet: false
};

module.exports = function(app) {
  const self = this;
  const bsConfig = self.config.browsersync || {};
  const bsInstanceName = bsConfig.instanceName || undefined;
  const bs = browsersync.create(bsInstanceName);
  const opts = Object.assign({}, bsConfigDefaults, bsConfig);
  let snippet = '';
  self.browsersync = bs;

  function condition(req, res) {
    const contentType = res.getHeader('content-type');
    return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
  }

  function converter(content, req, res, callback) {
    let op = content.toString();
    const pos = op.lastIndexOf('</body>');

    if (!~pos) {
      return callback(null, content);
    }

    op = op.substring(0, pos) + snippet + op.substring(pos);
    callback(null, op);
  }

  // for testing
  bs.condition = condition;
  bs.converter = converter;

  self.on('server', () => {
    self.route.on('update', () => {
      bs.reload();
    });
  });

  bs.emitter.on('service:running', data => {
    snippet = data.options.get('snippet');
  });

  app.use(injector(condition, converter));
  bs.init(opts);
};
