import ajax from './ajax'
const BASE_URL = '/apis';
//获取用户列表
export const reqUsers = () => ajax(BASE_URL + '/admin/user/userList');
