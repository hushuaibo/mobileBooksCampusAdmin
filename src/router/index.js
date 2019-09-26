import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../page/user/user'
import userAdd from '../page/user/userAdd'
import userEdit from '../page/user/userEdit'
Vue.use(VueRouter);
export default new VueRouter({
  routes:[
    {
      path:'/user',
      component:User,
    },
    {
      path:'/user/add',
      component: userAdd
    },
    {
      path:'/user/edit',
      component: userEdit
    },
    {
      path:'/',
      redirect:'user'
    },
  ]
})
