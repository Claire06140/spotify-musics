const path = require('path')
const commonConfig = require('./webpack.config.cjs');

module.exports = {
  ...commonConfig,
  output: {
    path: path.resolve(process.cwd(), 'src/frontend/dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  //devtool: 'eval-source-map',
  devServer: {
    port: 5173,
    static: {
      directory: path.resolve(__dirname, 'src/frontend/public'),
    },
    hot: true,
  },
}
