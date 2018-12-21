<template>
  <div>
    <div
      v-for="item in fileMap"
      :key="item.base"
    >
      <h2>{{ item.title }}</h2>
    </div>
  </div>
</template>

<script>
import summary from '@/data/summary.json'
export default {
  asyncData () {
    return { ...summary }
  }
}
</script>
