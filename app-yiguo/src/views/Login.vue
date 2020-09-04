<template>
  <div class="loginWrap">
    <!-- 头部 -->
    <h2 class="headTop">登录</h2>
    <!-- 登录框 -->
    <div class="loginTable">
      <van-form @submit="onSubmit" :model="ruleForm" :rules="rules">
        <van-field v-model="ruleForm.username" name="用户名" label="用户名" label-width="50" />
        <van-field
          v-model="ruleForm.password"
          type="password"
          name="密码"
          label="密码"
          label-width="50"
          :rules="[]"
        />
        <div class="errorMes"></div>
        <div class="submitBtn">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <!-- 背景图片 -->
    <div class="backImg"></div>
    <!-- 协议同意 -->
    <div class="readMes">
      <van-checkbox v-model="checked" shape="square"></van-checkbox>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, Checkbox, Button, Field } from "vant";
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Field);
export default {
  name: "Login",
  data() {
    return {
      checked: "",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请填写用户名" }],
        password: [{ required: true, message: "请填写密码" }],
      },
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>
<style lang="scss" scoped>
.loginWrap {
  height: 100%;
  width: 100%;
  .headTop {
    width: 100%;
    height: 40px;
    background: #01b27a;
    color: #ffffff;
    font-size: 16px;
    margin: 0;
    line-height: 40px;
    text-align: center;
  }
  .loginTable {
    padding: 26px 22px 0;
    .errorMes {
      margin: 8px 0 0;
      padding-left: 80px;
      color: red;
    }
    .van-cell {
      border-bottom: 1px solid #ccc;
    }
    .submitBtn {
      margin-top: 30px;
    }
  }
}
</style>