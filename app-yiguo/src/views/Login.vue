<template>
  <div class="loginWrap">
    <!-- 头部 -->
    <h2 class="headTop">登录</h2>
    <!-- 登录框 -->
    <div class="loginTable">
      <van-form @submit="onSubmit" :model="ruleForm">
        <van-field
          v-model="ruleForm.username"
          name="username"
          label="用户名"
          label-width="50"
          :border="false"
          :rules="[{ required: true, message: '请填写用户名' }]"
          :show-error-message="true"
        />
        <van-field
          v-model="ruleForm.password"
          type="password"
          name="password"
          label="密码"
          label-width="50"
          :border="false"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="submitBtn">
          <van-button square block hairline type="primary" native-type="submit" @click="onSend">提交</van-button>
        </div>
      </van-form>
    </div>
    <!-- 背景图片 -->
    <div class="backImg"></div>
    <!-- 协议同意 -->
    <div class="readMes">
      <van-checkbox v-model="checked" shape="square" icon-size="16px" checked-color="#07c160">
        我已阅读并同意
        <span>《易果服务协议》</span>和
        <span>《隐私条款》</span>
      </van-checkbox>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, Checkbox, Button, Field, Toast } from "vant";
Vue.use(Form);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      checked: true,
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    async onSend() {
      console.log({ ...this.ruleForm });
      const { data } = await this.$request.get("/login", {
        params: {
          ...this.ruleForm,
        },
      });
      if (data.code === 0) {
        Toast.loading({
          message: "登录失败",
          forbidClick: true,
        });
      } else {
        // 登录成功
        localStorage.setItem("currentUser", JSON.stringify(data.data));
        Toast.loading({
          message: "登录成功",
          forbidClick: true,
        });
        const { redirectTo = "/Home" } = this.$route.query;
        this.$router.replace(redirectTo);
      }
    },
    created() {
      const authorization = localStorage.getItem("currentUser");
      if (authorization) {
        this.$router.push("/Mine");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.loginWrap {
  height: 100%;
  width: 100%;
  .headTop {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #01b27a;
    font-size: 16px;
    margin: 0;
    line-height: 40px;
    text-align: center;
    &::after {
      content: "";
      width: 30px;
      border-bottom: 4px solid #01b27a;
      line-height: 0;
    }
  }
  .loginTable {
    padding: 30px 22px 0;
    .van-cell {
      height: 52px;
    }
    /deep/ .van-field__control {
      border-bottom: 1px solid #ccc;
    }
    .submitBtn {
      margin-top: 30px;
    }
  }
  .backImg {
    margin-top: 28px;
    width: 100%;
    height: 74px;
    background: url(../../public/img/greylogo.png) no-repeat center center;
    background-size: 128px 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .readMes {
    padding: 0 30px;
    font-size: 12px;
    position: absolute;
    bottom: 90px;
    span {
      color: #01b27a;
    }
  }
}
</style>