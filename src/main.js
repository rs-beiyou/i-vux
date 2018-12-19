import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './storage'
import request from './request'
import AlertPlugin from 'vux/src/plugins/alert/index.js'
import './index.less'
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.config.productionTip = false

Vue.use(AlertPlugin)

Vue.prototype.$storage = storage
Vue.prototype.$http = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
