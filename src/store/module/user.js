import Storage from '@/storage'
import { login, logout } from '@/api/user'

import { setToken, getToken } from '@/libs/utils'

export default {
  state: {
    userId: Storage.get('userId'),
    userName: Storage.get('userName'),
    token: getToken()
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserName (state, userName) {
      state.userName = userName
      Storage.set('userName', userName)
    },
    setUserId (state, userId) {
      state.userId = userId
      Storage.set('userId', userId)
    }
  },
  actions: {
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          commit('setToken', res.token)
          commit('setUserName', res.userName)
          commit('setUserId', res.userId)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setUserName', '')
          commit('setUserId', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
