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

function Person(opts) {
  this.age = opts.age;
  this.name = opts.name;
}

const add = (x) => (y) => x + y; 

const setAge = (years, age, set) => set({ 
  age: add(years, age),
});

Person.prototype.grow = provideCtx([ 'age', ])(setAge);

const sayAge = (name, age) => 
  console.log(`Hello. My name is ${name}. I am ${age} years old.`);

Person.prototype.sayAge = provideCtx([ 'name', 'age', ])(sayHello);

const max = new Person({
  age: 2,
  name: 'Max',
});

max.sayAge(); // 'Hello, my name is Max. I am 2 years old.' 
max.grow(1);
max.sayAge(); // 'Hello, my name is Max. I am 3 years old.' 
```


## API

### provideCtx(ctxReceiver)

#### ctxReceiver

Type: `(*..., Context, ContextSetter) -> *`


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)
