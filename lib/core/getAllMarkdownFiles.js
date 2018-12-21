const jetpack = require('fs-jetpack');

function getAllMarkdownFiles (contentSrcDir, directory) {
  const contentDir = jetpack.cwd(`${contentSrcDir}/${directory}`);
  return contentDir.find({
    matching: ['*.md']
  });
}
exports.getAllMarkdownFiles = getAllMarkdownFiles
