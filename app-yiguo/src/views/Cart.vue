<template>
  <div>
    <div class="header">
      <span>登录可同步购物车内商品</span>
      <i>登录</i>
    </div>
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { Card } from "vant";
import { mapState } from "vuex";
Vue.use(Card);

export default {
  name: "Cart",
  computed: {
    ...mapState({
      goodslist(state) {
        return state.card.goodslist;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  line-height: 40px;
  border-bottom: 10px solid #f4f4f4;
  text-align: center;
  color: #808080;
  font-size: 12px;

  i {
    display: inline-block;
    width: 54px;
    height: 20px;
    border: 1px solid #808080;
    border-radius: 4px;
    margin-left: 10px;
    line-height: 20px;
  }
}
</style>