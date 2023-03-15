<script setup>
const route = useRoute()
const router = useRouter()
function handleBreadClick(path) {
  if (path === route.path) {
    return
  }
  router.push(path)
}
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item
      v-for="(item, index) in route.matched.filter((item) => !!item.meta?.title)"
      :key="index + item.path"
      @click="handleBreadClick(item.path)"
    >
      {{ item.meta.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang="scss" scoped>

</style>
