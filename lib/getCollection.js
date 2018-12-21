const path = require('path');
const jetpack = require('fs-jetpack');
const {
  parseMarkdown
} = require('./utils/parseMarkdown');
const {
  getAllMarkdownFiles
} = require('./getAllMarkdownFiles');

async function getCollection (contentDir, collectionType) {
  let collectionFiles = getAllMarkdownFiles(contentDir, collectionType)
  return Promise.all(collectionFiles.map(async (fileName) => {
    const content = await jetpack.readAsync(path.join(contentDir, collectionType, fileName));
    return parseMarkdown(fileName, content)
  }))
}
exports.getCollection = getCollection
