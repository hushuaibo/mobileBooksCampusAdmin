import {
  RECEIVE_USER,
  RECEIVE_USERCONTENT
} from './mutation-types'

export default {
  [RECEIVE_USER](state,{users}){
    state.users = users
  },
  [RECEIVE_USERCONTENT](state,{userContent}){
    state.userContent = userContent
  }
}
