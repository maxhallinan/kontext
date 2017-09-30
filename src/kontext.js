import { pick, } from './util';
import validateType from './validate-type';

const validateKeys = validateType('array')('ctxKeys');

const validateBase = validateType('function')('baseFunction');

const kontext = validateKeys((ctxKeys) => {
  return validateBase((baseFunction) => {
    return function withCtx(...args) {
      const ctx = pick(ctxKeys)(this);

      return baseFunction(...args, ctx);
    };
  });
});

export default kontext;
