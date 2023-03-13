import type { RouteRecordRaw } from 'vue-router'

const metaRouters: any = import.meta.glob('./modules/*.ts', {
  eager: true,
  import: 'default',
})
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/[...all].vue'),
  },
]
const asyncRoutes: RouteRecordRaw[] = Object.keys(metaRouters).map(key => metaRouters[key] || {})
export { constantRoutes, asyncRoutes }
