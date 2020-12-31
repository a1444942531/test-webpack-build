### 常见的 Loaders
- babel-loader    转换ES6 ES7等js新特性语法
- css-loader      支持.css文件的加载解析
- less-loader     将less转换成css
- ts-loader       将ts转换成js
- file-loader     进行图片 字体等的打包
- raw-loader      将文件以字符串的形式导入
- thread-loader   多线程打包js和css

### 常见的 Plugins
- CommonsChunkPlugin        将 chunks 相同的模块代码提取成公共js
- CleanWebpackPlugin        清理构建目录
- ExtractTextWebpackPlugin  将css从bunlde文件里提取成一个独立的css文件
- CopyWebpackPlugin         将文件或文件夹拷贝到构建的输出目录
- HtmlWebpackPlugin         创建html文件去承载输出的 bundle
- UglifyjsWebpackPlugin     压缩 js
- ZipWebpackPlugin          将打包出的资源生成一个zip包