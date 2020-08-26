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
          <el-button type="success" round size="medium">添加</el-button>
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

          <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品代码" :label-width="formLabelWidth">
                <el-input v-model="form.commodityCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.commodityName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品描述" :label-width="formLabelWidth">
                <el-input v-model="form.subTitle" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.commodityPrice" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品 ID" :label-width="formLabelWidth">
                <el-input v-model="form.commodityComponentId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品规格" :label-width="formLabelWidth">
                <el-input v-model="form.commoditySpec" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品标题" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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

      // 编辑表单
      dialogFormVisible: false,
      form: {
        commodityCode: "",
        commodityName: "",
        subTitle: "",
        commodityPrice: "",
        commodityComponentId: "",
        commoditySpec: "",

        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //  设置每页多少条信息
    async handleSizeChange(val) {
      this.pagesize = val;
      const { data } = await this.$request.get("/Binxian", {
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
      const { data } = await this.$request.get("/Binxian", {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.tableData = data.data;
    },

    //  查询功能
    async search() {
      //  查询商品代码
      if (this.select === "code") {
        const { data } = await this.$request.get("/Binxian", {
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
          this.tableData = data.data;
        }

        //  查询商品名称
      } else if (this.select === "name") {
        const { data } = await this.$request.get("/Binxian", {
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
          this.tableData = data.data;
        }
      }
    },

    //  重置功能
    async reset() {
      const { data } = await this.$request.get("/Binxian", {
        params: {
          page: 1,
          size: 5,
        },
      });
      this.tableData = data.data;
      this.input = "";
    },

    //  删除功能
    async handleDelete(index, row) {
      const result = await this.$request.delete("/Binxian/" + row._id);
      console.log(result);
      if (result.data.code === 1) {
        this.$message({
          message: "成功删除",
          type: "success",
        });
      }
      this.reset();
    },
    handleEdit(index, row) {
      console.log(row);
      this.form.commodityCode = row.commodityCode;
      this.form.commodityName = row.commodityName;
      this.form.subTitle = row.subTitle;
      this.form.commodityPrice = row.commodityPrice;
      this.form.commodityComponentId = row.commodityComponentId;
      this.form.commoditySpec = row.commoditySpec;
    },
  },

  //  挂载后
  async created() {
    const { data } = await this.$request.get("/Binxian"
    
    );
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