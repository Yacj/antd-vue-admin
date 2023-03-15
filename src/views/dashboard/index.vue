<script setup>
const router = useRouter()
const goRouter = () => {
  router.push('/dashboard/detail')
}
</script>

<template>
  <a-card class="p-5">
    <a-pagination :total="50" show-size-changer />

    <a-calendar />
    <a-button @click="goRouter">
      跳转
    </a-button>
  </a-card>
</template>

<style lang="scss" scoped>

</style>
