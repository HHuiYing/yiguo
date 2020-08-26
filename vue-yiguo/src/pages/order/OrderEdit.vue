<template>
  <div>
    <el-card class="box-card" style="width:600px">
      <div slot="header" class="clearfix">
        <span>信息修改</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="商品名" prop="username">
          <el-input type="text" v-bind:value="ruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label prop="password">
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
          <el-button type="success" @click="submitForm">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        gender: "male",
        age: "",
      },
    };
  },
  async created() {
    console.log("Router=", this.$router);
    console.log("Route=", this.$route);
    const { data } = await this.$request.get("/goods/");
    console.log(data)
  },
};
</script>