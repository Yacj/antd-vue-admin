export default {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '权限管理',
  },
  children: [
    {
      path: '',
      name: 'AuthUser',
      component: () => import('@/views/auth/index.vue'),
      meta: {
        title: '权限测试',
      },
    },
  ],
}
