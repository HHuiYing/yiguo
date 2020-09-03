<template>
  <div class="goods">
    <i class="goback" @click="goback"></i>
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
      <i>{{goodsMsg.saleSlogan}}</i>
      <span>{{goodsMsg.subTitle}}</span>
      <div class="price">
        <span>{{goodsMsg.commodityPrice}}</span>
        <b>产地：广东广州</b>
      </div>
    </div>
    <van-cell-group>
      <van-cell value="促销" />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
//  轮播
// import { Swipe, SwipeItem, Lazyload } from "vant";
// Vue.use(Lazyload);
// Vue.use(Swipe);
// Vue.use(SwipeItem);

import { ImagePreview, Cell, CellGroup } from "vant";
Vue.use(ImagePreview);
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  name: "Goods",
  data() {
    return {
      goodsMsg: {},
      //  轮播数据
      // swipeImg: ["img/swipe-1.jpg", "img/swipe-2.jpg"],
    };
  },
  methods: {
    //  获取数据
    async getData(id, api) {
      const { data } = await this.$request.get(`${api}/${id}`);
      this.goodsMsg = data.data[0];
      console.log(this.swipeImg);
    },

    //  点击放大图片
    showBig() {
      ImagePreview({
        images: [
          this.goodsMsg.pictureUrl,
          "img/swipe-1.jpg",
          "img/swipe-2.jpg",
        ],
        closeable: true,
      });
    },

    //  返回首页
    goback() {
      this.$router.push("/home");
    },
  },
  async created() {
    let { id } = this.$route.params;
    let { api } = this.$route.query;
    this.getData(id, api);
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
  i {
    font-size: 12px;
    line-height: 12px;
    border-radius: 10px;
    border: 1px solid #01b27a;
    padding: 3px 10px;
    color: #01b27a;
    font-size: 10px;
    font-style: normal;
    margin-right: 10px;
  }
  span {
    font-size: 14px;
    color: #444;
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
      font-weight: normal;
      color: #999;
      font-size: 10px;
    }
  }
}
</style>