/**
 * Created by caiyu on 2017/1/10.
 */
import {
  UPDATE_DIRECTION,
  UPDATE_LOADING,
  UPDATE_GOTO,
  UPDATE_MY,
  UPDATE_LANGUAGE,
  UPDATE_TITLE,
  UPDATE_BALANCE,
  UPDATE_GROUP
} from '../mutations-type'

let state = {
  isLoading: false,
  direction: 'forward',
  isMy: false,
  server: 'http://192.168.1.103:800/mobile.php',
  imgsrc: 'http://192.168.1.103:800/',
  im: 'http://192.168.1.103:800/im/mobile.php',
  lang: 'en',
  title: {},
  balance: 0,
  group: {},
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'access-control-allow-headers, access-control-allow-methods, access-control-allow-origin, content-type, xhr'
  }
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  },
  [UPDATE_MY] (state, my) {
    state.isMy = my
  },
  [UPDATE_GOTO] (state, goto) {
    state.isGoto = goto
  },
  [UPDATE_LANGUAGE] (state, lang) {
    state.lang = lang
  },
  [UPDATE_TITLE] (state, title) {
    state.title = title
  },
  [UPDATE_BALANCE] (state, balance) {
    state.balance = balance
  },
  [UPDATE_GROUP] (state, group) {
    state.group = group
  }
}

export default {
  state,
  mutations
}
