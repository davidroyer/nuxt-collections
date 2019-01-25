/* eslint-disable vue/html-self-closing */
/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <div class="post">
      <h1>Post: {{ post.title }}</h1>
      // eslint-disable-next-line vue/no-v-html
      <article v-html="post.content" />
    </div>
  </div>
</template>

<script>

export default {

  asyncData ({ $api, params }) {
    const post = $api.getCollectionItem('posts', params.slug)
    return { post }
  }
}
</script>

<style src='@@/node_modules/highlight.js/styles/atom-one-dark-reasonable.css'></style>
