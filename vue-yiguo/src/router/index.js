import Vue from 'vue';

import Main from '../pages/Main.vue'

//登录组件
import Login from '../pages/login/index.vue'
//注册组件
import Reg from '../pages/reg/index.vue'
//home组件
import Home from '../pages/home/index.vue'
import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'

import Order from '../pages/Order.vue'
import Goods from '../pages/Goods.vue'
import NotFound from '../pages/NotFound.vue'

// 1. 引入Vue-Router
import VueRouter from 'vue-router'



// 2. 使用VueRouter
Vue.use(VueRouter)

// 3. 实例化并配置参数
const router = new VueRouter({
    // mode: 'history', // 一般上线后改为history路由(需要额外配置服务器)
    routes: [{
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
            children: [{
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
                            name: 'ussrEdit',
                            path: 'edit/:id',
                            component: UserEdit
                        }
                    ]
                },
                {
                    path: '/order',
                    component: Order
                },
                {
                    path: '/goods',
                    component: Goods
                }
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