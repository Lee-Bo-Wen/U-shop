<template>
  <div>
    <head1></head1>
    <div class="title">
      <div class="box">
        <p class="p1">代用名 199********</p>
        <p class="p2">北京 北京市 朝阳区 王四营镇中公教育五方桥教育基地</p>
      </div>
    </div>
    <div class="con">
      <div class="box1">
        <van-icon name="fire" color="#FF6040" /> 品牌优选
        <span class="s1">以免运费</span>
        <span class="s2"> | </span>
        <span class="s3">领券</span>
        <ul>
          <li>
            <div class="l">
              <img src="../assets/img/01.png" alt="" />
            </div>
            <div class="r">
              <p class="p1">氨基酸面膜 纯氨基酸养护皮肤Q弹可肌150ML</p>
              <p class="p2">￥<span>999</span><i>x1</i></p>
              <van-tag type="warning">7天无理由退货</van-tag>
              <van-tag type="warning">特价</van-tag>
            </div>
          </li>
          <li>
            <div class="l">
              <img src="../assets/img/01.png" alt="" />
            </div>
            <div class="r">
              <p class="p1">氨基酸面膜 纯氨基酸养护皮肤Q弹可肌150ML</p>
              <p class="p2">￥<span>999</span><i>x1</i></p>
              <van-tag type="warning">7天无理由退货</van-tag>
              <van-tag type="warning">特价</van-tag>
            </div>
          </li>
        </ul>
        <div class="b">
          <van-cell title="发票类型" is-link value="不开发票" />
          <van-cell title="售后免邮" value="部分商家赠送" />
          <van-cell title="买家留言" value="填写内容需要与商家协商并确认" />
        </div>
      </div>
      <van-submit-bar
        :price="199800"
        text-align="left"
        button-text="提交订单"
      />
    </div>
    <div class="o">
      <van-cell title="商品金额" value="￥1998" />
      <van-cell title="优惠活动" value="-￥200" />
      <van-cell title="优惠券" value="暂无可用" />
    </div>
  </div>
</template>

<script>
// 引入头组件
import head1 from "../components/head";
export default {
  data() {
    return {};
  },
  components: {
    head1,
  },
};
</script>

<style src='../assets/css/confirm.css' scoped>
</style>