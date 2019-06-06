# hexo-browsersync

[![Build Status](https://travis-ci.org/hexojs/hexo-browsersync.svg?branch=master)](https://travis-ci.org/hexojs/hexo-browsersync)  [![NPM version](https://badge.fury.io/js/hexo-browsersync.svg)](https://badge.fury.io/js/hexo-browsersync)  [![Build status](https://ci.appveyor.com/api/projects/status/k0pbbpttxwwdloc5?svg=true)](https://ci.appveyor.com/project/tomap/hexo-browsersync-xxjnt) [![Coverage Status](https://coveralls.io/repos/github/hexojs/hexo-browsersync/badge.svg?branch=master)](https://coveralls.io/github/hexojs/hexo-browsersync?branch=master)


[BrowserSync] plugin for [Hexo].

## Installation

``` bash
$ npm install hexo-browsersync --save
```

## Usage

`hexo-browsersync` is transparent. Once installed, just run `hexo-server` as you usually do, and you will benefit from the features from browsersync.

## Options

BrowserSync options are supported inside `_config.yml` file, e.g.:

````yaml
browsersync:
  logLevel: "warn"
  ghostMode:
    scroll: true
  instanceName: "uniqueString"
````

You can check [BrowserSync options](http://www.browsersync.io/docs/options/) for more info. 

N.B.: `logSnippet` is disabled by default. Also, `instanceName` allows you to [create a named instance](https://www.browsersync.io/docs/api#api-create). The default value is `undefined` (anonymous instance).

## License

MIT

[BrowserSync]: http://www.browsersync.io/
[Hexo]: http://hexo.io/
