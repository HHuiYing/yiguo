<template>
  <div class="mineWrap" style="background:#f4f4f4">
    <!-- 头像&登录/注册&设置 -->
    <div class="mySet">
      <!-- 头像 -->
      <div class="headerImg">
        <img :src="userImg" alt />
      </div>
      <!-- 登录注册 -->
      <p class="regLogin">
        <span v-if="isShow">
          {{loginName}}
          <van-button plain type="primary" @click="handleCommand" round size="small">退出登录</van-button>
        </span>
        <span @click="gotoLogin" v-else>登录/注册</span>
      </p>
      <!-- 设置 -->
      <div class="topSet">
        <van-icon name="setting-o" size="20" color="#ffffff" />
      </div>
    </div>
    <!-- 卡包 -->
    <ul class="payCart">
      <li>
        <span>-</span>
        <em>卡包余额</em>
      </li>
      <li>
        <span>-</span>
        <em>悠币</em>
      </li>
    </ul>
    <!-- 订单 -->
    <div class="orderCon">
      <van-grid :column-num="5" :border="false" icon-size="19px">
        <van-grid-item icon="debit-pay" text="待支付" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item class="sendCur" icon="smile-comment-o" text="评价送悠币" />
        <van-grid-item icon="peer-pay" text="在线退换货" />
        <van-grid-item icon="balance-list-o" text="全部订单 >" />
      </van-grid>
    </div>
    <!-- 信息内容 -->
    <div class="myMessage">
      <van-grid :column-num="4" :border="false" icon-size="19px">
        <van-grid-item v-for="(item,i) in menu" :key="i" :icon="item.icon" :text="item.text" />
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mine",
  data() {
    return {
      // username: "",
      //recommend: [],
      menu: [
        {
          text: "优惠券",
          icon: "coupon",
        },
        {
          text: "充值卡",
          icon: "card",
        },
        {
          text: "提货券",
          icon: "send-gift",
        },
        {
          text: "收货地址",
          icon: "location",
        },
        {
          text: "帮助中心",
          icon: "question",
        },
        {
          text: "我的团购",
          icon: "bag",
        },
        {
          text: "账户余额",
          icon: "bill",
        },
        {
          text: "在线客服",
          icon: "service",
        },
      ],
    };
  },
  computed: {
    isShow() {
      return this.$store.state.common.ifLogin;
    },
    loginName() {
      return this.$store.state.common.username;
    },
    userImg() {
      return this.$store.state.common.pictureUrl;
    },
  },
  methods: {
    //跳转到登陆页面
    gotoLogin() {
      this.$router.push("/Login");
    },
    //显示切换
    // change: function () {
    // if (result.code === 0) {
    //   this.isShow = !this.isShow;
    // } else {
    //   this.isShow = !this.isShow;
    // }
    // },

    handleCommand() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
      this.$store.commit("logout");
    },
  },
};
</script>
<style lang="scss" scoped>
.mineWrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: #f4f4f4;
  .mySet {
    width: 100%;
    height: 140px;
    background: #2dd282 url(../.././public/img/bgimg.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .headerImg {
      width: 76px;
      height: 76px;
      border-radius: 50%;
      margin: 27px 0 0 20px;
      float: left;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .regLogin {
      height: 68px;
      line-height: 68px;
      float: left;
      margin-top: 30px;
      padding-left: 16px;
      font-size: 16px;
      color: #fff;
    }
    .topSet {
      position: absolute;
      top: 10px;
      right: 16px;
    }
  }
  .payCart {
    display: flex;
    width: 100%;
    height: 30px;
    padding: 7.7px 0;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    > li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: 12px;
      > span {
        color: #0e9f4e;
      }
      > em {
        font-style: normal;
      }
    }
  }
  .orderCon {
    margin: 7px 0;
    width: 100%;
    /deep/.van-grid-item__content {
      padding: 16px 4px;
    }
  }
  .myMessage {
    .van-grid-item {
      color: #ccc;
    }
  }
}
.van-button--plain {
  background-color: transparent;
  color: #fff;
  margin-left: 10px;
}
.van-button--primary {
  border: 1px solid #fff;
}
</style>