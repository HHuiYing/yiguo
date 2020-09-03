<template>
  <div class="mineWrap" style="background:#f4f4f4">
    <!-- 头像&登录/注册&设置 -->
    <div class="mySet">
      <!-- 头像 -->
      <div class="headerImg">
        <img src="../.././public/img/touxiang.jpg" alt />
      </div>
      <!-- 登录注册 -->
      <p class="regLogin">登录/注册</p>
      <!-- 设置 -->
      <div class="topSet">
        <van-icon name="setting-o" size="20" color="#ffffff"/>
      </div>
    </div>
    <!-- 卡包 -->
    <div class="payCart"></div>
    <!-- 订单 -->
    <div class="orderCon"></div>
    <!-- 信息内容 -->
    <div class="myMessage"></div>
  </div>
</template>
<script>
export default {
  name: "Mine",
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
      padding: 27px 0 0 20px;
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
}
</style>