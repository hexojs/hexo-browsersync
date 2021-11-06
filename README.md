# hexo-browsersync


[![NPM version](https://badge.fury.io/js/hexo-browsersync.svg)](https://www.npmjs.com/package/hexo-browsersync)
[![Coverage Status](https://coveralls.io/repos/github/hexojs/hexo-browsersync/badge.svg?branch=master)](https://coveralls.io/github/hexojs/hexo-browsersync?branch=master)

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

You can check [BrowserSync options](https://www.browsersync.io/docs/options/) for more info. 

N.B.: `logSnippet` is disabled by default. Also, `instanceName` allows you to [create a named instance](https://www.browsersync.io/docs/api#api-create). The default value is `undefined` (anonymous instance).

## License

MIT

[BrowserSync]: https://www.browsersync.io/
[Hexo]: https://hexo.io/
