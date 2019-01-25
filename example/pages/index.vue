<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.slug"
    >
      <h2>{{ post.title }}</h2>
    </div>
    <br>
    <hr>
    <br>
    <pre>{{ $store.getters.allPosts }}</pre>
  </div>
</template>

<script>

export default {
  asyncData ({ $api, store }) {
    // eslint-disable-next-line no-console
    // console.log(store)
    const posts = $api.getPosts()
    // const posts = require(`@/data/posts`)
    return { posts }
  }
}
</script>
