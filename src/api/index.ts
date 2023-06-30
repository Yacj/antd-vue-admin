import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'
import { message as Message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean
}

interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

const service = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})
service.interceptors.request.use(
  (config) => {
    NProgress.start()
    const userStore = useUserStore()
    const token = userStore.token
    if (token) { config.headers!.token = token }

    return config
  },
  (error) => {
    const message = error.message || '请求错误'
    Message.error(message)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    const { code } = data
    if (typeof code !== 'undefined' && code !== 200) { return Promise.reject(new Error('Error')) }

    NProgress.done()
    return Promise.resolve(data)
  },
  (error) => {
    NProgress.done()
    const message = error.message || '请求错误'
    Message.error(message)
    return Promise.reject(message)
  },
)

function request<T = any>(config: CustomAxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err))
  })
}

request.get = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'get',
    url,
    params,
  })

request.post = <T = any>(url: string, params?: object): Promise<T> =>
  request({
    method: 'post',
    url,
    data: params,
  })

export default request
