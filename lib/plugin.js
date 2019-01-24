export default function (context, inject) {
  const config = Object.assign({}, <%= serialize(options) %>)

  const posts = require('@/data/posts.json')
  console.log('POSTS BY REQUIRE: ', posts);
  
  const postsStoreModule = {
    namespaced: true,
    state: {
      posts
    },
    getters: {
      allPosts: state => {
        return state.posts
      }
    }
  }

  context.store.registerModule('api', postsStoreModule, {
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

  getCollection(path) {
    return require(`@/${this.config.jsonApiDir}/${path}`)
  }

  getPosts() {
    console.log('​Api -> getPosts -> this.store.getters.allPosts', this.store.getters['api/allPosts)'])
    console.log( this.store.getters['api/allPosts)'])
    return this.store.getters['api/allPosts']
  }

  getPost(slug) {
    console.log('​Api -> getPost -> slug', slug)
    console.log('from get post; allPOSTS: ', this.store.getters['api/allPosts']);
    
    return this.store.getters['api/allPosts'].find((post) => post.slug === slug)
  }
}
