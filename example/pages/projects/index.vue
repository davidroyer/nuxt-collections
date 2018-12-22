<template>
  <div class="project">
    <h1>Projects</h1>
    <div>
      <div
        v-for="project in projects"
        :key="project.slug"
      >
        <NuxtLink :to="`/projects/${project.slug}`">
          <h2 v-text="project.title" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '@/data/projects'
export default {
  asyncData () {
    return { projects }
  }
}
</script>
