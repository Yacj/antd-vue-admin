<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useSetAntdToken } from '@/composables/useSetAntToken'

const { token } = theme.useToken()
const { setToken } = useSetAntdToken()
watchEffect(() => {
  setToken(token.value)
})
</script>

<template>
  <slot />
</template>
