import camelCase from 'lodash/camelCase';

export default function (context, inject) {
  const config = Object.assign({}, <%= serialize(options) %>)
  // const posts = require('@/data/posts.json')
  const cache = {};
  const apiStore = {}
  const apiGetters = {}
  function importAll(r) {
    r.keys().forEach(key => cache[key] = r(key));
  }

  importAll(require.context('@/data', false, /\.json$/));

  for (var filename in cache) {
    let data = cache[filename];
    addToApiStore(filename, data);
  }

  function addToApiStore(filename, data) {
    const modulePath = filename
      // Remove the "./" from the beginning.
      .replace(/^\.\//, '')
      // Remove the file extension from the end.
      .replace(/\.\w+$/, '')
      // Split nested modules into an array path.
      .split(/\//)
      // camelCase all module namespaces and names.
      .map(camelCase)

    apiGetters[`all${modulePath}`] = state => state[modulePath]
    apiStore[modulePath] = data
  }

  const apiStoreModule = {
    namespaced: true,
    state: apiStore,
    getters: apiGetters
  }

  context.store.registerModule('api', apiStoreModule, {
    preserveState: false
  })

  const api = new Api(config, context.store)

  context.$jsonApi = config.jsonApiDir
  inject('jsonApi', config.jsonApiDir)

  context.$api = api
  inject('api', api)
}

// A base class is defined using the new reserved 'class' keyword
class Api {
  constructor(optionsConfig, store) {
    this.config = optionsConfig,
      this.store = store
  }

  getCollection(collection) {
    return this.store.getters[`api/all${collection}`]
  }

  getCollectionItem(collection, slug) {
    return this.store.getters[`api/all${collection}`].find((entry) => entry.slug === slug)
  }

  getPosts() {
    return this.store.getters['api/allPosts']
  }

  getPost(slug) {
    // console.log('​Api -> getPost -> slug', slug)
    // console.log('from get post; allPOSTS: ', this.store.getters['api/allPosts']);

    return this.store.getters['api/allPosts'].find((post) => post.slug === slug)
    // return this.store.getters.allPosts.find((post) => post.slug === slug)
  }
}
