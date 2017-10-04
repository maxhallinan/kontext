import kontext from './..';
import { typeOf, } from './../util';

describe(`kontext`, () => {
  test(`Throws a TypeError if \`kontext\` is called without an array.`, () => {
    const errClass = TypeError;
    const errMsg = (val) => (
      `Expected \`ctxKeys\` to be a array. ` +
      `\`ctxKeys\` is type ${typeOf(val)} instead.`
    );

    [ {}, `foo`, true, 1, null, undefined, ].forEach((val) => {
      expect(() => kontext(val)).toThrow(errClass);
      expect(() => kontext(val)).toThrow(errMsg(val));
    });
  });

  test(`Throws a \`TypeError\` if the returned higher-order function is called without a function.`, () => {
    const errClass = TypeError;
    const errMsg = (val) => (
      `Expected \`baseFunction\` to be a function. ` +
      `\`baseFunction\` is type ${typeOf(val)} instead.`
    );

    [ {}, `foo`, true, 1, null, undefined, ].forEach((val) => {
      expect(() => kontext([])(val)).toThrow(errClass);
      expect(() => kontext([])(val)).toThrow(errMsg(val));
    });
  });

  test(`\`kontext\` returns a function.`, () => {
    const keys = [];
    const withCtx = kontext(keys);
    expect(typeOf(withCtx)).toBe(`function`);
  });

  test(`Appends a \`ctx\` object and a \`setCtx\` function to the base function arguments list.`, () => {
    const base = jest.fn();
    const keys = [];
    const withCtx = kontext(keys);

    function Foo() {}
    Foo.prototype.bar = withCtx(base);
    const foo = new Foo();
    foo.bar();
    foo.bar(1);

    expect(base.mock.calls[0].length).toBe(2);
    expect(typeOf(base.mock.calls[0][0])).toEqual(`object`);
    expect(typeOf(base.mock.calls[0][1])).toEqual(`function`);
    expect(base.mock.calls[1].length).toBe(3);
  });

  test(`The \`ctx\` object has a property for each key in the \`keys\` argument.`, () => {
    const base = jest.fn();
    const keys = [ `foo`, `bar`, `baz`, ];
    const withCtx = kontext(keys);

    function Foo() {}
    Foo.prototype.bar = withCtx(base);
    const foo = new Foo();
    foo.bar();

    const ctx = base.mock.calls[0][0];

    expect(Object.keys(ctx)).toEqual(keys);
  });

  test(`The \`ctx\` object includes both own and inherited properties of the context.`, () => {
    const base = jest.fn();
    const keys = [ `foo`, `bar`, ];
    const withCtx = kontext(keys);

    class Foo {
      constructor(x) {
        this.foo = x;
      }
    }
    class Bar extends Foo {
      constructor(x, y) {
        super(x);
        this.bar = y;
      }
    }
    Bar.prototype.baz = withCtx(base);
    const bar = new Bar(`foo`, `bar`);
    bar.baz();

    const ctx = base.mock.calls[0][0];

    expect(ctx.foo).toBe(`foo`);
    expect(ctx.bar).toBe(`bar`);
  });

  test(`Binds \`this\` to function values.`, () => {
    const keys = [ `getBar`, ];
    const withCtx = kontext(keys);

    function Foo(bar) {
      this.bar = bar;
    }
    Foo.prototype.getBar = function () {
      return this.bar;
    };

    const barAddOne = ({ getBar, }) => getBar() + 1;

    Foo.prototype.barAddOne = withCtx(barAddOne);

    const foo = new Foo(1);

    expect(foo.barAddOne()).toBe(2);
  });

  test(`Sets \`undefined\` on the \`ctx\` object for properties that don't exist.`, () => {
    const base = jest.fn();
    const keys = [ `foo`, ];
    const withCtx = kontext(keys);

    function Foo() {}
    Foo.prototype.bar = withCtx(base);
    const foo = new Foo();
    foo.bar();

    const ctx = base.mock.calls[0][0];

    expect(ctx.hasOwnProperty(`foo`)).toBeTruthy();
    expect(ctx.foo).toBeUndefined();
  });

  test(`Throws a \`TypeError\` if \`setCtx\` is called without an object.`, () => {
    const errClass = TypeError;
    const errMsg = (x) => (
      `Expected \`props\` to be a object. ` +
      `\`props\` is type ${typeOf(x)} instead.`
    );

    const testThunk = (x) => (ctx, setCtx) => setCtx(x);

    [ [], `foo`, true, 1, null, undefined, ].forEach((x) => {
      expect(() => kontext([])(testThunk(x))()).toThrow(errClass);
      expect(() => kontext([])(testThunk(x))()).toThrow(errMsg(x));
    });
  });

  test(`\`setCtx\` sets the value of each entry on the context.`, () => {
    const keys = [ `foo`, ];
    const withCtx = kontext(keys);
    const setFooBar = (bar, ctx, setCtx) => setCtx({
      foo: ctx.foo.toUpperCase(),
      bar,
    });

    function Foo(x) {
      this.foo = x;
    }
    Foo.prototype.setFooBar = withCtx(setFooBar);
    const foo = new Foo(`foo`);
    foo.setFooBar(`bar`);

    expect(foo.foo).toBe(`FOO`);
    expect(foo.bar).toBe(`bar`);
  });
});
