export default function (context, inject) {
  const config = Object.assign({}, <%= serialize(options) %>)
  const api = new Api(config)

  context.$jsonApi = config.jsonApiDir
  inject('jsonApi', config.jsonApiDir)
  
  context.$api = api
  inject('api', api)
}

// A base class is defined using the new reserved 'class' keyword
class Api {
  constructor(optionsConfig) {
    this.config = optionsConfig
  }

  getCollection(path) {
    return require(`@/${this.config.jsonApiDir}/${path}`)
  }
}


