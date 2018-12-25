const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDIr: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    '@@'
  ],
  // css: [
  //   '@@/node_modules/highlight.js/styles/atom-one-dark-reasonable.css'
  // ],

  content: {
    // generate: false,
    routes: [
      { collection: 'posts', route: 'blog' }
    ]
    // contentDir: '_Content',
    // jsonApiDir: '_Data'
  }
}
