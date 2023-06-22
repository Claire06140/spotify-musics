const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {EnvironmentPlugin} = require('webpack')
const DotenvWebpackPlugin = require('dotenv-webpack')

module.exports = {
// export default {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/frontend/public/index.html', // Chemin vers le fichier HTML de base
    }),
    new EnvironmentPlugin(['NODE_ENV']),
    new DotenvWebpackPlugin(),
  ],
  entry: './src/frontend/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

