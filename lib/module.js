/* eslint-disable no-undef */
/* eslint-disable no-console */
import chokidar from 'chokidar'
import jetpack from 'fs-jetpack'
import path, { resolve } from 'path'
import { generateApiFiles } from './core/generateApiFiles'
import { generateRoutes } from './core/generator'
import getCollection from './core/getCollection'
import { getCollectionTypes } from './core/getCollectionTypes'
import markdownInstance from './core/markdownInstance'
import defaultConfig from './default-config'
import { orderByDate } from './utils/orderByDate'

async function nuxtModule (moduleOptions) {
  /**
   * Setup config by merging default options and options set in `nuxt.config.js`
   */
  const options = Object.assign(defaultConfig, this.options.collections, moduleOptions)
  // eslint-disable-next-line no-unused-vars
  const nuxtOptions = this.options
  // console.log('options before: ', options)

  options.sourceDir = path.join(this.options.srcDir, options.contentDir)
  options.outputDir = path.join(this.options.srcDir, options.jsonApiDir)

  for (let plugin of options.markdown) {
    markdownInstance.use(plugin)
  }
  options.md = markdownInstance

  // console.log('options after: ', options)

  /**
   * Add the `nuxt-collections` plugin
   */
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-collections.js',
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
        let collectionData = await getCollection(options, collectionType)
        generateApiFiles(options, collectionData, collectionType)
        // eslint-disable-next-line no-console
        // console.log('Updating Collection Type: ', collectionType)
      }
    })
  }

  const formatCollectionData = (data) => { orderByDate(data) }

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
  this.nuxt.hook('build:before', async () => {
    const Collections = getCollectionTypes(options.sourceDir)

    for (const collectionType of Collections) {
      const collectionData = await getCollection(options, collectionType)
      formatCollectionData(collectionData)
      generateApiFiles(options, collectionData, collectionType)
    }
  })

  /**
   * NUXT HOOK - Generate
   * Create dynamic routes based on content collections
   */
  this.nuxt.hook('generate:extendRoutes', async routes => {
    if (options.generate === false) return

    const collectionRoutes = await generateRoutes(options, options.sourceDir)
    for (let route of collectionRoutes) {
      routes.push({
        route
      })
    }
  })
}

module.exports = nuxtModule
module.exports.meta = require('../package.json')
