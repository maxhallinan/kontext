import pickCtx from './pick-ctx';
import setCtx from './set-ctx';
import validateType from './validate-type';

const validateKeys = validateType(`array`)(`ctxKeys`);

const validateBase = validateType(`function`)(`baseFunction`);

const validateProps = validateType(`object`)(`props`);

const kontext = validateKeys((ctxKeys) => {
  return validateBase((baseFunction) => {
    return function withCtx(...args) {
      return baseFunction(
        ...args,
        pickCtx(ctxKeys)(this),
        validateProps(setCtx.bind(this))
      );
    };
  });
});

export default kontext;
