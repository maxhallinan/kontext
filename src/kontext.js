import validateType from './validate-type';

const validateKeys = validateType('array')('ctxKeys');

const validateBase = validateType('function')('baseFunction');

const kontext = validateKeys((keys) => {
  const hof = validateBase((base) => function withCtx(...args) {});

  return hof;
});

export default kontext;
