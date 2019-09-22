import {
  RECEIVE_USER
} from './mutation-types'

export default {
  [RECEIVE_USER](state, {users}){
    state.users = users
  }
}
