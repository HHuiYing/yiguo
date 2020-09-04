import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        //  路由按需引入(路由懒加载)
        component: () => import('../views/Cart.vue')
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/goods/:id',
        name: 'Goods',
        component: () => import('../views/Goods.vue')
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('../views/List.vue')
    },
    {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/reg',
        name: 'Reg',
        component: () => import('../views/Reg.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router