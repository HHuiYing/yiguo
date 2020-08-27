<template>
  <div class="loginWrap">
    <div class="login-form">
      <h1 class="reg-style">易购生鲜后台管理系统</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="vcode">
          <el-input type="numble" class="v-cation" v-model="ruleForm.vcode"></el-input>
          <el-button v-html="verificationCode" @click="getVcode" class="vcodeBtn"></el-button>
        </el-form-item>
        <el-form-item prop="keep">
          <el-checkbox v-model="ruleForm.checked" @change="noLogin">7天免登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="float:left">登录</el-button>
          <div @click="gotoReg" class="goReg" style="float:left">没有账号？快去注册吧</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//import usersApi from "@/api/usersApi"; //引入接口
//import { setToken, setUser } from "@/utils/auth"; //引入cookie设置的相关方法
export default {
  data() {
    //验证码
    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      verificationCode: "", //验证码点击按钮
      ruleForm: {
        username: "",
        password: "",
        vcode: "", //验证码输入框
        checked: false,
      },
      //正则校验
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        vcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { validator: checkCode, trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  methods: {
    async getVcode() {
      const { data } = await this.$request.get("/vcode", {
        withCredentials: true,
      });
      // const result = await fetch(`http://10.3.138.12:2003/api/vcode`, {
      //   credentials: "include",
      // }).then((res) => res.json());

      if (data.code === 1) {
        this.verificationCode = data.data;
      }
    },
    submitForm() {
      // let formName
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          //验证通过，可以发送请求
          //       let psw = this.$md5(this.ruleForm.password);
          //   let payload = {
          //     username: this.ruleForm.name,
          //     password: this.ruleForm.password,
          //     keep: this.ruleForm.checked,
          //     code: this.ruleForm.vcode
          //   };
          //   this.$store.dispatch("login", payload);
          // } else {
          //   // console.log("error submit!!");
          //   this.$message({
          //     message: "服务器问题",
          //     type: "error"
          //   });
          //   return false;

          let name = this.ruleForm.username;
          let psd = this.ruleForm.password;
          let code = this.ruleForm.vcode;
          let mdl = this.ruleForm.checked;
          const { data } = await this.$request.get("/login", {
            params: {
              username: name,
              password: psd,
              vcode: code,
              mdl: mdl,
            },
            withCredentials: true,
          });
          // const result = await fetch(
          //   `http://10.3.138.12:2003/api/login?username=${name}&password=${psd}&vcode=${code}&mdl=${mdl}`,
          //   { credentials: "include" }
          // ).then((res) => res.json());
          if (data.code === 0) {
            this.$message({
              message: "账号密码错误",
              type: "error",
            });
          } else if (data.code === 10) {
            this.$message({
              message: "验证码错误",
              type: "error",
            });
          } else {
            // 登录成功
            localStorage.setItem("currentUser", JSON.stringify(data.data));
            this.$message({
              message: "登录成功",
              type: "success",
            });
            this.$router.push("/home");
          }
        }
      });
    },
    //跳转到注册页面
    gotoReg() {
      this.$router.push("/reg");
    },
    //  免登录
    noLogin() {
      if (this.ruleForm.checked) {
        this.$message({
          message: "请不要再公共场合使用该功能",
          type: "warning",
        });
      }
    },
  },

  //监听
  // watch: {
  //   ruleForm: {
  //     //深度监听
  //     deep: true,
  //     handler: function (val) {
  //       //保留7天免登录的提示框
  //       if (val.checked) {
  //         this.$message({
  //           message: "请不要再公共场合使用该功能",
  //           type: "warning",
  //         });
  //       }
  //     },
  //   },
  // },

  created() {
    //验证码
    this.getVcode();
    console.log(111);
    const authorization = localStorage.getItem("currentUser");
    if(authorization){
      this.$router.push('/home')
    }
  },
};
</script>
<style scoped lang="scss">
.loginWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../../public/image/bg.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.login-form {
  width: 600px;
  margin: 150px auto;
  background: rgba($color: #fff, $alpha: 0.5);
  padding: 30px;
  padding-right: 70px;
  border-radius: 5px;
  .v-cation {
    width: 60%;
    margin-right: 20px;
    float: left;
    line-height: 40px;
  }
  .vcodeBtn {
    padding: 0;
    margin: 0;
    float: left;
    border: none;
    height: 40px;
  }
  .goReg {
    margin-left: 10px;
    cursor: pointer;
    color: royalblue;
  }
}
.reg-style {
  text-align: center;
  padding-bottom: 20px;
}
</style>