<script setup>
import LayoutSideBar from '@/layouts/components/LayoutSideBar.vue'
</script>

<template>
  <a-layout>
    <a-layout-sider>
      <LayoutSideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>

</style>
