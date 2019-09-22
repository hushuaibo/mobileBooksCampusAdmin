import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../page/user/user'
Vue.use(VueRouter);
export default new VueRouter({
  routes:[
    {
      path:'/user',
      component:User,
    },
    {
      path:'/',
      redirect:'user'
    }
  ]
})
