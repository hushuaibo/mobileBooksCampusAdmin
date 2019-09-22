import {
  RECEIVE_USER
} from './mutation-types'
import {
  reqUsers
} from '../api'
export default {
  async getUsers({commit}){
    const result = await reqUsers();
    if(result.code === 1){
      const users = result.users;
      commit(RECEIVE_USER,{users})
    }
  }
}
