import { getBrand, getSeries, getPrice } from '@/api/sys'
export default {
  actions: {
    getBrand () {
      return new Promise((resolve, reject) => {
        getBrand().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSeries () {
      return new Promise((resolve, reject) => {
        getSeries().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPrice () {
      return new Promise((resolve, reject) => {
        getPrice().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
