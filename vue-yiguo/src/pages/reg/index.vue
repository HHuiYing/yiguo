<template>
  <!-- 注册页组件 -->
  <div class="loginWrap">
    <div class="login-form">
      <h1 class="reg-style">注册</h1>
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
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="float:left">注册</el-button>
          <div @click="gotoReg" class="goReg" style="float:left">已有账号？快去登录吧</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import usersApi from '@/api/usersApi'  //引入接口
export default {
  data() {
    //自定义规则
    let validateName = (rule, value, callback) =>{
      /*
      * value:该表单的value值
      * callback：回调函数，返回提示信息
      */
     usersApi.checkName(value).then(res =>{
       if(res.flag){
         //可以注册
         callback();
       }else{
         //已存在，不可以注册
         callback(new Error('该用户名已存在'));
       }
     })
    //  .catch(err =>{
    //      callback(new Error("服务器繁忙,请稍后再试"));
    //  })
    }
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      //正则校验
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator:validateName, trigger: "blur",},
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid =>{
        if(valid){
          //发送ajax
          try{
            let psw = this.$md5(this.ruleForm.password);
            // console.log(psw);
            let p = await usersApi.reg(this.ruleForm.name, psw);
            // console.log(p.data);
            if (p.data.flag) {
              //注册成功
              this.$message({
                message: "注册成功",
                type: "success"
              });
              //注册成功，跳转到登陆页面
              this.$router.push({
                path: "/login",
                query: { name: this.ruleForm.name }
              });
            } else {
              //注册失败
              this.$message({
                message: "注册失败",
                type: "error"
              });
            }
          }catch(err){
            // console.log(err);
            this.$message({
              message: "服务器异常",
              type: "error"
            });
          }
        }
      })
    },
    //跳转到登录页面
    gotoReg() {
      this.$router.push("/login");
    },
  },
  //监听
  watch: {
    ruleForm: {
      //深度监听
      deep: true,
      handler: function (val) {
        //保留7天免登录的提示框
        if (val.checked) {
          this.$message({
            message: "请不要再公共场合使用该功能",
            type: "warning",
          });
        }
      },
    },
  },
  created(){
    //验证用户
    // usersApi.checkName("").then(res => {
    //   console.log(res);
    // });
  }
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