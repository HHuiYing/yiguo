<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <img src="http://static01.yiguo.com/www/images/header/logo.png" alt /> 易果生鲜管理系统
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-button type="text">注册</el-button>
          <el-button type="text">登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          @select="changeMenu"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <el-submenu :key="item.path" :index="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>
              <el-menu-item
                :key="sub.path"
                :index="item.path+sub.path"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding:15px 0;">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/home",
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/list",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "冰鲜",
              path: "/add",
            },
            {
              text: "海鲜",
              path: "/list",
            },
            {
              text: "料理食材",
              path: "/add",
            },
            {
              text: "龙虾",
              path: "/list",
            },
            {
              text: "水产",
              path: "/add",
            },
            {
              text: "重磅推荐",
              path: "/list",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
        },
      ],
    };
  },
  methods: {
    goto(path, idx) {
      console.log(this.$router);
      this.$router.push(path);
      this.currentIndex = idx;
    },
    back() {
      this.$$router.back();
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
  },
  components: {},
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
  line-height: 100%;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

.header {
  line-height: 60px;
  color: #fff;
  background-color: #e0e0e0;
  .logo {
    font-size: 24px;
    color: #008842;
    img {
      font-size: 40px;
      vertical-align: middle;
      margin: 5px;
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
.el-container {
  height: 100%;
}
</style>
