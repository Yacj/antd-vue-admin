<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import LayoutTags from '@/layouts/components/LayoutTags.vue'
import LayoutTools from '@/layouts/components/LayoutTools.vue'
import LayoutBreadcrumb from '@/layouts/components/LayoutBreadcrumb.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const isFixed = ref(false)
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
</script>

<template>
  <a-layout-header
    class="flex operation-area flex-col layout-header-container"
    :class="{
      'sticky top-0 z-15 w-full shadow': isFixed,
    }"
  >
    <div class="flex justify-between px-5">
      <div class="space-x-3 flex items-center">
        <MenuUnfoldOutlined v-if="appStore.collapsed" class="text-base cursor-pointer" @click="handleCollapsed" />
        <MenuFoldOutlined v-else class="text-base cursor-pointer" @click="handleCollapsed" />
        <LayoutBreadcrumb />
      </div>
      <LayoutTools />
    </div>
    <LayoutTags/>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.layout-header-container{
  background: var(--component-background);
  padding: 0;
  height: auto;
  line-height: 55px;
  transition: width .3s,top .3s,transform .3s,background .3s;
}
</style>
