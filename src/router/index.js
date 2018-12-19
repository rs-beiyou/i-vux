import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { getToken } from '@/libs/utils'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

const LOGIN_PATH_NAME = 'login'
// const CONSOLE_HOME_PAGE_NAME = 'list'

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.meta && to.meta.NeedLogin) {
    next({
      name: LOGIN_PATH_NAME
    })
  } else {
    next()
  }
})

export default router
