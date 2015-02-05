'use strict';

hexo.extend.filter.register('server_middleware', require('./lib/browsersync'), 1);