<template lang="html">
  <ul class="posts-list">
    <li v-for="post in posts" :key="post.slug">
      <span class="post-date">{{ post.date }}</span>
      <nuxt-link :to="`/posts/${post.slug}/`" class="post-title">
        {{ post.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  asyncData ({$content}) {
    const posts = $content.get('posts')
    return { posts }
  }
}
</script>

<style lang="css">
</style>
