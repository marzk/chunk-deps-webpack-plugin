const path = require('path');
const ChunkDepsPlugin = require('../');

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: {
    app: './fixtures/src/app.js',
    appb: './fixtures/src/app-b.js',
    appc: './fixtures/src/app-c.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './fixtures/static'),
    publicPath: '//static.abc.com/abcdefg/',
  },
  plugins: [new ChunkDepsPlugin()],
  optimization: {
    splitChunks: {
      minSize: 1,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};
