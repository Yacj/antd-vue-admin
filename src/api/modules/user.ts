import request from '@/api'

export const userService = {
  login: (params: Object) => {
    return request.post('/login', params)
  },
}
