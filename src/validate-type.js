import { branch, typeOf, } from './util';

const isValid = (type) => (x) => typeOf(x) === type;

const handleInvalid = (type) => (name) => (x) => {
  throw new TypeError(
    `Expected \`${name}\` to be a ${type}. ` +
    `\`${name}\` is type ${typeOf(x)} instead.`
  );
};

const validateType = (type) => (name) => (handleValid) => (
  /* eslint-disable no-unexpected-multiline */
  branch
  (isValid(type))
  (handleInvalid(type)(name))
  (handleValid)
  /* eslint-enable no-unexpected-multiline */
);

export default validateType;
