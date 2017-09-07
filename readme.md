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

const setAge = (years, age, setCtx) => setCtx({ 
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

### provideCtx(props)(ctxReceiver)

Type: `[k] -> (*..., v, ..., ({k: v} -> void)) -> *`

`provideCtx` injects specified context values as arguments, eliminating the 
need for direct references to `this`. `provideCtx` takes a list of context values 
and returns a higher-order function. The higher-order function appends each of 
the context values to the argument list of the base function. The last appended 
argument is a context setter. 


#### props

Type: `[k]`

A list of context values provided to `ctxReceiver`. The order of `props` specifies 
the order of arguments to `ctxReceiver`.


#### ctxReceiver([...,] ctx, ..., ctxSetter)

Type: `(*..., v, ..., ({k: v} -> void)) -> *`


##### ctx 

Type: `*`

One or more context values named in `props`. If a key is not found on the context, 
the value provided will be `undefined`.


##### ctxSetter

Type: `{k: v} -> void`

A function for updating context. Takes a key/value map. For each key, the 
corresponding context value is set.


## License

MIT © [Max Hallinan](https://github.com/maxhallinan)

