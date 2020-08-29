<template>
  <div>
    <div class="userHandle">
      <h1 class="title_user">> 用户编辑</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-bind:value="ruleForm.username" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item> -->
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
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="ruleForm.birthday"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (value < 18) {
    //     // 如果输入的值不符合规则，则提示信息
    //     return callback(new Error("未满18禁止浏览"));
    //   } else {
    //     // 规则通过后的回掉
    //     callback();
    //   }
    // };
    return {
      userid: "",
      ruleForm: {
        username: "",
        //password: "",
        gender: "male",
        age: "",
        phone: "",
        address: "",
        birthday: "",
      },
      rules: {
        address: [
          { required: true, message: "地址必填", trigger: "change" },
          //   { type: "number", message: "只能输入数字", trigger: "change" },
          // 自定义校验规则
          //   {
          //     validator: checkAge,
          //     trigger: "change",
          //   },
        ],
        // password: [
        //   {
        //     min: 6,
        //     max: 12,
        //     message: "密码长度必须在 6 到 12 个字符",
        //     trigger: "blur",
        //   },
        // ],
        phone: [{ required: true, message: "手机号码必填", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          const { userid, ruleForm } = this;
          const { data } = await this.$request.put("/user/" + userid, {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
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
    console.log("Router=", this.$router);
    console.log("Route=", this.$route);
    // const { a, b } = this.$route.query;
    const { id } = this.$route.params;
    const { data } = await this.$request.get("/user/" + id);
    this.userid = id;
    Object.assign(this.ruleForm, data.data);
  },
};
</script>
<style lang="scss" scoped>
.userHandle{
    width: 70%;
}
.title_user {
  font-size: 16px;
  font-weight: normal;
  margin: 0 0 15px;
  padding-left: 5px;
}
</style>