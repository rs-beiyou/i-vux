import Vue from 'vue'
import store from './store'
import util from './util'
import storage from './storage'
import CordovaFileTransfer from './file'

const isIos = util.isIOS()

const start = function () {
  store.commit('toogleAppUpdate')
}

const progress = function (percent) {
  store.commit('appProgress', percent)
}

const success = null

const error = function () {
  Vue.$vux.toast.show({
    position: 'middle',
    type: 'warn',
    text: '下载失败'
  })
}

const complete = function () {
  store.commit('toogleAppUpdate')
}

export default function appVersionUpdate (initiative) {
  Vue.prototype.$http
    .post('/extTtSoftwareVersion/getLatestVersion.action', {
      uid: store.state.uid,
      app_type: isIos ? 2 : 1
    })
    .then(res => {
      const version = parseInt(res.obj.name.replace(/\./g, ''))
      const localVersion = parseInt(
        storage.get('appVersion').replace(/\./g, '')
      )
      if (version > localVersion) {
        Vue.$vux.confirm.show({
          title: '版本更新',
          content: '发现新的版本，现在更新吗？',
          onConfirm () {
            if (isIos) {
              window.open(encodeURI(res.obj.url), '_system', 'location=yes')
            } else {
              const fileObj = window.cordovaFile || new CordovaFileTransfer()
              fileObj.download(
                res.obj.url,
                start,
                progress,
                success,
                error,
                complete
              )
            }
          }
        })
      } else {
        initiative && Vue.$vux.toast.text('已是最新版本', 'bottom')
      }
    })
}
