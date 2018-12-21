const { resolve } = require('path')

module.exports = {
  watch: ['./api/*.json'],
  rootDir: resolve(__dirname, '..'),
  buildDIr: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    '@@'
  ],
  content: {
    contentDir: '_content'
  }
}
