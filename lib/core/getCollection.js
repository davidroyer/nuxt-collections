const path = require('path')
const jetpack = require('fs-jetpack')
const { parseMarkdown } = require('../utils/parseMarkdown')
const { getAllMarkdownFiles } = require('./getAllMarkdownFiles')

export default async function getCollection (contentDirPath, collectionType) {
  let collectionFiles = getAllMarkdownFiles(contentDirPath, collectionType)
  return Promise.all(collectionFiles.map(async (fileName) => {
    const content = await jetpack.readAsync(path.join(contentDirPath, collectionType, fileName))
    return parseMarkdown(fileName, content)
  }))
}
exports.getCollection = getCollection
