const path = require('path');
const ChunkDepsPlugin =  require('../');


module.exports = {
  context: __dirname,
  entry: {
    app: './fixtures/src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './fixtures/static'),
  },
  plugins: [
    new ChunkDepsPlugin()
  ]
}
