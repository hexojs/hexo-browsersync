# hexo-browsersync

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
