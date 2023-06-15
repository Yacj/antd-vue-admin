<script setup>
import LayoutContent from '@/layouts/components/LayoutContent.vue'
import LayoutHeader from '@/layouts/components/LayoutHeader.vue'
import LayoutSideBar from '@/layouts/components/LayoutSideBar.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
</script>

<template>
  <a-layout class="min-h-screen">
    <a-layout>
      <LayoutSideBar />
      <a-layout>
        <LayoutHeader />
        <LayoutContent />
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>

</style>
