<template>
  <div class="project">
    <h1 v-text="project.title"></h1>
    <article v-html="project.content"></article>
  </div>
</template>

<script>
export default {
  asyncData ({ $content, params }) {
    const project = $content.get(`projects/${params.slug}`)
    return { project }
  }
}
</script>
