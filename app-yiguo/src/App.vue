<template>
  <div id="app">
    <router-view />
    <div style="height:50px"></div>
    <van-tabbar v-model="active" route v-show="showTabbar">
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in menu"
        :key="item.name"
        :name="item.name"
        :to="item.path"
        :badge="item.name === 'cart' ? cartlist:''"
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
    cartlist() {
      return this.$store.state.cart.goodslist.length;
    },
  },
  async created() {
    this.$store.dispatch("getCart");
    // let currentUser = localStorage.getItem("currentUser");
    // currentUser = JSON.parse(currentUser);
    // if (!currentUser) {
    //   // this.$router.push("/login");
    // } else {
    //   // 校验token的有效性
    //   const { data } = await this.$request.get(
    //     `/jwtverify?authorization=${currentUser.authorization}`
    //   );

    //   if (data.code === 0) {
    //     localStorage.removeItem("currentUser");
    //     // this.$router.push("/login");
    //   } else {
    //     // 显示用户信息
    //     this.$store.commit("user", currentUser.username);
    //   }
    // }
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
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
