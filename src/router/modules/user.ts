export default {
  path: '/user',
  name: 'User',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '用户管理',
    isHidden: true,
  },
  redirect: '/user/index',
  children: [
    {
      path: 'index',
      name: 'UserIndex',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户列表',
      },
    },
  ],
}
