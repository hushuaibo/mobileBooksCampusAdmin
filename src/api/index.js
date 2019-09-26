import ajax from './ajax'
const BASE_URL = '/apis';
//获取用户列表
export const reqUsers = () => ajax(BASE_URL + '/admin/user/userList');
//添加用户
export const reqUserAdd = (user) => ajax(BASE_URL+'/admin/user/userAdd',user,'post',{headers:{"Content-Type": "multipart/form-data"}});
//删除用户
export const reqUserDelete = (userId) => ajax(BASE_URL+'/admin/user/userDelete',{userId});
//修改用户信息
export const reqUserEdit = (user) =>ajax(BASE_URL+'/admin/user/userEdit',user,'post',{headers:{"Content-Type": "multipart/form-data"}});
//下载所有用户
export const reqUserDownload = () => ajax(BASE_URL+'/admin/user/download');
