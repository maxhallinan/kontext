# kontext
[![Build Status](https://travis-ci.org/maxhallinan/kontext.svg?branch=master)](https://travis-ci.org/maxhallinan/kontext)
[![Coverage Status](https://coveralls.io/repos/github/maxhallinan/kontext/badge.svg?branch=master)](https://coveralls.io/github/maxhallinan/kontext?branch=master)

A higher-order function that proxies context to context free functions.


## Install

```
$ yarn install kontext
```


## Usage

Provide context values to context-free functions.

```javascript
import kontext from 'kontext';
import { compose, log, prop, } from './util';

// define a generic function
const greet = compose(
  log,
  prop(`greeting`),
);

// define a context
function Greeter(opts = {}) {
  this.greeting = opts.greeting;
}
// lift the generic function into the context
Greeter.prototype.greet = kontext([ `greeting`, ])(greet);

const dog = new Greeter({
  greeting: `Hello. This is Dog.`,
});
dog.greet(); // 'Hello. This is Dog.'
```

Compose context-free functions with a context setter to mutate the context.

```javascript
import kontext from 'kontext';
import { add, compose, } from './util';

const count = prop(`count`);
const setCount = (count) => ({ count, });
const withCount = kontext([ `count`, ]);

function Counter(opts = {}) {
  this.count = opts.init || 0;
}

// compose generic functions with the context setter to mutate the context
const inc = (ctx, setCtx) => compose(
  setCtx,
  setCount,
  add(1),
  count,
)(ctx);
Counter.prototype.inc = withCount(inc);

// create reusable logic that isn't coupled to `this`.
const skip = (n, ctx, setCtx) => compose(
  setCtx,
  setCount,
  add(n),
  count,
)(ctx);
Counter.prototype.skip = withCount(skip);

const counter = new Counter({ init: 1, });
counter.count; // 1
counter.inc();
counter.count; // 2
counter.skip(10);
counter.count; // 12
```


## API

### kontext(ctxKeys)(baseFunction)

Takes an array of keys and returns a higher-order function. Picks each key from
the context and provides the result to the base function.

#### ctxKeys

Type: `Array k`

An array of keys to pick from the function context.


#### baseFunction(...*, ctx, setCtx)

The function to lift into the context. The higher-order function appends `ctx`
and `setCtx` to the arguments list of `baseFunction`.

##### ctx

Type: `{k: *}`

The result of picking `ctxKeys` from the function context. The `ctx` object is a
collection of key/value pairs. Each `key` is an item in the `ctxKeys` array. Each
value is the value of that key on the function's context. The value of a key
that is not found on the function context is `undefined` on the `ctx` object.
`kontext` binds function values to the context.


##### setCtx(props)

Type: `({k: *}) -> {k: *}`

Updates the context with each of the provided key/value pairs. The values of
existing keys are overwritten. Any key in `props` which refers to an inherited
property will become an own property when updated with `setCtx`.

###### props

Type: `{k: *}`

A collection of key/value pairs where each key is a context property to update
and each value is the new value of that property.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
