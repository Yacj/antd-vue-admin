<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const handleLogin = () => {
  const userStore = useUserStore()
  userStore.login({
    password: '',
    username: '',
  }).then((res) => {
    router.push('/')
  })
}
</script>

<template>
  <div>
    <a-button type="primary" @click="handleLogin">
      登录
    </a-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
