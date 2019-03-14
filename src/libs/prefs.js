/**
 * @description 移动端存储方案
 * @class Preferences
 */
class Preferences {
  set (key, value) {
    var prefs = window.plugins.appPreferences
    if (prefs) {
      // 如果是对象类型，将数据以 json 字符串形式存储，否则，直接存储
      var str = value
      if (value instanceof Object) {
        str = JSON.stringify(value)
      }
      prefs.store(null, null, key, str)
    }
  }
  get (callback, key) {
    var prefs = window.plugins.appPreferences
    if (prefs) {
      prefs.fetch(callback, null, key)
    }
  }
}
let prefs = new Preferences()

export default prefs
