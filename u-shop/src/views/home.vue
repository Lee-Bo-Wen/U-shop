<template>
  <div class="home">
    <head1></head1>
    <div class="nav">
      <div class="nav1">
        <img class="img1" src="../assets/img/地址.png" alt="" />
        <img class="img2" src="../assets/img/white(1).png" alt="" />
        <input type="text" name="" id="" placeholder="按内容搜索" />
        <img class="img1" src="../assets/img/商店.png" alt="" />
        <img class="img3" src="../assets/img/搜索.png" alt="" />
      </div>
      <div class="nav2 clearfix">
        <div class="l">
          <span
            @click="da(idx)"
            v-for="(item, idx) in list"
            :key="item.id"
            :class="{ da: idx == num }"
            >{{ item.catename }}<i></i
          ></span>
        </div>
        <div class="r">
          <img src="../assets/img/栏目.png" alt="" />
          分类
        </div>
      </div>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="1500" indicator-color="orange">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.img" alt="" class="img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="box">
      <ul>
        <li>
          <img src="../assets/img/seckill.png" alt="" />
          <p>限时秒杀</p>
        </li>
        <li>
          <img src="../assets/img/top.png" alt="" />
          <p>畅销商品</p>
        </li>
        <li>
          <img src="../assets/img/brand.png" alt="" />
          <p>品质大牌</p>
        </li>
        <li>
          <img src="../assets/img/selfsupport.png" alt="" />
          <p>小U自营</p>
        </li>
        <li>
          <img src="../assets/img/integral.png" alt="" />
          <p>积分商城</p>
        </li>
      </ul>
    </div>
    <div class="box1">
      <div class="l">
        <p>
          <span>限时秒杀</span>
          <span>查看更多></span>
        </p>
        <p>每天0点场，好货秒不停</p>
        <p>
          <span>05</span>: <span>20</span>:
          <span>48</span>
        </p>
      </div>
      <div class="r">
        <div class="r1">
          <p class="p1">
            <span>品牌上新</span>
          </p>
          <p class="p2">9点整，抢大牌</p>
          <p class="p3">
            <span>疯抢红包></span>
          </p>
        </div>
        <div class="r2">
          <p class="p1">
            <span>日用好物</span>
          </p>
          <p class="p2">愿君多采撷</p>
          <p class="p3">
            <span>塞满奖券></span>
          </p>
        </div>
      </div>
    </div>
    <div class="con">
      <table>
        <tr>
          <td
            @click="td1(idx)"
            :class="{ td: idx == tdnum }"
            v-for="(item, idx) in td"
            :key="item"
          >
            {{ item }}
          </td>
        </tr>
      </table>
      <ul>
        <li v-for="(item, idx) in goods" :key="idx">
          <p>{{ item.goodsname }}</p>
          <p><span>￥</span>{{ item.price|toPrice }}</p>
          <p>原价{{ item.market_price|toPrice }}</p>
          <p>立即抢购</p>
          <img
            :src="
              item.img
                ? $imgUrl + item.img
                : 'https://img0.baidu.com/it/u=1986451467,394304688&fm=26&fmt=auto&gp=0.jpg'
            "
            alt=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入头组件
import head1 from "../components/head";
import { getBanner, getHomeGoods,getCartClass } from "../util/axios";
export default {
  data() {
    return {
      nav: ["推荐", "女装", "鞋包", "居家", "母婴", "美妆"],
      num: 0,
      td: ["热卖推荐", "最新好货", "商品合集"],
      tdnum: 0,
      banner: [],
      goods: [],
      res: [],
      list:[],
    };
  },
  components: {
    head1,
  },
  methods: {
    da(i) {
      this.num = i;
    },
    td1(i) {
      this.tdnum = i;
      if (i == 0) {
        this.goods = this.res[0].content;
      } else if (i == 1) {
        this.goods = this.res[1].content;
      } else {
        this.goods = this.res[2].content;
      }
      // console.log(this.goods);
    },
    // 轮播图列表
    getbanner() {
      getBanner().then((res) => {
        this.banner = res.list;
      });
    },
    // 商品列表
    getgoods() {
      getHomeGoods().then((res) => {
        this.res = res.list;
        this.goods = res.list[0].content;
      });
    },
    // 分类列表
    async getlist(){
      this.list = await getCartClass();
      // console.log(this.list,1111111111);
    }
  },
  mounted() {
    this.getbanner();
    this.getgoods();
    this.getlist();
  },
};
</script>

<style src='../assets/css/home.css' scoped>
.home {
  background-color: rgb(241, 239, 239);
}
</style>