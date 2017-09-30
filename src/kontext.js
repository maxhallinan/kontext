import pickFromCtx from './pick-from-ctx';
import validateType from './validate-type';

const validateKeys = validateType('array')('ctxKeys');

const validateBase = validateType('function')('baseFunction');

const kontext = validateKeys((ctxKeys) => {
  const pickCtx = pickFromCtx(ctxKeys);

  return validateBase((baseFunction) => {
    return function withCtx(...args) {
      const ctx = pickCtx(this);

      return baseFunction(...args, ctx);
    };
  });
});

export default kontext;
