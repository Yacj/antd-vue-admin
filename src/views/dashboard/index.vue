<script setup>
const router = useRouter()
const goRouter = () => {
  router.push('/dashboard/detail')
}
</script>

<template>
  <div>
    12356
    <a-button @click="goRouter">
      跳转
    </a-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
