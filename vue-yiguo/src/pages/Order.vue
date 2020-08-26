<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" class="input-with-select page" clearable size="medium">
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:120px">
        <el-option label="商品代码" value="1"></el-option>
        <el-option label="商品名称" value="2"></el-option>
        <el-option label="商品价格" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-table
      ref="multipleTable"
      :data="orderlist"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="55"></el-table-column>
      <el-table-column label="图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width:60px;height:60px" />
        </template>
      </el-table-column>

      <el-table-column label="商品名" width="120" prop="username"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column width="100px">
        <template v-slot:default="scope">
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="goto(scope.row._id)"
          ></el-button>
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

    <router-view class="editCard" />
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
      select: "",
    };
  },
  methods: {
    goto(id) {
      this.$router.push({
        name: "orderEdit",
        params: { id },
      });
    },
    async created() {
      // console.log("List=", this);
      // axios({
      //     url: 'http://localhost:2003/api/goods',
      //     method: 'get'
      // })
      const { data } = await this.$request.get("/order");

      console.log(data.data);
      this.orderlist = data.data;
      // console.log(this.orderlist)
    },

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
    search() {},
  },
  async created() {
    const { data } = await this.$request.get("/order", {
      params: {
        sort: 1,
      },
    });
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
.editCard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.el-pagination {
  text-align: center;
}

</style>
