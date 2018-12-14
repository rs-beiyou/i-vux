import Home from '@/views/Home.vue'

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/car',
    component: Home,
    children: [{
      path: '/car',
      name: 'car',
      component: () => import('@/views/custom/Cars.vue')
    }, {
      path: '/car/:id',
      name: 'carDetail',
      component: () => import('@/views/custom/CarDetail.vue')
    }, {
      path: '/console',
      name: 'console',
      redirect: '/console/home',
      component: () => import('@/views/admin/Console.vue'),
      children: [{
        path: '/console/home',
        name: 'list',
        meta: {
          NeedLogin: true
        },
        component: () => import('@/views/admin/List.vue')
      }]
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]
