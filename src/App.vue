<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useTheme } from '@/composables/useTheme'
import TokenProvider from '@/components/TokenProvider/TokenProvider.vue'
import { useAppStore } from '@/store/modules/app'
import 'dayjs/locale/zh-cn'
import { theme } from 'ant-design-vue'

const appStore = useAppStore()
const appTheme = ref(theme.defaultAlgorithm)

appStore.$subscribe((mutation, mode) => {
  const { colorScheme } = mode
  handleToggleAppTheme(colorScheme)
})

onMounted(() => {
  appStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    appStore.setMode(document.documentElement.clientWidth)
  }
  handleListenScroll()
})

watchEffect(() => {
  handleToggleAppTheme(useTheme())
})

function handleToggleAppTheme(val) {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (val === 'dark') {
    appTheme.value = theme.darkAlgorithm
    htmlElement.classList.add('dark')
  }
  else {
    appTheme.value = theme.defaultAlgorithm
    htmlElement.classList.remove('dark')
  }
}

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
