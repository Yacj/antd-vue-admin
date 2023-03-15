<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useAppStore } from '@/store/modules/app'
import 'dayjs/locale/zh-cn'

const appStore = useAppStore()

const handleListenScroll = () => {
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
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style>

</style>
