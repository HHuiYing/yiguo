import Vue from 'vue';

//登录组件
import Login from '../pages/login/index.vue'
//注册组件
import Reg from '../pages/reg/index.vue'
//home组件
import Home from '../pages/home/index.vue'
//用户组件
import User from '../pages/user/index.vue'
import UserAdd from '../pages/user/add.vue'
import UserList from '../pages/user/list.vue'
import UserEdit from '../pages/user/edit.vue'
//不能省略.vue后缀
//import Login from '@/pages/login' //@直接指向src文件夹，如果文件夹里面是index.vue可以省略不写，但是是其他的就不能省略
// 1. 引入Vue-Router
import VueRouter from 'vue-router'
// import usersApi from '../api/usersApi';


Vue.use(VueRouter);    //2.使用router

//3.router实例化配置参数
const router = new VueRouter({
  routes: [
    {
      path: '/', // /->/home
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/user',
          name: 'user',
          component: User,
          children: [
            {
              path: '',
              redirect: 'list'
            },
            {
              path: 'add',
              name: 'add',
              component: UserAdd,
            },
            {
              path: 'list',
              name: 'list',
              component: UserList,
            },
            {
              path: 'edit/',
              name: 'edit',
              component: UserEdit,
            },
          ]
        },
      ]
    },
    
    // 404页面效果
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

export default router;