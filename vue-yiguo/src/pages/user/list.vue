<template>
  <div>
    <!-- 搜索模块 -->
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
            clearable
            size="medium"
          >
            <el-select v-model="select" slot="prepend" style="width:120px">
              <el-option label="手机号码" value="code"></el-option>
              <el-option label="用户名称" value="name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
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
      <el-table-column label="头像" prop="pictureUrl" min-width="100" align="center">
        <template v-slot:default="scope">
          <img :src="scope.row.pictureUrl" style="height:80px; width:80px" />
        </template>
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
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row._id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,3,4,5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataLength"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentId: "",
      pagesize: 5, //  初始每页5条
      currentPage: 1, //  初始第一页
      dataLength: 0,
      input: "",
      select: "code",
    };
  },
  methods: {
    //删除功能
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
    //跳转到编辑页面
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
    //  设置每页多少条信息
    async handleSizeChange(val) {
      this.pagesize = val;
      const { data } = await this.$request.get("/user", {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.tableData = data.data;
    },

    //  设置到第几页 更新第几页信息
    async handleCurrentChange(val) {
      this.currentPage = val;
      const { data } = await this.$request.get("/user", {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.tableData = data.data;
    },
    //  查询功能
    async search() {
      //  查询手机号码
      if (this.select === "code") {
        const { data } = await this.$request.get("/user", {
          params: {
            code: this.input,
            page: this.currentPage,
            size: this.pagesize,
          },
        });
        if (data.data.length === 0) {
          this.$message({
            message: "抱歉，查不到此数据",
            type: "warning",
          });
        } else {
          this.dataLength = data.data.length;
          this.tableData = data.data;
        }
        //  查询用户名
      } else if (this.select === "name") {
        const { data } = await this.$request.get("/user", {
          params: {
            name: this.input,
            page: this.currentPage,
            size: this.pagesize,
          },
        });
        //  若无该用户提示警告
        if (data.data.length === 0) {
          this.$message({
            showClose: true,
            message: "抱歉，查不到此用户",
            type: "warning",
          });
        } else {
          this.dataLength = data.data.length;
          this.tableData = data.data;
        }
      }
    },
  },
  computed: {},
  async created() {
    const { data } = await this.$request.get("/user");
    this.tableData = data.data;
    //  请求所有数据的总量
    this.dataLength = data.data.length;
    //  根据初始值分割显示数据
    this.tableData = data.data.slice(
      (this.currentPage - 1) * this.pagesize,
      this.currentPage * this.pagesize
    );
  },
};
</script>
<style scoped lang="scss">
.grid-content{
  margin-bottom: 10px;
}
.el-pagination{
  margin-top: 30px;
  text-align: center;
}
</style>