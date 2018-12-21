<template lang="html">
  <ul class="posts-list">
    <li v-for="post in posts"
:key="post.slug">
      <span class="post-date">
{{ post.date }}
</span>
      <NuxtLink :to="`/posts/${post.slug}/`" class="post-title">
        {{ post.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
import posts from '@/api/posts.json'
export default {
  asyncData ({ $content }) {
    // const posts = $content.get('posts')
    return { posts }
  }
}
</script>

<style lang="css">
</style>
