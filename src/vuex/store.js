/**
 * Created by caiyu on 2017/1/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 通用
import base from './modules/base'
// 注册和登录
import sign from './modules/sign-in-out'
// 首页
import home from './modules/home'
// ERROR
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    sign,
    home,
    error
  },
  strict: true
})
