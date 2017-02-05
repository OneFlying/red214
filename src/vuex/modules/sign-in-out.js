/**
 * Created by caiyu on 2017/1/10.
 */
import {
  UPDATE_USERINFO
} from '../mutations-type'

let state = {
  userinfo: {}
}

const mutations = {
  [UPDATE_USERINFO] (state, userinfo) {
    state.userinfo = userinfo
  }
}

export default {
  state,
  mutations
}
