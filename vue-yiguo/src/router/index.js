import Vue from 'vue';

// 1. 引入Vue-Router
import VueRouter from 'vue-router' 
//登录组件
import Login from '../pages/login/index.vue'
//注册组件
import Reg from '../pages/reg/index.vue'   //不能省略.vue后缀
//import Login from '@/pages/login' //@直接指向src文件夹，如果文件夹里面是index.vue可以省略不写，但是是其他的就不能省略

Vue.use(VueRouter);    //2.使用router

//3.router实例化配置参数
const router = new VueRouter({
  routes:[
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/reg',
      name:'reg',
      component:Reg
    },
  ]
})

export default router;