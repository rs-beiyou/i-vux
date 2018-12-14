import { getCars } from '@/api/cars'
export default {
  actions: {
    getCars ({ commit }, { number }) {
      return new Promise((resolve, reject) => {
        getCars({ number }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
