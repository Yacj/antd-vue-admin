<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { set } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import LayoutSubMenu from '@/layouts/components/LayoutSubMenu.vue'
import { usePermissionStore } from '@/store/modules/permission'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const collapsed = computed(() => appStore.collapsed)
const menuList = computed(() => permissionStore.accessRoutes)
const selectedKeys = ref([])
const openKeys = ref([])
const route = useRoute()
const router = useRouter()

const setMenuKeys = (r: RouteLocationNormalized) => {
  set(openKeys, r.matched.length >= 2 ? [r.matched.slice(-2, -1)[0].path] : [])
  set(selectedKeys, [r.meta?.activeMenu || r.path])
}

const handleGoRouter = (e) => {
  const { key } = e
  router.push(key)
}

watch(() => route, setMenuKeys, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible class="scrollbar">
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="dark"
      mode="inline"
      @click="handleGoRouter"
    >
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta?.isHidden">
          <template v-if="!item.children">
            <a-menu-item v-if="!item.meta?.isHidden" :key="item.path">
              <template #icon>
                <!--              <component :is="item.meta.icon" /> -->
              </template>
              {{ item.meta?.title }}
            </a-menu-item>
          </template>
          <template v-else>
            <LayoutSubMenu :menu-list="item" />
          </template>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.logo{
  height: 32px;
  background: rgba(255,255,255,.3);
  margin: 16px;
  color: #fff;
  text-align: center;
  line-height: 32px;
  font-size: 18px;
}
</style>
