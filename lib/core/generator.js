// const { getCollection } = require("./getCollection");
import getCollection from './getCollection'

const path = require('path')
const chokidar = require('chokidar')
const jetpack = require('fs-jetpack')
const md = require('markdown-it')({
  html: true
})
const { parseMarkdown } = require('../utils/parseMarkdown')

const { getCollectionTypes } = require('./getCollectionTypes')

// getCollectionTypes().forEach(type => {
//   getCollection(type)
// });

async function processCollectionItem (type, filePath) {
  const name = path.basename(filePath, '.md')
  const content = await jetpack.readAsync(filePath)
  return parseMarkdown(name, content)
}

function orderByDate (posts) {
  return posts.sort(
    (a, b) => {
      return b.matter.attributes.date.valueOf() - a.matter.attributes.date.valueOf()
    }
  )
}

/**
 * Helper function for generate hook
 * @param {Array}
 */
export async function generateRoutes (contentDir) {
  const routesArray = []
  const collectionTypes = getCollectionTypes()

  for (const collection of collectionTypes) {
    const collectionData = await getCollection(contentDir, collection)
    const collectionApi = generateCollectionApi(collectionData, collection)
    const collectionRoutes = collectionApi.map(collectionItem => `/${collection}/${collectionItem.slug}`)
    routesArray.push(...collectionRoutes)
  }
  return routesArray
}
exports.generateRoutes = generateRoutes

/**
 * Generates Schema for `JSON` files
 * @param {Object} data Data for all entries of a single collection
 * @param {String} itemType The collection type
 */
function generateCollectionApi (data, itemType) {
  const itemsData = data.map(({
    name,
    matter
  }) => ({
    name,
    slug: name,
    title: matter.attributes.title || titleize(name),
    tags: matter.attributes.tags,
    date: matter.attributes.date
      ? matter.attributes.date.toLocaleDateString() : '',
    content: md.render(matter.body)
  }))
  return itemsData
}
exports.generateCollectionApi = generateCollectionApi

function generateEntryJsonFile (outputDir, itemData, itemType) {
  return jetpack.write(`${outputDir}/${itemType}/${itemData.name}.json`, itemData)
}
exports.generateEntryJsonFile = generateEntryJsonFile

function generateCollectionJsonFile (outputDir, collectionData, collectionType) {
  return jetpack.write(`${outputDir}/${collectionType}.json`, collectionData)
}
exports.generateCollectionJsonFile = generateCollectionJsonFile

function titleize (slug) {
  const words = slug.split('-')
  return words
    .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ')
}
