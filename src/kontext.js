import validateKeys from './validate-keys';

const kontext = validateKeys((keys) => {
  const hof = (base) => function (...args) {};

  return hof;
});

export default kontext;
