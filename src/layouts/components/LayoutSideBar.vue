<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { set } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useAppStore } from '@/store/modules/app'
import LayoutSubMenu from '@/layouts/components/LayoutSubMenu.vue'
import { usePermissionStore } from '@/store/modules/permission'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const collapsed = computed(() => appStore.collapsed)
const title = import.meta.env.VITE_APP_TITLE
const selectedKeys = ref([])
const openKeys = ref([])
const route = useRoute()
const router = useRouter()
const theme = ref('light')
appStore.$subscribe((mutation, mode) => {
  theme.value = mode.colorScheme
})
const menuList = computed(() => {
  const list: any = permissionStore.accessRoutes
  list.sort((a, b) => {
    if (a.meta.order !== undefined && b.meta.order !== undefined) {
      return a.meta.order - b.meta.order
    }
    else if (a.meta.order !== undefined) {
      return -1
    }
    else if (b.meta.order !== undefined) {
      return 1
    }
    return 0
  })
  return list
})
function setMenuKeys(r: RouteLocationNormalized) {
  set(openKeys, r.matched.length >= 2 ? [r.matched.slice(-2, -1)[0].path] : [])
  set(selectedKeys, [r.meta?.activeMenu || r.path])
}

function handleGoRouter(e) {
  const { key } = e
  router.push(key)
}

function onBreakpoint(broken: boolean) {
  appStore.setCollapsed(broken)
}
const siderStyle = computed(() => {
  return {
    paddingTop: `${(appStore.layout !== 'side' && !appStore.isMobile) ? appStore.headerHeight : 0}px`,
    transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
    overflow: 'hidden',
  }
})
watch(() => route, setMenuKeys, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <div
    :style="{
      width: collapsed ? `${appStore.collapsedWidth}px` : `${appStore.siderWidth}px`,
      maxWidth: collapsed ? `${appStore.collapsedWidth}px` : `${appStore.siderWidth}px`,
      minWidth: collapsed ? `${appStore.collapsedWidth}px` : `${appStore.siderWidth}px`,
      ...siderStyle,
    }"
  />
  <a-layout-sider
    :style="siderStyle"
    :collapsed-width="appStore.collapsedWidth"
    :collapsed="collapsed && !appStore.isMobile"
    :trigger="null"
    collapsible
    class="scrollbar "
    :theme="theme"
    :width="appStore.siderWidth"
    @breakpoint="onBreakpoint"
  >
    <div v-if="appStore.layout === 'side'" class="logo flex space-x-2">
      <SvgIcon name="logo" size="32" />
      <span v-if="!collapsed" class="text-xl font-bold">
        {{ title }}
      </span>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :theme="theme"
      @click="handleGoRouter"
    >
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta?.isHidden">
          <template v-if="!item.children">
            <a-menu-item v-if="!item.meta?.isHidden" :key="item.path">
              <template v-if="item.meta.icon" #icon>
                <SvgIcon class="relative top-[-2px] sub-icon" :name="item.meta.icon" size="17" />
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
  margin: 16px;
  color: var(--ant-color-text-base);
  text-align: center;
  line-height: 32px;
  font-size: 18px;
}
.ant-layout-sider{
  z-index: 20;
}
.scrollbar{
  box-shadow: var(--ant-box-shadow);
  position: fixed!important;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
}
</style>
