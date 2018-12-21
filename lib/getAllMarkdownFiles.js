const jetpack = require('fs-jetpack');
function getAllMarkdownFiles (srcDir, directory) {
  const contentDir = jetpack.cwd(`${srcDir}/${directory}`);
  return contentDir.find({
    matching: ['*.md']
  });
}
exports.getAllMarkdownFiles = getAllMarkdownFiles
