<template>
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
            clearable
            size="medium"
          >
            <el-select v-model="select" slot="prepend" style="width:120px">
              <el-option label="商品ID" value="code"></el-option>
              <el-option label="商品名称" value="name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-table ref="multipleTable" :data="orderlist" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="55"></el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.pictureUrl" style="width:60px;height:60px" />
        </template>
      </el-table-column>
      <el-table-column label="商品ID" width="200" prop="commodityCode"></el-table-column>
      <el-table-column prop="commodityName" label="商品名称"></el-table-column>
      <el-table-column prop="commodityPrice" label="价格"></el-table-column>
      <el-table-column prop="commodityNum" label="数量"></el-table-column>

      <el-table-column width="100px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index,scope.row),dialogFormVisible = true"
          ></el-button>
          <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="商品ID" :label-width="formLabelWidth">
                <el-input v-model="form.commodityCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.commodityName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.commodityPrice" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" :label-width="formLabelWidth">
                <el-input v-model="form.commodityNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderlist: [],
      pagesize: 5, // 初始页每页5条
      currentPage: 1, // 初始第一页
      dataLength: 0,
      input: "",
      select: "code",

      // 编辑表单
      dialogFormVisible: false,
      form: {
        commodityCode: "",
        commodityName: "",
        commodityPrice: "",
        commodityNum: "",

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
    // 设置每页多少条信息
    async handleSizeChange(val) {
      this.pagesize = val;
      const { data } = await this.$request.get("/order", {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.orderlist = data.data;
    },

    // 设置到第几页 更新第几页信息
    async handleCurrentChange(val) {
      this.currentPage = val;
      const { data } = await this.$request.get("/order", {
        params: {
          page: this.currentPage,
          size: this.pagesize,
        },
      });
      this.orderlist = data.data;
    },

    // 查询功能
    async search() {
      // 查询商品ID
      if (this.select === "code") {
        const { data } = await this.$request.get("/order", {
          params: {
            code: this.input,
            page: this.currentPage,
            size: this.pagesize,
          },
        });
        // 若无商品，提示警告
        if (data.data.length === 0) {
          this.$message({
            message: "抱歉，查询不到子数据",
            type: "warning",
          });
        } else {
          this.dataLength = data.data.length;
          this.orderlist = data.data;
        }

        // 查询商品名称
      } else if (this.select === "name") {
        const { data } = await this.$request.get("/order", {
          params: {
            name: this.input,
            page: this.currentPage,
            size: this.pagesize,
          },
        });
        // 若无商品 提示警告
        if (data.data.length === 0) {
          this.$message({
            showClose: true,
            message: "抱歉 查询不到此数据",
            type: "warning",
          });
        } else {
          this.orderlist = data.data;
        }
      }
    },

    handleEdit(index, row) {
      console.log(row);
      this.form.commodityCode = row.commodityCode;
      this.form.commodityName = row.commodityName;
      this.form.commodityPrice = row.commodityPrice;
      this.form.commodityNum = row.commodityNum;
    },

    // 修改功能
    async Submit() {
      const { data } = await this.$request.put("/order/" + this.form.id, {
        commodityCode: this.form.commodityCode,
        commodityName: this.form.commodityName,
        commodityPrice: this.form.commodityPrice,
        commodityNum: this.form.commodityNum,
      });

      if (data.code) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message.error("修改失败");
      }
      this.reset();
    },
  },

  async created() {
    const { data } = await this.$request.get("/order");
    //  请求所有数据的总量
    this.dataLength = data.data.length;
    //  根据初始值分割显示数据
    this.orderlist = data.data.slice(
      (this.currentPage - 1) * this.pagesize,
      this.currentPage * this.pagesize
    );
  },
};
</script>

<style lang="scss">
.el-pagination {
  text-align: center;
}
</style>
