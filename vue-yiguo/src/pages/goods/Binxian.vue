<template>
  <div class="wrap-form">
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
              <el-option label="商品代码" value="code"></el-option>
              <el-option label="商品名称" value="name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="text-align:right;margin-right:10%">
          <el-button type="warning" round size="medium" @click="reset">重置</el-button>
          <el-button type="success" round size="medium" @click="dialogFormVisible = true">添加</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.commodityName }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.commodityComponentId }}</span>
            </el-form-item>
            <el-form-item label="商品规格">
              <span>{{ props.row.commoditySpec }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.commodityUnit }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>
                <img :src="props.row.pictureUrl" style="height:150px; width:150px" />
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品代码" prop="commodityCode" align="center" sortable></el-table-column>
      <el-table-column label="商品名称" prop="commodityName" align="center" min-width="100px"></el-table-column>
      <el-table-column label="商品描述" prop="subTitle" align="center" min-width="100px"></el-table-column>
      <el-table-column label="商品价格" prop="commodityPrice" align="center" min-width="50px" sortable></el-table-column>
      <el-table-column label="操作 " align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
          >编辑</el-button>

          <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" @close="formReset">
            <el-form :model="form">
              <el-form-item label="商品代码" :label-width="formLabelWidth">
                <el-input v-model="form.commodityCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.commodityName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.commodityPrice" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.subTitle" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品 ID" :label-width="formLabelWidth">
                <el-input v-model="form.commodityComponentId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品规格" :label-width="formLabelWidth">
                <el-input v-model="form.commoditySpec" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品单位" :label-width="formLabelWidth">
                <el-input v-model="form.commodityUnit" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="商品图片" :label-width="formLabelWidth"> -->
              <!-- <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>-->
              <!-- </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="Submit(), dialogFormVisible = false ">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      pagesize: 5, //  初始每页5条
      currentPage: 1, //  初始第一页
      dataLength: 0,
      input: "",
      select: "code",
      path: "binxian", //  跳转页面的路径
      // 编辑表单
      dialogFormVisible: false,
      form: {
        commodityCode: "",
        commodityName: "",
        subTitle: "",
        commodityPrice: "",
        commodityComponentId: "",
        commoditySpec: "",
        commodityUnit: "",
      },
      formLabelWidth: "120px",
      //  图片信息
      // fileList: [
      //   {
      //     name: "food.jpeg",
      //     url:
      //       "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      //   {
      //     name: "food2.jpeg",
      //     url:
      //       "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      // ],
    };
  },
  methods: {
    //  根据分页与分页数量获取数据
    async getData() {
      const { data } = await this.$request.get(`/${this.path}`, {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.tableData = data.data;
    },

    //  设置每页多少条信息
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },

    //  设置到第几页 更新第几页信息
    async handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },

    //  查询功能
    async search() {
      //  查询商品代码
      if (this.select === "code") {
        const { data } = await this.$request.get(`/${this.path}`, {
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

        //  查询商品名称
      } else if (this.select === "name") {
        const { data } = await this.$request.get(`/${this.path}`, {
          params: {
            name: this.input,
            page: this.currentPage,
            size: this.pagesize,
          },
        });

        //  若无商品提示警告
        if (data.data.length === 0) {
          this.$message({
            showClose: true,
            message: "抱歉，查不到此数据",
            type: "warning",
          });
        } else {
          this.dataLength = data.data.length;
          this.tableData = data.data;
        }
      }
    },

    //  重置功能
    async reset() {
      const { data } = await this.$request.get(`/${this.path}`, {});
      //  请求所有数据的总量
      this.dataLength = data.data.length;
      //  根据初始值分割显示数据
      this.tableData = data.data.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      this.input = "";
    },

    //  删除功能
    async handleDelete(index, row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await this.$request.delete(`/${this.path}/` + row._id);
          if (result.data.code === 1) {
            this.$message({
              message: "成功删除",
              type: "success",
            });
          }
          this.reset();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //  关闭dialog
    formReset() {
      this.form = {
        commodityCode: "",
        commodityName: "",
        subTitle: "",
        commodityPrice: "",
        commodityComponentId: "",
        commoditySpec: "",
        commodityUnit: "",
      };
    },

    //  打开编辑页数据传输
    handleEdit(index, row) {
      this.form.id = row._id;
      this.form.commodityCode = row.commodityCode;
      this.form.commodityName = row.commodityName;
      this.form.subTitle = row.subTitle;
      this.form.commodityPrice = row.commodityPrice;
      this.form.commodityComponentId = row.commodityComponentId;
      this.form.commoditySpec = row.commoditySpec;
      this.form.commodityUnit = row.commodityUnit;
    },

    //  修改和添加功能
    async Submit() {
      if (this.form.id) {
        const { data } = await this.$request.put(
          `/${this.path}/` + this.form.id,
          { ...this.form }
        );

        if (data.code) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message.error("修改失败");
        }
      } else {
        await this.$request.post(`/${this.path}`, { ...this.form });
      }
      this.reset();
    },

    //  上传图片
    // handleRemove(file, fileList) {
    //   console.log("handleRemove", file, fileList);
    // },
    // handlePreview(file) {
    //   console.log("handlePreview", file);
    // },
    // beforeRemove(file) {
    //   return this.$confirm("beforeRemove", `确定移除 ${file.name}？`);
    // },
  },

  //  监听动态路由改变
  watch: {
    "$route.path"() {
      console.log(this.$route.meta.path, this.path, this.$route);
      this.path = this.$route.meta.path;
      this.reset();
    },
  },

  //  挂载后
  async created() {
    this.path = this.$route.meta.path;
    this.reset();
  },

  //  监听动态路由改变
  // beforeRouteUpdate(to, from, next) {
  //   console.log("beforeRouteUpdate(to,from,next)", to, from);
  //   next();
  // },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
}
.el-select .el-input {
  width: 130px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-input-group {
  width: 60%;
}
</style>