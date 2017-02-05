/**
 * Created by caiyu on 2017/1/22.
 */
import {
  UPDATE_ERROR
} from '../mutations-type'

let state = {
  error: {}
}

const mutations = {
  [UPDATE_ERROR] (state, error) {
    state.error = error
  }
}

export default {
  state,
  mutations
}
