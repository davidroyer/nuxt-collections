/* eslint-disable vue/max-attributes-per-line */
<template lang="html">
  <div class="blog">
    <h2>Blog Route Page</h2>
    <ul class="posts-list">
      <li
        v-for="post in posts"
        :key="post.slug"
      >
        <span class="post-date">
          {{ post.date }}
        </span>
        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="post-title"
        >
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import posts from '@/data/posts'
export default {
  asyncData () {
    return { posts }
  }
}
</script>

<style lang="css">
</style>
