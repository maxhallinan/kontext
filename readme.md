# kontext
[![Build Status](https://travis-ci.org/maxhallinan/kontext.svg?branch=master)](https://travis-ci.org/maxhallinan/kontext)
[![Code Coverage](https://codecov.io/gh/maxhallinan/kontext/badge.svg?branch=master)](https://coveralls.io/repos/github/maxhallinan/kontext/badge.svg?branch=master)

A higher-order functions that proxy context to context free functions.


## Install

```
$ yarn install kontext
```


## Usage

```javascript
import { withCtx, } from 'kontext';
import { compose, log, } from './util';

function Greeter(opts) {
  this.name = opts.name;
}

const sayHello = compose(
  log,
  (name) => `Hello. This is ${name}.`,
);

Greeter.prototype.sayHello = withCtx([ `name`, ])(sayHello);

const dog = new Greeter({
  name: `Dog`,
});

dog.sayHello(); // 'Hello. This is Dog.'
```

```javascript
import { setCtx, } from 'kontext';
import { add, compose, } from './util';

function Counter(opts) {
  this.count = opts.base || 0;
}

const setCount = setCtx([ `count`, ]);

const inc = compose(
  (count) => ({ count, }),
  (count) => add(1, count),
);

Person.prototype.inc = setCtx([ `count`, ])(inc);

const skip = compose(
  (count) => ({ count, }),
  (n, count) => add(n, count),
);

Person.prototype.skip = setCtx([ `count`, ])(skip);

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


### setCtx(keys)

#### keys

Type: `String[]`

Lorem ipsum.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
