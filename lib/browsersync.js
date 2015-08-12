'use strict';

var Promise = require('bluebird');
var injector = require('connect-injector');
var merge = require('merge');
var browserSync;

module.exports = function(app){
  var self = this;
  var config = this.config;

  var opts = merge({
    logSnippet: false
  }, config.browsersync);

  return startBrowserSync(opts).then(function(bs){
    var snippet = bs.options.get('snippet');
    var queue = [];
    var timer;

    function reload(){
      browserSync.reload(queue);
      queue.length = 0;
    }

    function listener(path){
      // Stop the timer
      if (timer) clearTimeout(timer);

      // Add data to queue
      queue.push(path);

      // Start the timer
      timer = setTimeout(reload, 100);
    }

    app.use(injector(function(req, res){
      var contentType = res.getHeader('content-type');
      return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
    }, function(content, req, res, callback){
      var str = content.toString();
      var pos = str.lastIndexOf('</body>');
      if (!~pos) return callback(null, content);

      var result = str.substring(0, pos) + snippet + str.substring(pos);
      callback(null, result);
    }));

    self.on('server', function(){
      self.route.on('update', listener);
    });
  });
};

function startBrowserSync(options){
  if (!browserSync) browserSync = require('browser-sync');

  return new Promise(function(resolve, reject){
    browserSync(options, function(err, bs){
      if (err) return reject(err);
      resolve(bs);
    });
  });
}
