'use strict';
var filter = require('./lib/browsersync');
hexo.extend.filter.register('server_middleware', filter, 1);
