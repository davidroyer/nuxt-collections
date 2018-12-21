const md = require('markdown-it')({
  html: true
});
const { parseMarkdown } = require("./utils/parseMarkdown");

const { getAllMarkdownFiles } = require("./getAllMarkdownFiles");

const { getCollection } = require("./getCollection");

const { getCollectionTypes } = require("./getCollectionTypes");

const { generateApiFiles } = require("./generateApiFiles");

const path = require('path')
const chokidar = require('chokidar')
const jetpack = require('fs-jetpack');


exports.getAllMarkdownFiles = getAllMarkdownFiles;

// getCollectionTypes().forEach(type => {
//   getCollection(type)
// });


// module.exports = function () {

//   chokidar.watch(`${SOURCE_DIR}/**/*.md`).on('all', async (event, filePath) => {
//     if (event === 'add' || event === 'change') {
//       let collectionType = path.basename(path.dirname(filePath))
//       let collectionData = await getCollection(collectionType)
//       generateApiFiles(collectionData, collectionType)
//       console.log('Updating Collection Type: ', collectionType)
//     }
//   })

//   this.nuxt.hook('ready', async () => {
//     const posts = await getCollection('posts')
//     const projects = await getCollection('projects')
//     orderByDate(posts)
//     generateApiFiles(posts, 'posts')
//     generateApiFiles(projects, 'projects')
//     // generateRss(posts)
//   })


//   this.nuxt.hook('generate:extendRoutes', async routes => {
//     const collectionRoutes = await generateRoutes()
//     for (let route of collectionRoutes) {
//       routes.push({
//         route
//       });
//     }
//   })
// };


async function processCollectionItem(type, filePath) {
  const name = path.basename(filePath, '.md')
  const content = await jetpack.readAsync(filePath);
  return parseMarkdown(name, content)
}

function orderByDate(posts) {
  return posts.sort(
    (a, b) => b.matter.attributes.date.valueOf() - a.matter.attributes.date.valueOf()
  )
}

/**
 * Helper function for generate hook
 * @param {Array} routes 
 */
async function generateRoutes (routes) {
  const routesArray = []
  const collectionTypes = getCollectionTypes()

  for (const collection of collectionTypes) {
    const collectionData = await getCollection(collection)
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
    title: matter.attributes.title || titleize(name),
    tags: matter.attributes.tags,
    date: matter.attributes.date ?
      matter.attributes.date.toLocaleDateString() : '',
    content: md.render(matter.body)
  }))
  return itemsData
}
exports.generateCollectionApi = generateCollectionApi

function generateEntryJsonFile (outputDir, itemData, itemType) {
  return jetpack.write(`${outputDir}/${itemType}/${itemData.name}.json`, itemData);
}
exports.generateEntryJsonFile = generateEntryJsonFile;

function generateCollectionJsonFile (outputDir, collectionData, collectionType) {
  return jetpack.write(`${outputDir}/${collectionType}.json`, collectionData);
}
exports.generateCollectionJsonFile = generateCollectionJsonFile;

function titleize(slug) {
  const words = slug.split('-')
  return words
    .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ')
}
