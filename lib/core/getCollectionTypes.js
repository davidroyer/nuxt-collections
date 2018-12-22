const jetpack = require('fs-jetpack')

/**
 * Get the collections within the Content directory
 * @param {string} contentDir The path of the Content directory
 */
export function getCollectionTypes (contentDir) {
  return jetpack.list(contentDir).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
}
exports.getCollectionTypes = getCollectionTypes
