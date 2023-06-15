<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import LayoutBreadcrumb from '@/layouts/components/LayoutBreadcrumb.vue'
import LayoutTags from '@/layouts/components/LayoutTags.vue'
import { useAppStore } from '@/store/modules/app'

const router = useRouter()
const allRoutes = router.getRoutes()
const appStore = useAppStore() as Stores.app
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
function handleCollapsed() {
  appStore.setCollapsed(!appStore.collapsed)
}
</script>

<template>
  <LayoutTags />
  <div v-if="appStore.layout === 'mix'" class="flex p-3 collapse space-x-5">
    <MenuUnfoldOutlined v-if="appStore.collapsed" class="text-base cursor-pointer" @click="handleCollapsed" />
    <MenuFoldOutlined v-else class="text-base cursor-pointer" @click="handleCollapsed" />
    <LayoutBreadcrumb />
  </div>
  <a-layout-content class="p-5">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" v-if="appStore.reloadFlag" :key="appStore.aliveKeys[route.name] || route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout-content>
</template>

  <style lang="scss" scoped>
.collapse{
transition: all 0.3s;
  background: var(--ant-color-bg-base);
  color: var(--ant-color-text-secondary);
  font-size: 16px;
}
  </style>
