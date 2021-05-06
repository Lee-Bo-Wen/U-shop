<template>
  <div>
    <!-- https://img2.baidu.com/it/u=2590128318,632998727&fm=26&fmt=auto&gp=0.jpg -->
    <van-overlay :v-if="goodsdetail.length == 0" :show="show" />
    <!-- <van-button type="primary" text="显示遮罩层"/> -->
    <div  :v-if="goodsdetail.length > 0">
      <div class="header">
        {{ goodsdetail.goodsname }}
        <div class="header_img">
          <img @click="$router.go(-1)" src="../assets/img/左箭头.png" />
        </div>
      </div>
      <div class="nav">
        <div class="l">
          <span
            @click="da(idx)"
            v-for="(item, idx) in nav"
            :key="item"
            :class="{ da: idx == num }"
            >{{ item }}<i></i
          ></span>
        </div>
      </div>
      <div>
        <img
          class="datu"
          :src="
            goodsdetail.img
              ? $imgUrl + goodsdetail.img
              : ''
          "
          alt=""
        />
      </div>
      <div class="cont">
        <p class="p1">
          ￥<span>{{ goodsdetail.price }}</span
          ><del>￥{{ goodsdetail.market_price }}</del>
        </p>
        <p class="p2">{{ goodsdetail.goodsname }}</p>
        <p class="p3">暂无详细信息</p>
        <p class="p4"><van-tag type="warning">11.11限时299元起</van-tag></p>
        <p class="p5">此商品于2020-11-11，00点结束闪购特卖，品牌美妆闪购专场</p>
      </div>
      <div class="box1">
        <van-cell
          title="促销：满2价减9折；3件8折"
          is-link
          arrow-direction="down"
        />
        <van-cell title="购买数量">
          <template #default>
            <van-stepper v-model="num1" min="1" max="5" />
          </template>
        </van-cell>
        <van-cell
          title="商品属性"
          is-link
          arrow-direction="down"
          value="内容"
        />
      </div>
      <div class="detail">
        <h3>商品详情</h3>
        <div v-html="goodsdetail.description"></div>
      </div>
      <div class="foot">
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="shop-o" text="店铺" />
          <van-goods-action-icon icon="cart-o" text="购物车" />
          <van-goods-action-button
            @click="togo"
            type="warning"
            text="加入购物车"
          />
          <van-goods-action-button type="danger" @click="to" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsDetail, getCartAdd } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      nav: ["商品", "评价", "详情", "推荐"],
      num: 0,
      goodsdetail: {},
      num1: 1,
      // attrArr: [],
      show:true
    };
  },
  mounted() {
    //触发详情方法
    this.getDetail();
  },
  methods: {
    da(i) {
      this.num = i;
    },
    async getDetail() {
      let res = await getGoodsDetail({ id: this.$route.query.id });
      this.goodsdetail = res[0];
      this.show=false
      // this.attrArr = this.goodsdetail.specsattr.split(",");
      // console.log(this.goodsdetail);
    },
    async togo() {
      // 跳到购物车
      if (sessionStorage.getItem("user")) {
        let res = await getCartAdd({
          uid: JSON.parse(sessionStorage.getItem("user")).uid,
          goodsid: this.goodsdetail.id,
          num: this.num1,
        });
        if (res.code == 200) {
          console.log(
            JSON.parse(sessionStorage.getItem("user")).uid,
            this.goodsdetail.id,
            this.num1
          );
          Toast.success(res.msg);
          this.$router.push("/shopping");
        } else {
          Toast.fail(res.msg);
        }
      } else {
        Toast.fail("请先登录");
        this.$router.push("/login");
      }
    },
    to() {
      if (sessionStorage.getItem("user")) {
        this.$router.push("/confirm");
      } else {
        Toast.fail("请先登录");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style src='../assets/css/detail.css' scoped>
</style>