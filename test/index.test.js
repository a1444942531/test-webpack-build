const path = require('path')

process.chdir(path.join(__dirname, 'smoke/template'))

require('./unit/webpack-base-test')
