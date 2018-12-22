export default async function (context, inject) {
  const config = Object.assign({}, <%= serialize(options) %>)

  const fomratCollectionData = (data) => { orderByDate(data) }

  const jsonApi = (contentPath) => {
    console.log('contentPath', contentPath)
    const contentData = require(`@/${config.jsonApiDir}/${contentPath}`)
    return contentData
  }
  
  inject('jsonApi', jsonApi)  
  context.$jsonApi = jsonApi

  const contentApi = {
    /**
     * A helper function so that requesting content is easier.
     * This allows you to fetch the JSON without having to add `.json` post.content
     */
    ...config,
    get: (contentPath) => {
      return require(`@/${config.apiDir}/${contentPath}.json`)
    }
  }
  
  context.$content = contentApi
  inject('content', contentApi)
}


