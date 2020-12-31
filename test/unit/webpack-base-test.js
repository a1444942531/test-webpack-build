test('Webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')

  expect(baseConfig.entry.index.indexOf('/test/smoke/template/src/index/index.js') > -1).toBe(true)
  expect(baseConfig.entry.search.indexOf('/test/smoke/template/src/search/index.js') > -1).toBe(true)
})
