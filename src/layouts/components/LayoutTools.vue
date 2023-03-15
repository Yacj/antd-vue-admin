<script setup>
import { FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
const { isFullscreen, toggle: handleFullscreen } = useFullscreen()
const reloadLoading = ref(false)
const appStore = useAppStore()
const userStore = useUserStore()
const handleReload = () => {
  reloadLoading.value = true
  appStore.reloadPage()
  setTimeout(() => {
    reloadLoading.value = false
    message.success('页面已刷新')
  }, 1000)
}
const handleLogout = () => {
  Modal.confirm({
    title: '提示',
    content: '确定要退出登录吗？',
    onOk: () => {
      userStore.logout()
    },
  })
}
</script>

<template>
  <a-space :size="16">
    <span class="text-base cursor-pointer  relative top-[5px]" @click="handleFullscreen">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
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
