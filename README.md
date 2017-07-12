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
````

You can check [BrowserSync options](http://www.browsersync.io/docs/options/) for more info. 

N.B.: `logSnippet` is disabled by default.

## License

MIT

[BrowserSync]: http://www.browsersync.io/
[Hexo]: http://hexo.io/
