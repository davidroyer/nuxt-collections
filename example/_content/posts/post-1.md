---
title: Post 1 Custom Title 3s
date: 2018-12-10
---

# Some content for post 1

> Blockquoted
dsads

- item 1
- item 2

```html
    <ul class="posts-list">
      <li
        v-for="post in posts"
        :key="post.slug"
      >
        <span class="post-date">
          {{ post.date }}
        </span>
        <NuxtLink
          :to="`/posts/${post.slug}/`"
          class="post-title"
        >
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
```