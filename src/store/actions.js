import {
  RECEIVE_USER,
  RECEIVE_USERCONTENT
} from './mutation-types'
import {
  reqUsers,
  reqUserContent
} from '../api'
export default {
  async getUsers({commit}){
    const result = await reqUsers();
    if(result.code === 1){
      const users = result.users;
      commit(RECEIVE_USER,{users})
    }
  },
  async getUserContent({commit},userId){
    const result =await reqUserContent(userId);
    if(result.code===1){
      const userContent = result.user;
      commit(RECEIVE_USERCONTENT,{userContent})
    }
  }
}
