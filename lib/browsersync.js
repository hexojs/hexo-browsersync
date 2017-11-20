'use strict';

var browsersync = require('browser-sync');
var injector = require('connect-injector');

var bsConfigDefaults = {
  logSnippet: false
};

module.exports = function (app) {
  var self = this;
  var bs = browsersync.create();
  var bsConfig = self.config.browsersync || {};
  var opts = Object.assign({}, bsConfigDefaults, bsConfig);
  var snippet = '';
  self.browsersync = bs;

  function condition(req, res) {
    var contentType = res.getHeader('content-type');
    return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
  }

  function converter(content, req, res, callback) {
    var op = content.toString();
    var pos = op.lastIndexOf('</body>');

    if (!~pos) {
      return callback(null, content);
    }

    op = op.substring(0, pos) + snippet + op.substring(pos);
    callback(null, op);
  }

  // for testing
  bs.condition = condition;
  bs.converter = converter;

  self.on('server', function() {
    self.route.on('update', function() {
      bs.reload();
    });
  });

  bs.emitter.on('service:running', function(data) {
    snippet = data.options.get('snippet');
  });

  app.use(injector(condition, converter));
  bs.init(opts);
};
