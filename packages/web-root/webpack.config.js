const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const packageInfo = require('./package.json')
const packages = Object.keys(packageInfo.dependencies).filter((lib) => {
  return lib.indexOf('simple-library-') === 0
})

module.exports = {
  entry: {
    app: './src/index.js',
    another: './src/another-module.js'
  },
  devtool: 'inline-source-tool',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        console.log('module.resource=====', module.resource)
        console.log('------', module.resource && module.resource.indexOf("packages/simple-library") !== -1 && (/\.js$/).test(module.resource))
        return module.resource && module.resource.indexOf("packages/simple-library") !== -1 && (/\.js$/).test(module.resource);
      }
    })
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
    ],
    loaders: [
      {
        test: /web-components\//,
        loader: 'web-components-loader'
      }
    ]
  }
}