/**
 * Created by caiyu on 2017/1/10.
 */
// 通用
export const setLanguage = ({ dispatch }, lang) => {
  dispatch('UPDATE_LANGUAGE', lang)
}
export const setTitle = ({ dispatch }) => {
  let title = require('../mock/base')
  dispatch('UPDATE_TITLE', title)
}
export const setDirection = ({ dispatch }, status) => {
  dispatch('UPDATE_DIRECTION', status)
}
export const setLoading = ({ dispatch }, status) => {
  dispatch('UPDATE_LOADING', status)
}
export const setBalance = ({ dispatch }, balance) => {
  dispatch('UPDATE_BALANCE', balance)
}
export const setGroup = ({ dispatch }, lang) => {
  let group = require('../mock/friends')[lang]['group']
  dispatch('UPDATE_GROUP', group)
}

// ERROR
export const setError = ({ dispatch }) => {
  let error = require('../mock/error')
  dispatch('UPDATE_ERROR', error)
}

// 登录与注册
export const setUserInfo = ({ dispatch }, userinfo) => {
  dispatch('UPDATE_USERINFO', userinfo)
}

// 首页
export const setUserList = ({ dispatch }, userlist) => {
  dispatch('UPDATE_USERLIST', userlist)
}
export const setMyPals = ({ dispatch }, mypals) => {
  dispatch('UPDATE_MYPALS', mypals)
}
export const resetUserList = ({ dispatch }) => {
  dispatch('RESET_USERLIST')
}
export const setFirstLoading = ({ dispatch }, loading) => {
  dispatch('CHECK_FIRSTLOADING', loading)
}
