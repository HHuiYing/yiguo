<template>
  <div class="home">
    <!-- 导航 -->
    <van-sticky>
      <van-search
        v-model="value"
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
      />
    </van-sticky>
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
    <!-- 每日惊喜 -->
    <div class="surprise">
      <img v-for="item in surprise" :key="item._id" style="width:100%" v-lazy="item.pictureUrl" />
    </div>
    <!-- 冰鲜到家 -->
    <div class="fresh-Home">
      <img width="100%" src="../../public/img/swipe-1.jpg" />
      <van-swipe :loop="false" :width="124" class="swipe-goods" :show-indicators="false">
        <van-swipe-item
          v-for="item in binxian"
          :key="item._id"
          class="swipe-item"
          @click="gotoGoods(item._id,'binxian')"
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
    <!-- 精选水产 -->
    <div class="aquatic">
      <h3>— 精选水产 —</h3>
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item 
        v-for="item in shuican" 
        :key="item._id" 
        class="box"
        @click="gotoGoods(item._id,'shuican')"
        >
          <img v-lazy="item.pictureUrl" />
          <div class="swipe-content">
            <p>{{item.commodityName}}</p>
            <span>{{item.commodityPrice}}</span>
            <van-icon name="cart" color="#01b27a" @click="add2cart" />
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="pagefooter" >
      <p>沪IPC备09008015号</p>
      <p>上海易果电子商务有限公司</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image as VanImage,
  Card, Sticky, Search
} from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Card);
Vue.use(Sticky);
Vue.use(Search);

export default {
  name: "Home",
  data() {
    return {
      recommend: [],
      goodslist: [],
      zhongbanglist: [],
      surprise: [],
      binxian: [],
      shuican: [],
       value: "",
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

    // 每日惊喜
    const {
      data: { data: surprise },
    } = await this.$request("/surprise");
    this.surprise = surprise;

    // 冰鲜到家
    const {
      data: {data: binxian},
    } = await this.$request("/binxian")
    this.binxian = binxian

    // 精选水产
    const {data : {data: shuican}} = await this.$request("/Shuican")
    this.shuican = shuican
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
.surprise img {
  display: block;
}
.aquatic{
  h3{
    text-align: center;
  }
  .box{
    img{
      width: 11rem;
    }
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
}
.pagefooter{
  height: 100px;
  text-align: center;
  p{
    font-size: 12px;
    color: #8d8a8a;
    line-height: 12px;
  }
}
</style>