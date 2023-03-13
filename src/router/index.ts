import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import { setPageTitle } from '@/utils'
import { constantRoutes } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (userStore.isLogin) {
    if (permissionStore.isGenerateRoutes) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      }
      else {
        next()
      }
    }
    else {
      await permissionStore.generateRoutes(userStore.permission)
      const accessRoutes = permissionStore.accessRoutes
      accessRoutes.forEach((route: any) => {
        !router.hasRoute(route.name) && router.addRoute(route)
      })
      next({ path: to.path, query: to.query, replace: true })
    }
  }
  else {
    if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  const title = to.meta.title || to.name
  setPageTitle(title)
  NProgress.done()
})
export default router
