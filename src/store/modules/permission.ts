import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/routes'

/**
 * @description 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param route 路由
 * @param role 用户角色
 */
function hasPermission(route, role) {
  // * 不需要权限直接返回true
  if (!route.meta?.requireAuth) {
    return true
  }

  const routeRole = route.meta?.role ? route.meta.role : []
  console.log(route)
  // * 登录用户没有角色或者路由没有设置角色判定为没有权限
  if (!role.length || !routeRole.length) {
    return false
  }

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return role.some(item => routeRole.includes(item))
}

/**
 * @description 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes 路由
 * @param role 用户角色
 */
function filterAsyncRoutes(routes, role) {
  const ret: Array<object> = []
  routes.forEach((route) => {
    if (route.children && route.children.length) {
      route.children.forEach((item) => {
        item.path = `${route.path}/${item.path}`
      })
    }
    if (hasPermission(route, role)) {
      const curRoute = {
        ...route,
        children: [],
      }
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      }
      else {
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}
export const usePermissionStore = defineStore({
  id: 'Permission',
  state: () => ({
    accessRoutes: [],
    isGenerateRoutes: false,
    sidePath: [],
  }),
  getters: {},
  actions: {
    async generateRoutes(role: string[]) {
      const getAccessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.isGenerateRoutes = true
      this.accessRoutes = getAccessRoutes
    },
    setSidePath(path: string[]) {
      this.sidePath = path
    },
    resetPermission() {
      this.$reset()
    },
  },
})
