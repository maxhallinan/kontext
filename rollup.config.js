import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const pkg = require('./package.json');
const env = process.env.NODE_ENV;

const deps = Object.keys(pkg.dependencies);
const peerDeps = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [];
const external = deps.concat(peerDeps);

const plugins = [
  nodeResolve(),
  babel(babelrc()),
  commonjs(),
];

const config = {
  entry: 'src/index.js',
  external,
  globals: {},
  plugins,
  format: 'umd',
  moduleName: 'kontext',
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      }
    })
  );
}

export default config;

