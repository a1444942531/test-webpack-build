const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const { merge } = require('webpack-merge')
const cssnano = require('cssnano')

const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  module: {
    rules: [{
      test: /.(c|le)ss$/,
      use: 'ignore-loader',
    }],
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
        global: 'React',
      }, {
        module: 'react-dom',
        entry: 'https://unpkg.com/react@17/umd/react.production.min.js',
        global: 'ReactDOM',
      }],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
}

module.exports = merge(baseConfig, prodConfig)
