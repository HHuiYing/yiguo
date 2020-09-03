<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :name="item.name"
        :to="item.path"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Image as VanImage } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
export default {
  data() {
    return {
      active: "home",
      menu: [
        {
          name: "home",
          text: "首页",
          path: "/home",
          icon: "wap-home-o",
        },
        {
          name: "list",
          text: "分类",
          path: "/list",
          icon: "apps-o",
        },
        {
          name: "cart",
          text: "购物车",
          path: "/cart",
          icon: "cart-o",
        },
        {
          name: "mine",
          text: "我的易果",
          path: "/mine",
          icon: "contact",
        },
      ],
    };
  },
};
</script>
