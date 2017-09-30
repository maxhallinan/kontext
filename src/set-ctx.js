import { entries, } from './util';

function setCtx(props) {
  entries(props).forEach(([ key, value, ]) => {
    this[key] = value;
  });

  return props;
}

export default setCtx;
