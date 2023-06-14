import { defineStore } from 'pinia'
import storageUtil from '@/utils/cache'
import { toLogin } from '@/utils'
import { userService } from '@/api/modules/user'

interface LoginData {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'User',
  state: () => ({
    token: storageUtil.getItem('token') || '',
    failure_times: storageUtil.getItem('failure_times') || 0,
    permission: ['test', 'admin'],
  }),
  getters: {
    isLogin(): boolean {
      let isLogin = false
      if (this.token) {
        const time = new Date().getTime()
        if (time < Number.parseInt(this.failure_times) * 1000) {
          isLogin = true
        }
        else {
          this.token = ''
          storageUtil.removeItem('token')
        }
      }
      return isLogin
    },
  },
  actions: {
    async login(data: LoginData) {
      const res = await userService.login(data)
      if (res) {
        this.token = res.token
        this.failure_times = Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60
        storageUtil.setItem('token', res.token)
        storageUtil.setItem('failure_times', Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60)
      }
    },
    logout() {
      this.token = ''
      storageUtil.removeItem('token')
      storageUtil.removeItem('failure_times')
      toLogin()
    },
  },
})
