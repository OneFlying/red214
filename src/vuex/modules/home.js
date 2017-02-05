/**
 * Created by caiyu on 2017/1/12.
 * 推荐用户列表
 */
import {
  UPDATE_USERLIST,
  UPDATE_MYPALS,
  RESET_USERLIST,
  CHECK_FIRSTLOADING
} from '../mutations-type'

let state = {
  userList: [],
  mypals: '',
  firstloading: true
}

const mutations = {
  [UPDATE_USERLIST] (state, userList) {
    state.userList = state.userList.concat(userList)
  },
  [UPDATE_MYPALS] (state, mypals) {
    state.mypals = mypals
  },
  [RESET_USERLIST] (state) {
    state.userList = []
  },
  [CHECK_FIRSTLOADING] (state, loading) {
    state.firstloading = loading
  }
}

export default {
  state,
  mutations
}

