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

  asyncData ({ $jsonApi, $api, params }) {
    const post = $api.getPost(params.slug)
    // eslint-disable-next-line no-console
    console.log($api, post, 'FROM _SLUG')
    // const post = $api.getCollection(`posts/${params.slug}`)
    // const post = require(`@/${$jsonApi}/posts/${params.slug}`)
    return { post }
  },
  data: () => ({
    postTest: {}
  }),
  created () {
    // this.getResource(`posts/${this.$route.params.slug}`)
  },

  methods: {
    getResource (path) {
      const postTest = this.$api.getCollection(path)
      this.postTest = postTest
    }
  }
}
</script>

<style src='@@/node_modules/highlight.js/styles/atom-one-dark-reasonable.css'></style>
