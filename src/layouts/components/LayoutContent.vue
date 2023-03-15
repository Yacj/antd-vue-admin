<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'

const router = useRouter()
const allRoutes = router.getRoutes()
const appStore = useAppStore()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
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

</style>
