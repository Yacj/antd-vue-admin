import router from '@/router'
/**
 * @description 设置页面标题
 * @param titleText 标题文本
 */
export function setPageTitle(titleText: string | unknown) {
  window.document.title = `${titleText ? ` ${titleText} - ` : ''}${import.meta.env.VITE_APP_TITLE}`
}
/**
 * @description 跳转到登录页
 */
export function toLogin() {
  const currentRoute = unref(router.currentRoute)
  const needRedirect = !currentRoute.meta.requireAuth && !['/404', '/login'].includes(router.currentRoute.value.path)
  router.replace({
    path: '/login',
    query: needRedirect ? { ...currentRoute.query, redirect: currentRoute.path } : {},
  })
}
