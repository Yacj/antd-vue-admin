import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'App',
  state: () => ({
    collapsed: false,
    isMobile: false,
  }),
  getters: {
  },
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
  },
})
