const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-tool',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/`)
  },
  module: {
    rules: [
      {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
      }
    ]
  }
}