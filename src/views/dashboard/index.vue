<script setup>
import {message} from "ant-design-vue";

const router = useRouter()
function goRouter() {
  router.push('/dashboard/detail')
}
function handleDelCache() {
  localStorage.clear()
  sessionStorage.clear()
  message.success('清除成功')
}
</script>

<template>
  <a-card class="p-5">
    <a-pagination :total="50" show-size-changer />
    <a-calendar />
    <a-space>
      <a-button @click="goRouter">
        跳转
      </a-button>
      <a-button type="primary" @click="handleDelCache">
        清除缓存
      </a-button>
    </a-space>
  </a-card>
</template>

<style lang="scss" scoped>

</style>
