import kontext from './..';
import { typeOf, } from './../util';

describe(`kontext > input validation`, () => {
  test(`Throws a TypeError if the \`keys\` argument is not an array.`, () => {
    const errConstructor = TypeError;
    const errMsg = (val) =>
      `Expected an array but was called with type ${typeof val}.`;

    [ {}, true, 1, null, undefined, ].forEach((val) => {
      expect(() => kontext(val)).toThrow(errConstructor);
      expect(() => kontext(val)).toThrow(errMsg(val));
    });
  });

  test(`Throws a TypeError if the argument to the higher-order function is not a function.`, () => {
    const errConstructor = TypeError;
    const errMsg = (val) =>
      `Expected a function but was called with type ${typeof val}.`;

    [ {}, true, 1, null, undefined, ].forEach((val) => {
      expect(() => kontext([])(val)).toThrow(errConstructor);
      expect(() => kontext([])(val)).toThrow(errMsg(val));
    });
  });

  test(`Returns a function.`, () => {
    const keys = [];
    const withCtx = kontext(keys);
    expect(typeOf(withCtx)).toBe(`function`);
  });

  test(`Appends two arguments to the base function.`, () => {
    const keys = [];
    const withCtx = kontext(keys);
    const base = jest.fn();

    function Foo() {}
    Foo.prototype.bar = withCtx(base);

    const foo = new Foo();
    foo.bar();
    foo.bar(1);

    expect(base.calls[0].length).toBe(2);
    expect(base.calls[1].length).toBe(3);
  });

  test(`The first argument appended to the base function is a \`ctx\` object.`, () => {
    const base = jest.fn();
    const keys = [];
    const withCtx = kontext(keys);

    function Foo() {}
    Foo.prototype.bar = withCtx(base);
    const foo = new Foo('foo');
    foo.bar();

    expect(typeOf(base.calls[0][1])).toBe(`object`);
  });

  test(`The \`ctx\` object has a property for each key in the \`keys\` argument.`, () => {
    const base = jest.fn();
    const keys = [ `foo`, ];
    const withCtx = kontext(keys);

    function Foo(x) { this.foo = x; }
    Foo.prototype.bar = withCtx(base);
    const foo = new Foo('foo');
    foo.bar();

    const ctx = base.calls[0][1];

    expect(Object.keys(ctx)).toEqual(keys);
  });

  test(`\`kontext\` picks own and inherited properties.`, () => {
    const base = jest.fn();
    const keys = [ `foo`, `bar`, ];
    const withCtx = kontext(keys);

    class Foo {
      constructor(x) { this.foo = x; }
    }
    class Bar extends Foo {
      constructor(x, y) {
        super(x);
        this.bar = y;
      }
    }
    Bar.prototype.baz = withCtx(base);
    const bar = new Bar('foo', 'bar');
    bar.baz();

    const ctx = base.calls[0][1];

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

  test(`Sets \`undefined\` on the \`ctx\` object for properties that don't exist.`, () => {});

  test(`The second argument appended to the base function is a \`setCtx\` function.`, () => {});

  test(`\`setCtx\` sets the value of each entry on the context.`, () => {});
});
