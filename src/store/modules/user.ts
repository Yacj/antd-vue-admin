import { defineStore } from 'pinia'
import { toLogin } from '@/utils'
import { cache } from '@/utils/cache'
import { userService } from '@/api/modules/user'

interface LoginData {
  username: string
  password: string
}

export const useUserStore = defineStore({
  id: 'User',
  state: () => ({
    token: cache.get('token') || '',
    failure_times: cache.get('failure_times') || 0,
    permission: ['test', 'admin'],
  }),
  getters: {
    isLogin(): boolean {
      let isLogin = false
      if (this.token) {
        const time = new Date().getTime()
        if (time < parseInt(this.failure_times) * 1000) {
          isLogin = true
        }
        else {
          this.token = ''
          cache.remove('token')
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
        cache.set('token', res.token)
        cache.set('failure_times', Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60)
      }
    },
    logout() {
      this.token = ''
      cache.remove('token')
      cache.remove('failure_times')
      toLogin()
    },
  },
})
