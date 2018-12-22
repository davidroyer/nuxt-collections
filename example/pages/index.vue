<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.slug"
    >
      <h2>{{ post.title }}</h2>
    </div>
  </div>
</template>

<script>

export default {
  asyncData () {
    const posts = require(`@/data/posts`)
    return { posts }
  }
}
</script>
