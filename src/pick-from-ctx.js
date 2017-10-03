import { typeOf, } from './util';

const pickFromCtx = (keys) => (ctx) => keys.reduce((picked, k) => ({
  ...picked,
  [k]: typeOf(ctx[k]) === `function` ? ctx[k].bind(ctx) : ctx[k],
}), {});

export default pickFromCtx;
