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

### kontext(ctxKeys)(baseFunction)

Type: `Array k -> (({k: *}, ({k: *}) -> {k: *}) -> a) -> a`

Takes an array of keys and returns a higher-order function. Picks each key from
the context and provides the result to the base function.

#### ctxKeys

Type: `Array k`

An array of keys to pick from the function context.


### baseFunction(...*, ctx)

The function to lift into the context. The higher-order function appends `ctx` to
the arguments list of the base function.

#### ctx

Type: `{k: *}`

The result of picking `ctxKeys` from the function context. The `ctx` object is a
collection of key/value pairs. Each `key` is an item in the `ctxKeys` array. Each
value is the value of that key on the function's context. The value of a key
that is not found on the function context is `undefined` on the `ctx` object.
`kontext` binds function values to the context.


### baseFunction(...*, ctx)(setCtx)

If the base function is a thunk, `kontext` will call the inner function with a
context setter.

#### setCtx(props)

Type: `({k: *}) -> {k: *}`

Updates the context with each of the provided key/value pairs. The values of
existing keys are overwritten. Any key in `props` which refers to an inherited
property will become an own property when updated with `setCtx`.

##### props

Type: `{k: *}`

A collection of key/value pairs where each key is a context property to update
and each value is the new value of that property.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
