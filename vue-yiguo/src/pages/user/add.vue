<template>
  <div>
    <div class="userHandle">
      <h1 class="title_user">> 用户添加</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="ruleForm.gender">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
            <el-option label="保密" value="baomi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm">添加</el-button>
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
     
       if(res.data.code){
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
      userid: "",
      ruleForm: {
        username: "",
        password: "",
        gender: "male",
        age: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名必填", trigger: "change" },
          { validator:validateName, trigger: "blur",},
        ],
        gender: [{ required: true, message: "性别必填", trigger: "change" }],
        age: [
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度必须在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //添加用户
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
         
          const { ruleForm } = this;
           console.log({...ruleForm})
          const { data } = await this.$request.post("/user" , {
            ...ruleForm,
            //username:1111
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.$router.push("list");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    // const { a, b } = this.$route.query;
    // const { id } = this.$route.params;
    // const { data } = await this.$request.post("/user/" + id);
    // this.userid = id;
    // Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss" scoped>
.userHandle {
  width: 70%;
}
.title_user {
  font-size: 16px;
  font-weight: normal;
  margin: 0 0 15px;
  padding-left: 5px;
}
</style>