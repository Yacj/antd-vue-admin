<script setup lang="ts">
import { FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'

const { isFullscreen, toggle: handleFullscreen } = useFullscreen()
const reloadLoading = ref(false)
const appStore = useAppStore()
const userStore = useUserStore()
function handleReload() {
  reloadLoading.value = true
  appStore.reloadPage()
  setTimeout(() => {
    reloadLoading.value = false
    message.success('页面已刷新')
  }, 1000)
}
function handleLogout() {
  Modal.confirm({
    title: '提示',
    content: '确定要退出登录吗？',
    onOk: () => {
      userStore.logout()
    },
  })
}

function handleToggleTheme(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  let isDark: boolean
  const documentStartViewTransition = document.startViewTransition
  const { colorScheme } = appStore
  const storeSetTheme = () => {
    if (colorScheme === 'dark') {
      appStore.setColorScheme('light')
    }
    else {
      appStore.setColorScheme('dark')
    }
  }
  if (documentStartViewTransition) {
    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      isDark = root.classList.contains('dark')
      root.classList.remove(isDark ? 'dark' : 'light')
      root.classList.add(isDark ? 'light' : 'dark')
    })
    transition.ready.then(() => {
      const clipPath = [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
      storeSetTheme()
    })
  }
  else {
    storeSetTheme()
  }
}
</script>

<template>
  <a-space :size="16">
    <span class="text-base cursor-pointer  relative top-[5px]" @click="handleFullscreen">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </span>
    <span class="text-base cursor-pointer  relative top-[5px]" @click="handleToggleTheme">
      <SvgIcon v-show="appStore.colorScheme === 'light'" name="ep:sunny" class="w-5 h-5" />
      <SvgIcon v-show="appStore.colorScheme === 'dark'" name="ep:moon" class="w-5 h-5" />
    </span>
    <span class="text-base cursor-pointer relative top-[5px]" @click="handleReload">
      <ReloadOutlined
        :class="{
          'animate-spin': reloadLoading,
        }"
      />
    </span>
    <a-dropdown placement="bottom">
      <a-avatar class="mb-2 mr-2">
        USER
      </a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <UserOutlined class="mr-2" />
            <router-link to="/user/index">
              个人中心
            </router-link>
          </a-menu-item>
          <a-menu-item class="mt-5" @click="handleLogout">
            <LogoutOutlined class="mr-3" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-space>
</template>

<style lang="scss" scoped>

</style>
