<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import LayoutTools from '@/layouts/components/LayoutTools.vue'
import LayoutBreadcrumb from '@/layouts/components/LayoutBreadcrumb.vue'
import { useAppStore } from '@/store/modules/app'

interface headerDefaultStyle {
  [key: string]: string | number
}
const appStore = useAppStore() as Stores.app
const isFixed = ref(false)
const title = import.meta.env.VITE_APP_TITLE
function handleCollapsed() {
  appStore.setCollapsed(!appStore.collapsed)
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  isFixed.value = scrollTop > 0
}
const headerStyle = computed(() => {
  const defaultStyle: headerDefaultStyle = {
    height: `${appStore.headerHeight}px`,
    lineHeight: `${appStore.headerHeight}px`,
  }
  if (appStore.layout === 'mix') {
    defaultStyle.zIndex = 100
    defaultStyle.width = '100%'
    defaultStyle.right = 0
  }
  if (appStore.layout === 'side') {
    if (!appStore.isMobile) {
      const width = appStore.collapsed ? appStore.collapsedWidth : appStore.siderWidth
      defaultStyle.width = `calc(100% - ${width}px)`
    }
    else {
      defaultStyle.width = '100%'
    }
    defaultStyle.zIndex = 19
  }
  return defaultStyle
})
</script>

<template>
  <a-layout-header
    class="fixed top-0  !p-0"
    :style="headerStyle"
    :class="appStore.layout === 'mix' ? 'layout-header-mix' : 'layout-header-side'"
  >
    <div v-if="appStore.layout === 'mix'" class="flex justify-between px-5">
      <div class="log flex-center space-x-3">
        <SvgIcon name="logo" size="30" />
        <h1 class="text-2xl font-bold">
          {{ title }}
        </h1>
      </div>
      <div>
        <LayoutTools />
      </div>
    </div>
    <div v-else class="flex px-5">
      <div class="space-x-3 flex items-center flex-1">
        <MenuUnfoldOutlined v-if="appStore.collapsed" class="text-base cursor-pointer" @click="handleCollapsed" />
        <MenuFoldOutlined v-else class="text-base cursor-pointer" @click="handleCollapsed" />
        <LayoutBreadcrumb />
      </div>
      <LayoutTools />
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.layout-header-container{
  //padding: 0;
  //height: auto;
  //line-height: 55px;
  //transition: width .3s,top .3s,transform .3s,background .3s;
}
.layout-header-mix{
  color: var(--ant-color-white);
}
.layout-header-side{
  background: var(--ant-color-border-bg);
}
</style>
