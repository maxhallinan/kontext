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

// define a generic function
const greet = compose(
  log,
  prop(`greeting`),
);

// define a context
function Greeter(opts) {
  this.greeting = opts.greeting;
}

// lift the generic function into the context
Greeter.prototype.greet = kontext([ `greeting`, ])(greet);

const dog = new Greeter({
  greeting: `Hello. This is Dog.`,
});
dog.greet(); // 'Hello. This is Dog.'
```

```javascript
import kontext from 'kontext';
import { add, compose, } from './util';

const count = prop(`count`);

const setCount = (count) => ({ count, });

function Counter(opts) {
  this.count = opts.base || 0;
}

const withCount = kontext([ `count`, ])

// pass `kontext` a thunk to gain access to a context setter
const inc = (ctx) => (setCtx) => compose(
  // compose generic functions with the context setter to mutate the context
  setCtx,
  setCount,
  add(1),
  count,
)(ctx);

Person.prototype.inc = withCount(inc);

// create reusable logic that isn't coupled to `this`.
const skip = (n, ctx) => (setCtx) => compose(
  setCtx,
  setCount,
  add(n),
  count,
)(ctx);

Person.prototype.skip = withCount(skip);

const counter = new Counter();
counter.count; // 0
counter.inc();
counter.count; // 1
counter.skip(10);
counter.count; // 11
```


## API

### kontext(keys)

Type: `Array k -> ({k: *}, ({k: *}) -> {k: *}) -> *`

#### keys

Type: `Array k`

Lorem ipsum.

#### ctx

Type: `{k: *}`

#### setCtx(props)

Type: `({k: *}) -> {k: *}`

##### props

Type: `{k: *}`

Lorem ipsum.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
