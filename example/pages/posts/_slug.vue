/* eslint-disable vue/html-self-closing */
/* eslint-disable vue/html-self-closing */
<template>
  <div class="post">
    <h1>Post: {{ post.title }}</h1>
    <article v-html="post.content"></article>
  </div>
</template>

<script>
export default {
  asyncData ({ $content, params }) {
    // eslint-disable-next-line no-console
    console.log(params)
    const post = $content.get(`posts/${params.slug}`)
    return { post }
  }

  // asyncData({ store, params, payload }) {
  //   if (payload) {
  //     return { post: payload }
  //   } else {
  //     return { post: store.state.posts.find(post => post.name === params.slug) }
  //   }
  // }
}
</script>
