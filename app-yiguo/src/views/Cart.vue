<template>
  <div class="cart">
    <div class="header" v-if="!isShow">
      <span>登录可同步购物车内商品</span>
      <i @click="login">登录</i>
    </div>
    <van-card
      v-for="item in goodslist"
      :key="item._id"
      :price="item.commodityPrice"
      :desc="item.commodityName"
      :thumb="item.pictureUrl"
    >
      <template #num>
        <van-stepper
          :value="item.commodityNum"
          async-change
          @change="onChange(item.commodityCode,$event)"
          input-width="30px"
          button-size="22px"
          integer
        />
      </template>
      <template #footer>
        <van-button icon="delete" @click="removeItem(item._id)"></van-button>
      </template>
      <template #tag>
        <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
    </van-card>
    <van-submit-bar :price="totalPrice" button-text="去结算" @submit="onSubmit" label="合计(不含运费):">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div style="height:50px;background-color:#fff;"></div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Card,
  Stepper,
  Dialog,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Toast,
} from "vant";
import { mapState } from "vuex";
Vue.use(Card);
Vue.use(Stepper);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Toast);

export default {
  name: "Cart",
  computed: {
    ...mapState({
      goodslist(state) {
        return state.cart.goodslist;
      },
    }),
    checkAll: {
      get() {
        if (this.$store.state.cart.goodslist[0]) {
          return this.$store.state.cart.goodslist.every((item) => item.checked);
        } else {
          return false;
        }
      },
      set(val) {
        this.$store.commit("checkedAll", val);
      },
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    isShow() {
      return this.$store.state.common.ifLogin;
    },
  },
  methods: {
    //  修改数量
    onChange(commodityCode, qty) {
      this.$store.commit("changeQty", { commodityCode, qty });
    },

    //  删除某个商品
    removeItem(_id) {
      Dialog.confirm({
        message: "您确定删除吗？",
      })
        .then(() => {
          this.$store.commit("remove", _id);
        })
        .catch(() => {
          // on cancel
        });
    },

    //  提交订单
    onSubmit() {
      Toast.success("结算成功");
      this.$store.commit("clear");
    },

    //  登录
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  background: #f4f4f4;
}
.header {
  height: 40px;
  line-height: 40px;
  // border-bottom: 10px solid #f4f4f4;
  text-align: center;
  color: #808080;
  font-size: 12px;
  background: #fff;
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
.van-card {
  background-color: #fff;
  .van-card__thumb {
    margin-left: 20px;
    .van-card__tag {
      top: 30px;
      left: -20px;
    }
  }
  .van-card__footer {
    position: absolute;
    top: 5%;
    right: 2%;
    .van-button--default {
      border: 0;
    }
  }
  .van-card__price {
    color: #fb3d3d;
  }
  .van-card__desc {
    margin-top: 15px;
  }
}

.van-submit-bar {
  bottom: 50px;
  .van-submit-bar__bar {
    padding-right: 0;
    .van-submit-bar__text {
      font-size: 10px;
      padding-right: 0px;
      > span {
        margin-right: 10px;
      }
    }
    .van-button--round {
      border-radius: 0;
    }
  }
}
</style>