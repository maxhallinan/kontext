import pickFromCtx from './pick-from-ctx';
import setCtx from './set-ctx';
import { branch, isFunction, } from './util';
import validateType from './validate-type';

const validateKeys = validateType('array')('ctxKeys');

const validateBase = validateType('function')('baseFunction');

const validateProps = validateType('object')('props');

const kontext = validateKeys((ctxKeys) => {
  const pickCtx = pickFromCtx(ctxKeys);

  return validateBase((baseFunction) => {
    return function withCtx(...args) {
      const ctx = pickCtx(this);

      const res = baseFunction(...args, ctx);

      return (isFunction(res)
        ? res(validateProps(setCtx.bind(this)))
        : res);
    };
  });
});

export default kontext;
