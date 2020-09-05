<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route v-show="showTabbar">
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
import { Tabbar, TabbarItem, Image as VanImage, Button, Icon } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
Vue.use(Button);
Vue.use(Icon);

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
  computed: {
    showTabbar() {
      return this.$store.state.common.showTabbar;
    },
  },
  created() {
    this.$store.dispatch("getCart");
    this.$store.commit('login')
    // console.log(this.$store)
  },
};
</script>

<style lang="scss">
.goback {
  background: url(../public/img/goback.png) center/34px 34px;
  display: block;
  width: 34px;
  height: 34px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}
i,
b {
  font-style: normal;
  font-weight: normal;
}
</style>
