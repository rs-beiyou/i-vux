import CordovaFileTransfer from './file'
import Vue from 'vue'
import store from '../libs/store'
import util from './util'
import storage from './storage'
import appVersionUpdate from './appVersion'

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady () {
  window.cordovaFile = new CordovaFileTransfer()
  if (util.isAndroid()) {
    // window.JPush && window.JPush.init()
    // document.addEventListener('jpush.receiveNotification', () => {
    //   store.commit('updateCount')
    // }, false)
  }
  window.cordova.getAppVersion.getVersionNumber().then(version => {
    storage.set('appVersion', String(version))
    appVersionUpdate()
  })
  document.addEventListener('backbutton', onBackKeyDown, false)
}
function onBackKeyDown (e) {
  // 防止跳转至其他 app 后，返回时多触发一次
  if (store.state.openFileFromNative) {
    store.commit('toNativeApp', false)
    return
  }
  if (
    store.state.route.name === 'first' ||
    store.state.route.name === 'login'
  ) {
    e.preventDefault()
    Vue.$vux.toast.text('再点一次退出软件', 'bottom')
    document.removeEventListener('backbutton', onBackKeyDown, false)
    document.addEventListener('backbutton', exitApp, false)
    let intervalID = window.setInterval(() => {
      window.clearInterval(intervalID)
      document.removeEventListener('backbutton', exitApp, false) // 注销返回键
      document.addEventListener('backbutton', onBackKeyDown, false) // 返回键
    }, 3000)
  } else {
    window.history.go(-1)
  }
}
function exitApp () {
  navigator.app.exitApp()
}
