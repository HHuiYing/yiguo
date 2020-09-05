<template>
  <div class="list">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入商品名称"
        @search="onSearch(value)"
        @click="show = true"
        shape="round"
      >
        <template #action>
          <div @click="onSearch(value)">搜索</div>
        </template>
      </van-search>
    </form>
    <van-overlay :show="show" @click="show = false" duration="0.1" />
    <van-tree-select :items="items" :main-active-index.sync="active" height="100%">
      <template #content>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="item in goods" :key="item.CategoryName">
            <van-image :src="item.PictureUrl" />
            <p>{{item.CategoryName}}</p>
          </van-grid-item>
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import { TreeSelect, Grid, GridItem, Search, Toast, Overlay } from "vant";
Vue.use(TreeSelect);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Toast);
Vue.use(Overlay);
export default {
  name: "List",
  data() {
    return {
      active: 0,
      value: "",
      goodsList: "",
      items: [],
      goods: {},
      show: false,
    };
  },
  methods: {
    // ajax请求
    getItems() {
      for (let key in this.goodsList) {
        if (this.goodsList[key].CategoryName) {
          this.items.push({ text: this.goodsList[key].CategoryName });
        }
      }
      this.goods = this.goodsList[this.active]["Childs"];
    },

    //  搜索
    onSearch(value) {
      if (value) {
        Toast(`正在搜索${value}`);
      } else {
        Toast("请输入商品名称");
      }
      this.show = false;
    },
  },
  watch: {
    active() {
      this.goods = this.goodsList[this.active]["Childs"];
    },
  },
  async created() {
    const { data } = await this.$request.get("/goods");
    this.goodsList = data.data;
    this.getItems();
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.list {
  .sou {
    height: 2.5625rem;
  }
}
.van-tree-select__nav {
  .van-sidebar-item {
    font-size: 12px;
    text-align: center;
    &::before {
      height: 100%;
      background-color: #11b57c;
    }
  }
  .van-sidebar-item--select {
    color: #11b57c;
  }
}
.van-tree-select__content {
  flex: 3;
  .van-grid {
    padding: 0 18px;
    .van-grid-item {
      p {
        color: #808080;
        font-size: 12px;
        margin: 0;
      }
    }
  }
}
.van-overlay {
  top: 50px;
  background: rgba(0, 0, 0, 0.4);
}
</style>
