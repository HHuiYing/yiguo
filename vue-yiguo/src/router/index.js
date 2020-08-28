import Vue from 'vue';

import Main from '../pages/Main.vue'

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

//订单组件
import Order from '../pages/Order.vue'
import Goods from '../pages/goods/Goods.vue'
import NotFound from '../pages/NotFound.vue'

// 商品列表组件
import Binxian from '../pages/goods/Binxian.vue'
import Haixian from '../pages/goods/Haixian.vue'
import Liaoli from '../pages/goods/Liaoli.vue'
import Longxia from '../pages/goods/Longxia.vue'
import Shuican from '../pages/goods/Shuican.vue'
import zhongbang from '../pages/goods/Zhongbang.vue'


// 1. 引入Vue-Router
import VueRouter from 'vue-router'
// import usersApi from '../api/usersApi';


Vue.use(VueRouter); //2.使用router

//3.router实例化配置参数
const router = new VueRouter({
    routes: [{
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
            children: [
                // mode: 'history', // 一般上线后改为history路由(需要额外配置服务器)
                {
                    path: '/', // /->/main
                    redirect: '/main'
                },
                {
                    path: '/main',
                    component: Main
                },
                {
                    path: '/user',
                    component: User,
                    children: [
                        // 进入用户管理页面直接跳转到用户列表
                        {
                            path: '',
                            redirect: 'list'
                        }, {
                            path: 'add',
                            component: UserAdd
                        }, {
                            path: 'list',
                            component: UserList
                        }, {
                            name: 'userEdit',
                            path: 'edit/:id',
                            component: UserEdit
                        }
                    ]
                },
                {
                    path: '/order',
                    component: Order,
                },
                {
                    path: '/goods',
                    component: Goods,
                    children: [
                        // 商品页面的子组件
                        {
                            path: '',
                            redirect: 'binxian'
                        }, {
                            path: 'binxian',
                            component: Binxian
                        }, {
                            path: 'haixian',
                            component: Haixian
                        }, {
                            path: 'liaoli',
                            component: Liaoli
                        }, {
                            path: 'longxia',
                            component: Longxia
                        }, {
                            path: 'shuican',
                            component: Shuican
                        }, {
                            path: 'zhongbang',
                            component: zhongbang
                        }
                    ]
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                    children: [{
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
        {
            path: '/404',
            component: NotFound
        },
        // 404页面效果
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

export default router;
console.log('router=', router);