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

const selectedKeys = ref([])
const openKeys = ref([])
const route = useRoute()
const router = useRouter()

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

watch(() => route, setMenuKeys, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    breakpoint="lg"
    :collapsed-width="appStore.mode === 'pc' ? 80 : 0"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="scrollbar shadow-md"
    theme="light"
    @breakpoint="onBreakpoint"
  >
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      @click="handleGoRouter"
    >
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta?.isHidden">
          <template v-if="!item.children">
            <a-menu-item v-if="!item.meta?.isHidden" :key="item.path">
              <template v-if="item.meta.icon" #icon>
                <SvgIcon class="relative top-[-2px] sub-icon"  :name="item.meta.icon" size="17" />
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
.ant-layout-sider{
  z-index: 20;
}
</style>
