export default async function (context, inject) {
  const config = Object.assign({}, <%= serialize(options) %>)
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


