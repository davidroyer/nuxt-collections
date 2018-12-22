/* eslint-disable no-console */
import getCollection from './getCollection'
import { getCollectionTypes } from './getCollectionTypes'

const path = require('path')
const jetpack = require('fs-jetpack')
const md = require('markdown-it')({
  html: true
})
const { parseMarkdown } = require('../utils/parseMarkdown')

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
export async function generateRoutes (contentDirPath) {
  const routesArray = []
  const collectionTypes = getCollectionTypes(contentDirPath)

  for (const collection of collectionTypes) {
    const collectionData = await getCollection(contentDirPath, collection)
    const collectionApi = generateCollectionApi(collectionData, collection)
    const collectionRoutes = collectionApi.map(collectionItem => `/${collection}/${collectionItem.slug}`)
    routesArray.push(...collectionRoutes)
  }
  return routesArray
}

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
    ...matter.attributes,
    title: matter.attributes.title || titleize(name),
    date: matter.attributes.date
      ? matter.attributes.date.toLocaleDateString() : '',
    content: md.render(matter.body)
  }))
  return itemsData
}
exports.generateCollectionApi = generateCollectionApi

export function generateEntryJsonFile (outputDir, itemData, itemType) {
  return jetpack.write(`${outputDir}/${itemType}/${itemData.name}.json`, itemData)
}
// exports.generateEntryJsonFile = generateEntryJsonFile

export function generateCollectionJsonFile (outputDir, collectionData, collectionType) {
  return jetpack.write(`${outputDir}/${collectionType}.json`, collectionData)
}
exports.generateCollectionJsonFile = generateCollectionJsonFile

export function titleize (slug) {
  const words = slug.split('-')
  return words
    .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ')
}