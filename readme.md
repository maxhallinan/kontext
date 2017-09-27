# kontext
[![Build Status](https://travis-ci.org/maxhallinan/kontext.svg?branch=master)](https://travis-ci.org/maxhallinan/kontext)
[![Code Coverage](https://codecov.io/gh/maxhallinan/kontext/badge.svg?branch=master)](https://coveralls.io/repos/github/maxhallinan/kontext/badge.svg?branch=master)

A higher-order function that proxies context to context free functions.


## Install

```
$ yarn install kontext
```


## Usage

```javascript
import kontext from 'kontext';
import { compose, log, prop, } from './util';

function Greeter(opts) {
  this.name = opts.name;
}

const sayHello = compose(
  log,
  (name) => `Hello. This is ${name}.`,
  prop(`name`),
);

Greeter.prototype.sayHello = kontext([ `name`, ])(sayHello);

const dog = new Greeter({
  name: `Dog`,
});

dog.sayHello(); // 'Hello. This is Dog.'
```

```javascript
import kontext from 'kontext';
import { add, compose, } from './util';

function Counter(opts) {
  this.count = opts.base || 0;
}

const withCount = kontext([ `count`, ])

const inc = (ctx, setCtx) => setCtx({
  count: add(1, ctx.count),
});

Person.prototype.inc = withCount(inc);

const skip = (n, ctx, setCtx) => setCtx({
  count: add(n, ctx.count),
});

Person.prototype.skip = withCount(skip);

const counter = new Counter();
counter.count; // 0
counter.inc();
counter.count; // 1
counter.skip(10);
counter.count; // 11
```


## API

### withCtx(keys)

#### keys

Type: `String[]`

Lorem ipsum.

#### ctx

Type: `Object`

#### setCtx(props)

Type: `({ k: *}) -> { k: * }`

##### props

Type: `Object`

Lorem ipsum.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
