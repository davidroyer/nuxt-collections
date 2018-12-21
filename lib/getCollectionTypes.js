const jetpack = require('fs-jetpack');

function getCollectionTypes (srcDir) {
  return jetpack.list(srcDir).filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
}
exports.getCollectionTypes = getCollectionTypes;
