import { branch, typeOf, } from './util';

const isValid = (type) => (x) => typeOf(x) === type;

const handleInvalid = (type) => (name) => (x) => {
  throw new TypeError(
    `Expected \`${name}\` to be a ${type}. ` +
    `\`${name}\` is type ${typeOf(x)} instead.`
  );
};

const validateType = (type) => (name) => (handleValid) => (
  branch
  (isValid(type))
  (handleInvalid(type)(name))
  (handleValid)
);

export default validateType;
