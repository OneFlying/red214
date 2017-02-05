/**
 * Created by caiyu on 2017/1/12.
 * 自定义过滤器
 */
const _filters = {}

_filters.fmtUserIco = (_imgsrc, _path) => {
  let ico = _imgsrc.replace(/_small/g, '')
  return _path + ico
}

_filters.fmtMoney = (_money) => {
  return _money.split('.')[0]
}

_filters.fmtDate = (_date) => {
  return _date.split(' ')[0]
}

_filters.fmtBirth = (_year, _month, _day) => {
  if (_month < 10) {
    _month = '0' + _month
  }
  if (_day < 10) {
    _day = '0' + _day
  }
  return _year + '-' + _month + '-' + _day
}

_filters.fmtGift = (_name, _time) => {
  return _name + ' ' + _time
}

_filters.fmtMoney = (_money) => {
  return _money.split('.')[0]
}

export default (Vue) => {
  Object.keys(_filters).forEach(key => {
    Vue.filter(key, _filters[key])
  })
}
