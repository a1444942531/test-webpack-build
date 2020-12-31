const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

const projectRoot = process.cwd()

const setMPA = () => {
  const entry = {}
  const HtmlWebpackPlugins = []

  // 匹配 src 下面所有 index.js
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'))

  entryFiles.forEach((src) => {
    const match = src.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]

    entry[pageName] = src

    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/${pageName}/index.html`), // 模板位置 允许使用 ejs 语法
        filename: `${pageName}.html`, // 输出的文件名
        chunks: [pageName], // 针对多入口 chunk 决定使用那些生成的 js 文件 对应 entry  ['search', 'app']
        inject: true, // 注入选项 默认为 body 底部 既true  | head | false 不插入js文件
        minify: {
          html5: true, // 根据 html5 解析输入
          collapseWhitespace: true, // 折叠空白节点
          preserveLineBreaks: false, // 折叠换行符?
          minifyCSS: true, // 压缩 css
          minifyJS: true, // 压缩 js
          removeComments: false, // 是否保留注释
        },
      }),
    )
  })

  return {
    entry,
    HtmlWebpackPlugins,
  }
}

const { entry, HtmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader',
        // 'eslint-loader',
      ],
      exclude: /node_modules/,
    }, {
      test: /.(c|le)ss$/,
      use: [
        MiniCssExtractPlugin.loader, // 抽离css
        'css-loader',
        'less-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                autoprefixer,
              ],
            },
          },
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75, // 1rem = 75个像素点
            remPrecession: 8, // 小数点
          },
        },
      ],
    }, {
      test: /.(png|jpg|gif|jpeg|webp)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
          name: '[name]_[hash:8].[ext]',
        },
      }],
    }, {
      test: /.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name]_[hash:8].[ext]',
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      // 拦截构建异常和中断处理
      return this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1
        ) {
          /**
           * 可用于上报异常
           */

          // console.log('build error') // eslint-disable-line
          process.exit(1)
        }
      })
    },
  ].concat(HtmlWebpackPlugins),
  stats: 'errors-only',
}
