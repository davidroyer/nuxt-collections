/* eslint-disable no-undef */
/* eslint-disable no-console */
import chokidar from 'chokidar'
import jetpack from 'fs-jetpack'
import path, {
  resolve
} from 'path'
import defaultConfig from './default-config'
import {
  generateRoutes
} from './core/generator'
import markdownHighlight from 'markdown-it-highlightjs'
import {
  orderByDate
} from './utils/orderByDate'
import {
  generateApiFiles
} from './core/generateApiFiles'
import getCollection from './core/getCollection'
import {
  getCollectionTypes
} from './core/getCollectionTypes'

const markdown = require('markdown-it')({
  html: true
})

async function nuxtModule (moduleOptions) {
  let defaultConfig = {
    contentDir: '_Content',
    jsonApiDir: 'data',
    sourceDir: '',
    outputDir: '',
    markdown: [
      markdownHighlight
    ]
  }

  /**
   * Setup config by merging default options and options set in `nuxt.config.js`
   */
  // const userSettings =
  const options = Object.assign(defaultConfig, this.options.content, moduleOptions)
  const nuxtOptions = this.options
  console.log('options before: ', options)

  if (!options.sourceDir) {
    options.sourceDir = path.join(this.options.srcDir, options.contentDir)
  }

  if (!options.outputDir) {
    options.outputDir = path.join(this.options.srcDir, options.jsonApiDir)
  }

  for (let plugin of options.markdown) {
    markdown.use(plugin)
  }

  console.log('options after: ', options)

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
  if (this.options.dev) {
    console.log('In Dev Mode: Running chokidar watch')

    chokidar.watch(`${options.sourceDir}/**/*.md`).on('all', async (event, filePath) => {
      if (event === 'add' || event === 'change') {
        let collectionType = path.basename(path.dirname(filePath))
        let collectionData = await getCollection(options.sourceDir, collectionType)
        generateApiFiles(options.outputDir, collectionData, collectionType)
        // eslint-disable-next-line no-console
        console.log('Updating Collection Type: ', collectionType)
      }
    })
  }

  const fomratCollectionData = (data) => { orderByDate(data) }

  function setup (config) {
    jetpack.dir(config.sourceDir)
    jetpack.dir(config.outputDir)
  }

  function developmentHelper (config) {
    jetpack.dir(path.join(config.sourceDir, 'posts'))
    jetpack.dir(path.join(config.sourceDir, 'projects'))
  }

  setup(options)

  /**
   * NUXT HOOK - Ready/Build
   * Generate everything needed for development by getting all content
   * and generating JSON files
   */
  this.nuxt.hook('ready', async () => {
    const Collections = getCollectionTypes(options.sourceDir)

    for (const collectionType of Collections) {
      const collectionData = await getCollection(options.sourceDir, collectionType)
      fomratCollectionData(collectionData)
      generateApiFiles(options.outputDir, collectionData, collectionType)
    }
  })

  /**
   * NUXT HOOK - Generate
   * Create dynamic routes based on content collections
   */
  this.nuxt.hook('generate:extendRoutes', async routes => {
    const collectionRoutes = await generateRoutes(options.sourceDir)
    for (let route of collectionRoutes) {
      routes.push({
        route
      })
    }
  })
}

module.exports = nuxtModule
module.exports.meta = require('../package.json')
