<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import TokenProvider from '@/components/TokenProvider/TokenProvider.vue'
import { useAppStore } from '@/store/modules/app'
import 'dayjs/locale/zh-cn'
import { theme } from 'ant-design-vue'

const appStore = useAppStore()
const appTheme = ref(theme.defaultAlgorithm)
appStore.$subscribe((mutation, mode) => {
  const { colorScheme } = mode
  if (colorScheme === 'dark') {
    appTheme.value = theme.darkAlgorithm
  }
  else {
    appTheme.value = theme.defaultAlgorithm
  }
})
function handleListenScroll() {
  let timer: number | null = null
  const body: HTMLElement = document.body
  const toggleAttribute = (): void => {
    body.toggleAttribute('scroll', true)
    clearTimeout(timer!)
    timer = window.setTimeout(() => {
      body.toggleAttribute('scroll')
    }, 500)
  }

  window.addEventListener('scroll', toggleAttribute)
}

onMounted(() => {
  appStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    appStore.setMode(document.documentElement.clientWidth)
  }
  handleListenScroll()
})
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: appTheme,
    }"
  >
    <TokenProvider>
      <RouterView />
    </TokenProvider>
  </a-config-provider>
</template>

<style>

</style>
