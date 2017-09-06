# kontext

[![Build Status](https://travis-ci.org/maxhallinan/kontext.svg?branch=master)](https://travis-ci.org/maxhallinan/kontext)
[![Coverage Status](https://coveralls.io/repos/github/maxhallinan/kontext/badge.svg)](https://coveralls.io/github/maxhallinan/kontext)

A higher-order function that proxies context to context-free functions.


## Install

```
$ npm install --save kontext
```


## Usage

```javascript
import { provideCtx, } from 'kontext';

const grow = (years, ctx, setCtx) => setCtx({
  age: ctx.age + years,
});

function Person(age) {
  this.age = age;
}

Person.prototype.grow = provideCtx(grow);

const baby = new Person(1);

baby.age; // 1
baby.grow(1);
baby.age; // 2
```


## API

### provideCtx(ctxReceiver)

#### ctxReceiver

Type: `(*..., {*}) -> *`


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
