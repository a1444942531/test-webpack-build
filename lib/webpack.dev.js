const { merge } = require('webpack-merge')
const path = require('path')

const baseConfig = require('./webpack.base')

const projectRoot = process.cwd()

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.join(projectRoot, './dist'),
    compress: true,
    hot: true,
  //   open: true
  },
  devtool: 'cheap-source-map',
}

module.exports = merge(baseConfig, devConfig)
