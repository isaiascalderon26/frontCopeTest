const path = require('path');
const webpack = require('webpack');

module.exports = {
  // ... Otras configuraciones de webpack ...
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  // ... Otras configuraciones de webpack ...
};
