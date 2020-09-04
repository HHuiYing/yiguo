<template>
  <div class="list">
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>

    <van-tree-select :items="items" :main-active-index.sync="active" height="100%">
      <template #content>
        <van-grid :column-num="3">
          <van-grid-item>
            <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
          </van-grid-item>
          <van-grid-item v-for="item in goodslist" :key="item._id">
            <van-image />
            <p>{item.navName}</p>
          </van-grid-item>
        </van-grid>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import { TreeSelect, Grid, GridItem, Search } from "vant";
Vue.use(TreeSelect);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
export default {
  name: "List",
  data() {
    return {
      active: 0,
      goodslist: [],
      value: "",
      items: [
        { text: "精选肉类" },
        { text: "海鲜水产" },
        { text: "乳品糕点" },
        { text: "新鲜蔬菜" },
        { text: "方便速食" },
        { text: "生活日用" },
        { text: "食品饮料" },
        { text: "新鲜水果" },
        { text: "礼品礼券" },
        { text: "生活日用" },
      ],
    };
  },
  components: {},
  methods: {
    // ajax请求
    async created() {
      const { data } = await this.$request.get("/goods");
      this.CategoryName = data.data.CategoryName;
      this.goodslist = data.data.Childs.CategoryName;
    },
    onSearch(val) {
      Toast(val);
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
.list {
  .sou {
    height: 2.5625rem;
  }
}
</style>
