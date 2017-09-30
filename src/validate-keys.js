import { branch, isArray, typeOf, } from './util';

const isValid = isArray;

const paramName = `\`keys\``;

const handleInvalid = (x) => {
  throw new TypeError(
    `Expected ${paramName} to be an array. ` +
    `${paramName} is type ${typeOf(x)} instead.`
  );
};

export default branch(isValid)(handleInvalid);
