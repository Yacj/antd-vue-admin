<script setup>
import LayoutContent from '@/layouts/components/LayoutContent.vue'
import LayoutHeader from '@/layouts/components/LayoutHeader.vue'
import LayoutSideBar from '@/layouts/components/LayoutSideBar.vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
</script>

<template>
  <a-layout
    has-sider
  >
    <LayoutSideBar />
    <a-layout
      :class="[
        appStore.mode === 'pc' ? (appStore.collapsed ? 'ml-20' : 'ml-50') : '',
      ]"
    >
      <LayoutHeader />
      <LayoutContent />
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>

</style>
