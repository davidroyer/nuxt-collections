<template>
  <div class="project">
    <pre>{{ project }}</pre>
    <!-- <h1 v-text="project.title" />
    <article v-html="project.content" /> -->
  </div>
</template>

<script>
export default {
  asyncData ({ $api, params }) {
    const project = $api.getCollectionItem('projects', params.slug)
    return { project }
  }
  // asyncData ({ params }) {
  //   const project = require(`@/data/projects/${params.slug}`)
  //   return { project }
  // }
}
</script>
