<template>
  <div>
    <!-- 表格头部 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;text-align:center"
      align="center"
    >
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
      <el-table-column label="头像" prop="picture" min-width="100" align="center">
        <template>
            <img :src="tableData[0].pictureUrl" style="height:80px; width:80px" />
        </template>
        <!-- <img :src="tableData.pictureUrl" style="height:80px; width:80px" /> -->
        <!-- <template slot-scope="scope">
          <el-image  :src="scope.row.tableData[0].pictureUrl" style="width: 80px; height: 80px" :fit="fill"></el-image>
        </template> -->
      </el-table-column>
      <el-table-column label="姓名" prop="username" min-width="100" align="center"></el-table-column>
      <el-table-column label="年龄" prop="age" min-width="60" align="center"></el-table-column>
      <el-table-column label="性别" prop="gender" min-width="60" align="center"></el-table-column>
      <el-table-column label="手机号码" prop="phone" min-width="180" align="center"></el-table-column>
      <el-table-column
        label="地址"
        prop="address"
        min-width="220"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column label="出生日期" prop="birthday" min-width="160" align="center"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" prop="work" min-width="200">
        <template v-slot:default="scope">
          <!-- 编辑 -->
          <el-button type="success" icon="el-icon-edit" circle @click="goto(scope.row._id)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row._id)">
            <!-- 弹框 -->
            <!-- <el-popover placement="top" v-model="visible">
              <p>这条数据确定删除吗</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
            </el-popover>-->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//import axios from '../../utils/request'; //引入模块
export default {
  data() {
    return {
      tableData: [
          
      ],
      currentId: "",
    };
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);
        if (data.code === 1) {
          this.tableData = this.tableData.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      this.$router.push({
        name: "edit",
        params: { id },
        query: {
          a: 10,
          b: 20,
        },
      });
    },
  },
  async created() {
    const { data } = await this.$request.get("/user");
    this.tableData = data.data;
    console.log(this.tableData.pictureUrl);
    console.log(this.tableData[0].pictureUrl);
    console.log(this.tableData);
  },
};
</script>
<style scoped lang="scss">
</style>