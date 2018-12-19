import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // component: () => import('@/views/Login.vue')
  }
]
