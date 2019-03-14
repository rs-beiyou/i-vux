export default function (fmt, date, isIosFormat) {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    if (date.indexOf('.') > -1) {
      // 有些日期接口返回带有.0。
      date = date.substring(0, date.indexOf('.'))
    }
    // 解决IOS上无法从dateStr parse 到Date类型问题
    var da = new Date(isIosFormat ? date : date.replace(/-/g, '/'))
  }
  // var da = date ? new Date(date.replace(/-/g, '/').replace(/\..*$/g, '')) : new Date()
  // var da = new Date(date)
  var o = {
    'M+': da.getMonth() + 1,
    'd+': da.getDate(),
    'h+': da.getHours(),
    'm+': da.getMinutes(),
    's+': da.getSeconds(),
    'q+': Math.floor((da.getMonth() + 3) / 3),
    S: da.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (da.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
