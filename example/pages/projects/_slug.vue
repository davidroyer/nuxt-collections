<template>
  <div class="project">
    <h1 v-text="project.title"/>
    <article v-html="project.content"/>
  </div>
</template>

<script>
export default {
  asyncData ({ params }) {
    const project = require(`@/data/projects/${params.slug}`)
    return { project }
  }
}
</script>
