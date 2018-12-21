/* eslint-disable no-console */
import chokidar from 'chokidar'
import path, {
  resolve
} from 'path'
import defaultConfig from './default-config'
import { generateRoutes } from './core/generator'
import markdownHighlight from 'markdown-it-highlightjs'
import { orderByDate } from './utils/orderByDate'
import { generateApiFiles } from './core/generateApiFiles'
import getCollection from './core/getCollection'
// import {  } from './core/getCollection'

// eslint-disable-next-line no-unused-vars
const markdown = require('markdown-it')({
  html: true
})

async function nuxtModule (moduleOptions) {
  let defaultConfig = {
    contentDir: '_content',
    apiDir: 'api',
    sourceDir: path.join(this.options.srcDir, '_content'),
    outputDir: path.join(this.options.srcDir, 'api'),
    markdown: [
      markdownHighlight
    ]
  }
  /**
   * Setup config by merging default options and options set in `nuxt.config.js`
   */
  const options = Object.assign(defaultConfig, this.options.content, moduleOptions)

  /**
   * Add the `nuxt-content` plugin
   */
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-content.js',
    options
  })

  /**
   * WATCHER
   * Watch content directory and regenerate `JSON` files for the that collection
   */
  // chokidar.watch(`${options.sourceDir}/**/*.md`).on('all', async (event, filePath) => {
  //   if (event === 'add' || event === 'change') {
  //     let collectionType = path.basename(path.dirname(filePath))
  //     let collectionData = await getCollection(options.sourceDir, collectionType)
  //     generateApiFiles(options.outputDir, collectionData, collectionType)
  //     // eslint-disable-next-line no-console
  //     console.log('Updating Collection Type: ', collectionType)
  //   }
  // })

  /**
   * NUXT HOOK - Ready/Build
   * Generate everything needed for development by getting all content
   * and generating JSON files
   */
  this.nuxt.hook('ready', async () => {
    const posts = await getCollection(options.sourceDir, 'posts')
    const projects = await getCollection(options.sourceDir, 'projects')
    orderByDate(posts)
    generateApiFiles(options.outputDir, posts, 'posts')
    generateApiFiles(options.outputDir, projects, 'projects')
  })

  /**
   * NUXT HOOK - Generate
   * Create dynamic routes based on content collections
   */
  this.nuxt.hook('generate:extendRoutes', async routes => {
    const collectionRoutes = await generateRoutes(options.sourceDir)
    for (let route of collectionRoutes) {
      routes.push({ route })
    }
  })
}

module.exports = nuxtModule
module.exports.meta = require('../package.json')
