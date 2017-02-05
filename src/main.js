import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import VueTouch from 'vue-touch'

// 自定义过滤器
import filters from './filters'

// views
import Gift from './views/Gift'
import Paypal from './views/Paypal'
import Personal from './views/Personal'
import Setting from './views/Setting'
import IM from './views/IM'
import Login from './views/Login'
import Regsiter from './views/Register'
import Space from './views/Space'
import Friends from './views/Friends'

// settings
import Language from './views/setting/Language'
import Help from './views/setting/Help'
import About from './views/setting/About'
import Privacy from './views/setting/Privacy'
import ModPass from './views/setting/ModPass'

// my
import UserInfo from './views/my/UserInfo'
import Guest from './views/my/Guest'
import RecGifts from './views/my/RecGifts'
import Upgrade from './views/my/Upgrade'
import Payment from './views/my/Payment'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueTouch)
Vue.use(VueI18n)
Vue.config.devtools = true

// 国际化
const locales = {
  en: require('./i18n/en').default,
  ch: require('./i18n/ch').default,
  ft: require('./i18n/ft').default
}

const router = new VueRouter({
  transitionOnLoad: false
})

const commit = store.commit || store.dispatch

/**
 * sync router params
 */
import { sync } from 'vuex-router-sync'
import store from './vuex/store'

// 判断浏览器是否处于无痕（隐私）模式
try {
  window.localStorage.incognitoMode = 'incognitoMode'
} catch (ex) {
  window.alert('I\'m sorry, your browser is in the incognito mode, will not be able to use the function of the system' +
    ' | 很抱歉，您的瀏覽器處於無痕模式，將不能正常使用本系統的功能' +
    ' | 很抱歉，您的浏览器处于无痕模式，将不能正常使用本系统的功能')
}

// 会话缓存
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 始终缓存
let storage = window.localStorage

let language = (lang) => {
  // 获取服务器地址
  let server = store.state.base.imgsrc
  // 发送请求，Promise
  Vue.http.jsonp(server + 'mobile_language.php', {
    params: {'language_set': lang, isMobile: true},
    callback: '_callback'
  }).then((response) => {
    // 成功
    console.log(response.data)
  }, (response) => {
    // 失败
    console.log(response.data)
  })
}
// find if there are exist var locale
if (storage.getItem('locale')) {
  Vue.config.lang = storage.getItem('locale')
  commit('UPDATE_LANGUAGE', storage.getItem('locale'))
  language(storage.getItem('locale'))
} else {
  storage.setItem('locale', 'ch')
  commit('UPDATE_LANGUAGE', 'ch')
  Vue.config.lang = 'ch'
  language('ch')
}

// set locales
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

// Support locale hot updates, Only be used in development
if (module.hot) {
  module.hot.accept(['./i18n/en', './i18n/ch', './i18n/ft'], () => {
    Vue.locale('en', require('./i18n/en').default)
    Vue.locale('ft', require('./i18n/ft').default)
    Vue.locale('ch', require('./i18n/ch').default)
  })
}

/**
 * sync router loading status
 */
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 50)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

sync(store, router)

filters(Vue)

// 路由定义
router.map({
  '/': {
    component: function (resolve) {
      require(['./Home'], resolve)
    }
  },
  '/gift/:userId': {
    name: 'gift',
    component: Gift
  },
  '/paypal': {
    component: Paypal
  },
  '/friends': {
    component: Friends
  },
  '/my': {
    component: Personal
  },
  '/setting': {
    component: Setting
  },
  '/im': {
    component: IM
  },
  '/login': {
    component: Login
  },
  '/register': {
    component: Regsiter
  },
  '/setting/lang': {
    component: Language
  },
  '/setting/about': {
    component: About
  },
  '/setting/help': {
    component: Help
  },
  '/setting/privacy': {
    component: Privacy
  },
  '/setting/modify': {
    component: ModPass
  },
  '/space/:userId/:userName': {
    name: 'space',
    component: Space
  },
  '/my/userinfo': {
    component: UserInfo
  },
  '/my/guest': {
    component: Guest
  },
  '/my/recgifts': {
    component: RecGifts
  },
  '/my/upgrade': {
    component: Upgrade
  },
  '/my/payment': {
    component: Payment
  }
})

router.beforeEach(function (transition) {
  if (transition.to.path !== '/login' && transition.to.path !== '/register' &&
    transition.to.path !== '/lang' && transition.to.path !== '/show') {
    if (!storage.getItem('userinfo')) {
      router.go({
        path: '/login',
        append: false
      })
    }
  }
  if (transition.to.path !== '/my') {
    commit('UPDATE_MY', false)
  }
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    transition.next()
  }
})

router.afterEach(function (transition) {
  if (transition.to.path === '/my') {
    commit('UPDATE_MY', true)
  }
})

router.start(App, '#app')

// 注册全局变量
window.router = router
window.Vue = Vue

