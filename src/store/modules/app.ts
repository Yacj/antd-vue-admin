import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'App',
  state: () => ({
    collapsed: true,
    isMobile: false,
    reloadFlag: true,
    aliveKeys: {},
    mode: 'pc',
    colorScheme: 'light',
  }),
  getters: {
  },
  actions: {
    /**
     * @description 重载页面
     * @param duration
     */
    async reloadPage(duration = 0) {
      this.reloadFlag = false
      await nextTick()
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true
        }, duration)
      }
      else {
        this.reloadFlag = true
      }
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
      }, 100)
    },
    setAliveKeys(key, val) {
      this.aliveKeys[key] = val
    },
    setCollapsed(val) {
      this.collapsed = val
    },
    setMode(width: number) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.mode = 'mobile'
        this.collapsed = true
      }
      else {
        this.mode = width < 992 ? 'mobile' : 'pc'
      }
    },
    setColorScheme(val) {
      this.colorScheme = val
    },
  },
})
