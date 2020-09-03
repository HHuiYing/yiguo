<template>
  <div class="goods">
    <van-image :src="goodsMsg.pictureUrl" @click="showBig"></van-image>
    <!-- <van-swipe :autoplay="3000">
      <van-swipe-item>
        <img v-lazy="goodsMsg.pictureUrl" />
      </van-swipe-item>
      <van-swipe-item v-for="(image, index) in swipeImg" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>-->
  </div>
</template>

<script>
import Vue from "vue";
// import { Swipe, SwipeItem, Lazyload } from "vant";
// Vue.use(Lazyload);
// Vue.use(Swipe);
// Vue.use(SwipeItem);

import { ImagePreview } from "vant";
Vue.use(ImagePreview);

export default {
  name: "Goods",
  data() {
    return {
      goodsMsg: {},
      // swipeImg: ["img/swipe-1.jpg", "img/swipe-2.jpg"],
    };
  },
  methods: {
    async getData(id, api) {
      const { data } = await this.$request.get(`${api}/${id}`);
      this.goodsMsg = data.data[0];
      console.log(this.swipeImg);
    },
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
  },
  async created() {
    let { id } = this.$route.params;
    let { api } = this.$route.query;
    console.log(id, api);
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
</style>