const path =  require('path')
const HtmlWebpackPlugin =  require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([packageInfo.name]),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `../../dist/${packageInfo.name}`)
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