<template>
  <div>
    <!-- <h1>wo</h1> -->
    <head2></head2>
    <div class="top">
      <div class="top1">
        <div v-if="userInfo" class="box1">
          <img src="../assets/img/touxiang1.webp" alt="" />
        </div>
        <div v-else class="box1">
          <img src="../assets/img/01.png" alt="" />
        </div>
        <div v-if="userInfo" class="box2">
          <p>{{ userInfo.nickname }}</p>
          <span @click="logout" class="vv">你要离我而去吗</span>
        </div>
        <div v-else class="box2">
          <p>未登录</p>
          <span>完善资料让小U更懂你</span>
        </div>
        <div class="box3">
          <van-icon class="van" name="bill" size=".18rem" /> 每日签到
        </div>
      </div>
      <div class="top2">
        <ul>
          <li>
            <p>99+</p>
            <span>我的收藏</span>
          </li>
          <li>
            <p>99+</p>
            <span>浏览记录</span>
          </li>
          <li>
            <p>￥999...</p>
            <span>我的红包</span>
          </li>
          <li>
            <p>99+</p>
            <span>优惠券</span>
          </li>
        </ul>
      </div>
      <div class="top3">
        <div class="tt">
          <span>我的订单</span>
          <i>全部订单 <van-icon name="arrow" /></i>
        </div>
        <div>
          <van-grid>
            <van-grid-item icon="card" text="代付款" />
            <van-grid-item icon="gift-card" text="待收货" />
            <van-grid-item icon="comment" text="评价" />
            <van-grid-item icon="vip-card" text="售后/退款" />
          </van-grid>
        </div>
      </div>
    </div>
    <div class="con">
      <ul>
        <li>
          <van-icon class="van1" name="location-o" />
          <span> 地址管理</span>
          <van-icon class="van2" name="arrow" />
        </li>
        <li>
          <van-icon class="van1" name="pending-payment" />
          <span class="s3"> 我的钱包</span>
          <i>剩余999U币</i>
          <van-icon class="van2" name="arrow" />
        </li>
        <li>
          <van-icon class="van1" name="qr" />
          <span class="s2"> 我的二维码</span>
          <van-icon class="van2" name="arrow" />
        </li>
        <li>
          <van-icon class="van1" name="friends-o" />
          <span class="s2"> 我的小伙伴</span>
          <van-icon class="van2" name="arrow" />
        </li>
        <li>
          <van-icon class="van1" name="free-postage" />
          <span class="s4"> 0元试用</span>
          <van-icon class="van2" name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入头2组件
import head2 from "../components/head2";
import { Dialog } from "vant";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    //通过对存储的判断，然后渲染不同内容展示
    this.userInfo = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  },
  methods: {
    logout() {
      //调用消息确认框
      Dialog.confirm({
        title: "退出登录",
        message: "确定要退出登录吗？？？",
      })
        .then(() => {
          //确认逻辑
          //退出
          sessionStorage.removeItem("user");
          location.reload();
        })
        .catch(() => {});
    },
  },
  components: {
    head2,
  },
};
</script>

<style src='../assets/css/my.css' scoped>
</style>