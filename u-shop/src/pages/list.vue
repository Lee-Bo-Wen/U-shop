<template>
  <div class="home">
    <head1></head1>
    <div class="nav">
      <div class="nav1">
        <input type="text" name="" id="" placeholder="按内容搜索" />
        <img class="img3" src="../assets/img/搜索.png" alt="" />
      </div>
      <div class="nav2 clearfix">
        <div class="l">
          <span
            @click="da(idx)"
            v-for="(item, idx) in nav"
            :key="item"
            :class="{ da: idx == num }"
            >{{ item }}</span
          >
        </div>
        <div class="r">
          <img src="../assets/img/栏目.png" alt="" />
          筛选
        </div>
      </div>
    </div>
    <div class="cont">
      <div class="top">筛选11.11大促商品</div>
      <van-card
        :border="false"
        @click="godetail(item.id)"
        v-for="item in list"
        :key="item.id"
        :price="item.price | toPrice"
        desc="目前暂无描述信息"
        :title="item.goodsname"
        :thumb="
          item.img
            ? $imgUrl + item.img
            : 'https://img01.yzcdn.cn/vant/ipad.jpeg'
        "
      >
        <template #bottom>
          <del class="del">￥{{ item.market_price | toPrice }}</del
          ><br />
          <van-tag type="warning">11.11限时{{ item.price }}起</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
// 引入头组件
import head1 from "../components/head";
import { getCateGoods } from "../util/axios";
export default {
  data() {
    return {
      nav: ["综合排序", "销量", "价格", "好评度", "店铺"],
      num: 0,
      list: [],
    };
  },
  components: {
    head1,
  },
  mounted() {
    this.getgoods();
  },
  methods: {
    da(i) {
      this.num = i;
    },
    async getgoods() {
      this.list = await getCateGoods({
        fid: this.$route.query.id,
      });
    },
    // 跳详情
    godetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style src='../assets/css/list.css' scoped>
.home {
  background-color: rgb(241, 239, 239);
}
</style>