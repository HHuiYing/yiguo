<template>
  <div class="home">
    <!--轮播图-->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in recommend" :key="item._id">
        <img v-lazy="item.pictureUrl" />
      </van-swipe-item>
    </van-swipe>
    <!--商品列表-->
    <van-grid :column-num="4" class="grid" :border="false">
      <van-grid-item v-for="item in goodslist" :key="item._id">
        <img v-lazy="item.pictureUrl" />
        <p>{{item.navName}}</p>
      </van-grid-item>
    </van-grid>
    <!--重磅推荐-->
    <div class="wrap-Heavy">
      <img src="../../public/img/Heavy.jpg" />
      <van-swipe :loop="false" :width="124" class="swipe-goods" :show-indicators="false">
        <van-swipe-item
          v-for="item in zhongbanglist"
          :key="item._id"
          class="swipe-item"
          @click="gotoGoods(item._id,'Zhongbang')"
        >
          <img v-lazy="item.pictureUrl" />
          <div class="swipe-content">
            <p>{{item.commodityName}}</p>
            <span>{{item.commodityPrice}}</span>
            <van-icon name="cart" color="#01b27a" @click="add2cart" />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="height:100px"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Grid, GridItem } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);

export default {
  name: "Home",
  data() {
    return {
      recommend: [],
      goodslist: [],
      zhongbanglist: [],
    };
  },
  components: {},
  methods: {
    //  根据id值跳转路由
    gotoGoods(id, api) {
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
        query: {
          api,
        },
      });
    },

    //  添加到购物车
    add2cart() {},
  },
  async created() {
    //  轮播图
    const {
      data: { data: recommend },
    } = await this.$request("/lunbo", {
      params: {
        size: 3,
      },
    });
    this.recommend = recommend;

    //  商品列表
    const {
      data: { data: goodslist },
    } = await this.$request("/lunbo", {
      params: {
        sort: "width",
        size: 8,
      },
    });
    this.goodslist = goodslist;

    // 重磅推荐
    const {
      data: { data: zhongbanglist },
    } = await this.$request("/Zhongbang");
    this.zhongbanglist = zhongbanglist;
  },
};
</script>
<style lang="scss" scoped>
.my-swipe {
  height: 217.39px;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
.grid {
  /deep/.van-grid-item__content {
    padding-bottom: 0px;
  }

  img {
    height: 67.83px;
    width: 67.83px;
  }
  p {
    color: rgb(51, 51, 51);
    font-size: 14px;
    margin: 0px;
  }
}
.wrap-Heavy {
  > img {
    height: 217px;
    width: 100%;
  }
}
.swipe-goods {
  padding-left: 16px;
  .swipe-item {
    margin-right: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    .swipe-content {
      padding: 0 8px 8px;
      p {
        margin: 0;
        margin-bottom: 4px;
      }
      span {
        font-weight: bold;
        color: #fb3d3d;
        font-size: 14px;
        &::before {
          content: "￥";
        }
      }
      .van-icon-cart {
        float: right;
        margin-top: 2px;
      }
    }
  }
  img {
    width: 100%;
  }
  p {
    color: #333;
    font-size: 11px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>