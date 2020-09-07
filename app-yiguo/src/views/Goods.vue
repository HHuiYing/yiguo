<template>
  <div class="goods">
    <i class="goback" @click="goback('/home')"></i>
    <van-image :src="goodsMsg.pictureUrl" @click="showBig"></van-image>
    <!--轮播效果-->
    <!-- <van-swipe :autoplay="3000">
      <van-swipe-item>
        <img v-lazy="goodsMsg.pictureUrl" />
      </van-swipe-item>
      <van-swipe-item v-for="(image, index) in swipeImg" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>-->
    <div class="cell">
      <p>{{goodsMsg.commodityName}}</p>
      <van-tag plain type="success" round v-if="goodsMsg.saleSlogan!==null">{{goodsMsg.saleSlogan}}</van-tag>
      <b>{{goodsMsg.subTitle}}</b>
      <div class="price">
        <span>{{goodsMsg.commodityPrice}}</span>
        <b>产地：广东广州</b>
      </div>
    </div>
    <van-cell-group v-if="goodsMsg.saleSlogan!==null">
      <van-cell class="title">
        <template #default>
          <i class="custom-title">促销</i>
          <van-tag plain type="success" round>优惠</van-tag>
          <b>{{goodsMsg.saleSlogan}}</b>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="bor-b">
      <van-cell class="title">
        <template #default>
          <van-icon name="info-o" style="margin-right:8px" />
          <i class="custom-title">不支持7天无理由退换</i>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell class="title">
        <template #default>
          <i class="custom-title">规格</i>
          <van-tag
            plain
            type="success"
            round
            style="font-size:14px;padding:7px 15px"
          >{{goodsMsg.commodityUnit}}{{goodsMsg.commoditySpec}}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="bor-b">
      <van-cell class="title">
        <template #default>
          <i class="custom-title">数量</i>
          <van-stepper v-model="value" integer />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="bor-b">
      <van-cell class="title address">
        <template #default>
          <i class="custom-title">送至</i>
          <van-icon name="location" />广东 广州市 天河区
          <p class="infor">
            <span>有货:</span>
            16:00 后完成订单，预计后天(9月6日)发货
          </p>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="assess">
      <van-cell title="评价（27）" is-link value="查看全部" />
    </van-cell-group>
    <van-cell-group class="assess-main bor-b">
      <van-cell>
        <template #title>
          <van-image round width="32px" height="32px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="main-left">
            <p>ya***01</p>
            <i></i>
            <p>超时未评价，系统默认好评</p>
          </div>
        </template>
        <template #default>
          <i class="custom-title">2020-09-04</i>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="rich">
      <van-tag plain color="#ccc" size="large">查看图文详情</van-tag>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="goback('/home')" style="flex: 1" />
      <van-goods-action-icon
        icon="cart-o"
        :badge="this.cartlist.length"
        text="购物车"
        @click="goback('/cart')"
        style="flex: 1"
      />
      <van-goods-action-button type="danger" text="加入购物车" @click="addGoods" />
    </van-goods-action>
    <!-- <div style="height:50px"></div> -->
  </div>
</template>

<script>
import Vue from "vue";
//  轮播
// import { Swipe, SwipeItem, Lazyload } from "vant";
// Vue.use(Lazyload);
// Vue.use(Swipe);
// Vue.use(SwipeItem);

import {
  ImagePreview,
  Cell,
  CellGroup,
  Tag,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Toast,
} from "vant";
Vue.use(ImagePreview);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tag);
Vue.use(Stepper);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Toast);

export default {
  name: "Goods",
  data() {
    return {
      goodsMsg: {},
      value: "",
      //  轮播数据
      // swipeImg: ["img/swipe-1.jpg", "img/swipe-2.jpg"],
    };
  },
  computed: {
    cartlist() {
      return this.$store.state.cart.goodslist;
    },
  },
  methods: {
    //  获取数据
    async getData(id, api) {
      const { data } = await this.$request.get(`${api}/${id}`);
      this.goodsMsg = data.data[0];
    },

    //  点击放大图片
    showBig() {
      ImagePreview({
        images: [
          this.goodsMsg.pictureUrl,
          "/img/swipe-1.jpg",
          "/img/swipe-2.jpg",
        ],
        closeable: true,
      });
    },

    //  返回
    goback(path) {
      this.$router.push(path);
    },

    //  加入购物车
    addGoods() {
      Toast.success("加入购物车成功");
      const { commodityCode } = this.goodsMsg;
      const current = this.cartlist.filter(
        (item) => item.commodityCode == commodityCode
      )[0];
      if (current) {
        this.$store.commit("changeQty", {
          commodityCode,
          qty: current.commodityNum * 1 + this.value,
        });
      } else {
        const goods = {
          ...this.goodsMsg,
          commodityNum: this.value,
        };
        this.$store.commit("add", goods);
      }
    },
  },

  async created() {
    let { id } = this.$route.params;
    let { api } = this.$route.query;
    this.getData(id, api);
  },
  mounted() {
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
};
</script>

<style lang="scss" scoped>
.van-image {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
.cell {
  padding: 0px 20px;
  p {
    font-size: 16px;
    color: #333;
    margin-top: 0px;
  }
  > span {
    font-size: 12px;
    line-height: 12px;
    border-radius: 10px;
    padding: 3px 10px;
    color: #01b27a;
    font-size: 10px;
    font-style: normal;
    margin-right: 10px;
  }
  b {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .price {
    padding: 12px 0;

    span {
      color: #eb3939;
      font-size: 20px;
      &::before {
        content: "￥";
      }
    }
    b {
      float: right;
      color: #999;
      font-size: 10px;
    }
  }
}
.title {
  i {
    color: #999;
    font-size: 13px;
  }
  span {
    padding: 3px 10px;
    color: #01b27a;
    margin-left: 15px;
    margin-right: 10px;
  }
  b {
    color: #333;
    font-size: 12px;
  }
}

.van-stepper {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  background: #fff;
}
.address {
  font-size: 14px;
  color: #333;
  .van-icon-location {
    color: #01b27a;
    margin-left: 15px;
  }
  .infor {
    color: #333;
    font-size: 12px;
    margin: 0px;
    span {
      margin-left: 35px;
      margin-right: 0px;
      padding-right: 0px;
    }
  }
}
.assess {
  .van-cell__title {
    color: #999;
    font-size: 13px;
  }
  .van-cell__value {
    color: #666;
    font-size: 14px;
  }
}
.assess-main {
  .van-cell__title {
    display: flex;
    flex: 2;
  }
  .main-left {
    margin-left: 10px;
    p {
      margin: 5px;
    }
    p:first-of-type {
      margin-top: -8px;
    }
    i {
      display: block;
      width: 103px;
      height: 13px;
      background: url("../../public/img/stars.png") no-repeat top/103px 30px;
    }
  }
}
.rich {
  text-align: center;
  .van-tag {
    margin-top: 20px;
    color: #999;
    padding: 6px 30px;
    text-align: center;
  }
}
.bor-b {
  border-bottom: 10px solid #f4f4f4;
}
.van-goods-action-button {
  border-radius: 0;
  flex: 4;
  margin: 0;
  height: 100%;
}
</style>