import { typeOf, } from './util';

const pickCtx = (keys) => (ctx) => keys.reduce((picked, k) => ({
  ...picked,
  [k]: typeOf(ctx[k]) === `function` ? ctx[k].bind(ctx) : ctx[k],
}), {});

export default pickCtx;
