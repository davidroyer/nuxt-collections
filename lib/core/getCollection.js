const path = require('path')
const jetpack = require('fs-jetpack')
const { parseMarkdown } = require('../utils/parseMarkdown')
const { getAllMarkdownFiles } = require('./getAllMarkdownFiles')

export default async function getCollection (config, collectionType) {
  const { sourceDir } = config
  let collectionFiles = getAllMarkdownFiles(sourceDir, collectionType)
  return Promise.all(collectionFiles.map(async (fileName) => {
    const content = await jetpack.readAsync(path.join(sourceDir, collectionType, fileName))
    return parseMarkdown(fileName, content)
  }))
}
exports.getCollection = getCollection
