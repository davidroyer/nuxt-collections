const {
  generateCollectionApi,
  generateEntryJsonFile,
  generateCollectionJsonFile
} = require('./generator')
/**
 * Create the `JSON` files for a collection
 * @param {object} data
 * @param {string} itemType
 */
export function generateApiFiles (config, data, collectionType) {
  const { outputDir } = config
  const collectionItemsData = generateCollectionApi(config, data, collectionType)

  /**
   * Create a seperate `JSON` file for each file belonging to the collection
   */
  Promise.all(collectionItemsData.map(function (itemData) {
    return generateEntryJsonFile(outputDir, itemData, collectionType)
  }))

  /**
   * Create a `JSON` file that includes the data from all the files belonging to the collection
   */
  generateCollectionJsonFile(outputDir, collectionItemsData, collectionType)
}
exports.generateApiFiles = generateApiFiles
