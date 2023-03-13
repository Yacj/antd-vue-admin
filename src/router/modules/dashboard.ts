export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '首页',
    icon: 'sider_home',
  },
  redirect: '/dashboard/index',
  children: [
    {
      path: 'index',
      name: 'DashboardIndex',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '控制台',
      },
    },
    {
      path: 'detail',
      name: 'DashboardDetail',
      component: () => import('@/views/dashboard/detail.vue'),
      meta: {
        title: '详情',
        isHidden: true,
        activeMenu: '/dashboard/index',
      },
    },
    {
      path: 'list',
      name: 'DashboardList',
      component: () => import('@/views/dashboard/list.vue'),
      meta: {
        title: '列表',
      },
    },
  ],
}
