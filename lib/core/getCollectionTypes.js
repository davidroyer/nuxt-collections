const jetpack = require('fs-jetpack')

function getCollectionTypes (contentDir) {
  return jetpack.list(contentDir).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
}
exports.getCollectionTypes = getCollectionTypes
