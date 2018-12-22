/* eslint-disable vue/html-self-closing */
/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <div class="post">
      <h1>Post: {{ post.title }}</h1>
      <article v-html="post.content" />
    </div>
  </div>
</template>

<script>

export default {
  asyncData ({ params }) {
    const post = require(`@/data/posts/${params.slug}`)
    return { post }
  }
}
// <style src='@@/node_modules/highlight.js/styles/atom-one-dark-reasonable.css'></style>
</script>
