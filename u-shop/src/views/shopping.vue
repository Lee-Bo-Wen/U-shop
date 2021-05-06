<template>
  <div>
    <!-- <h1>gouwu</h1> -->
    <head1></head1>
    <van-tabs v-model="active">
      <van-tab :title="'全部(' + cartlist.length + ')'">
        <div class="title">
          <input type="radio" name="" id="radio" class="radio" />
          <label name="radio"></label>
          <i>小U自营</i>
          以免运费 | <span>领券</span>
        </div>
        <div class="cont">
          <ul v-if="cartlist.length > 0">
            <van-swipe-cell v-for="(item, idx) in cartlist" :key="item.id">
              <li>
                <div class="box1">
                  <input type="radio" class="inp" name="" id="bradio" />
                  <label name="bradio" @click="check1(idx)"></label>
                </div>
                <div class="box2">
                  <img :src="item.img ? $imgUrl + item.img : 'https://img2.baidu.com/it/u=2590128318,632998727&fm=26&fmt=auto&gp=0.jpg'" alt="" />
                </div>
                <div class="box3">
                  <p>{{ item.goodsname }}</p>
                  <p>暂无详细信息,敬请期待后续更新</p>
                  <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                  <p>比加入时降低￥100</p>
                  <p>
                    <i>￥</i><em>{{ item.price | toPrice }} </em>
                  </p>
                  <van-stepper
                    @plus="plus(idx)"
                    @minus="minus(idx)"
                    v-model="item.num"
                    min="1"
                    max="8"
                  />
                </div>
              </li>
              <template #right>
                <van-button
                  @click="del(idx)"
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                />
              </template>
            </van-swipe-cell>
            <!-- <li>
              <div class="box1">
                <input type="radio" name="" id="bradio" checked />
                <label name="bradio" for=""></label>
              </div>
              <div class="box2">
                <img src="../assets/img/02.png" alt="" />
              </div>
              <div class="box3">
                <p>系牧原山茶花泡沫 氨基酸...</p>
                <p>敏感肌可用，控油祛痘，男女...</p>
                <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                <p>必加入时降低￥100</p>
                <p><i>￥</i><em>999</em><del>1099</del>- <span>1</span> +</p>
              </div>
            </li>
            <li>
              <div class="box1">
                <input type="radio" name="" id="bradio" />
                <label name="bradio" for=""></label>
              </div>
              <div class="box2">
                <img src="../assets/img/03.png" alt="" />
              </div>
              <div class="box3">
                <p>系牧原山茶花泡沫 氨基酸...</p>
                <p>敏感肌可用，控油祛痘，男女...</p>
                <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                <p>必加入时降低￥100</p>
                <p><i>￥</i><em>999</em><del>1099</del>- <span>1</span> +</p>
              </div>
            </li> -->
          </ul>
          <!-- 无数据的列表的展示 -->
          <van-list v-else>
            <van-empty description="购物车空空如也，快去买买买！！！" />
          </van-list>
        </div>
        <!-- <div class="title">
          <input type="radio" name="" id="radio" class="radio" />
          <label name="radio"></label>
          <i>品牌精选</i>
          以免运费 | <span>领券</span>
        </div>
        <div class="cont">
          <ul>
            <li>
              <div class="box1">
                <input type="radio" name="" id="bradio" checked />
                <label name="bradio" for=""></label>
              </div>
              <div class="box2">
                <img src="../assets/img/01.png" alt="" />
              </div>
              <div class="box3">
                <p>系牧原山茶花泡沫 氨基酸...</p>
                <p>敏感肌可用，控油祛痘，男女...</p>
                <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                <p>必加入时降低￥100</p>
                <p><i>￥</i><em>999</em><del>1099</del>- <span>1</span> +</p>
              </div>
            </li>
            <li>
              <div class="box1">
                <input type="radio" name="" id="bradio" checked />
                <label name="bradio" for=""></label>
              </div>
              <div class="box2">
                <img src="../assets/img/02.png" alt="" />
              </div>
              <div class="box3">
                <p>系牧原山茶花泡沫 氨基酸...</p>
                <p>敏感肌可用，控油祛痘，男女...</p>
                <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                <p>必加入时降低￥100</p>
                <p><i>￥</i><em>999</em><del>1099</del>- <span>1</span> +</p>
              </div>
            </li>
            <li>
              <div class="box1">
                <input type="radio" name="" id="bradio" />
                <label name="bradio" for=""></label>
              </div>
              <div class="box2">
                <img src="../assets/img/03.png" alt="" />
              </div>
              <div class="box3">
                <p>系牧原山茶花泡沫 氨基酸...</p>
                <p>敏感肌可用，控油祛痘，男女...</p>
                <p>粉色500ML <van-icon color="#000" name="arrow-down" /></p>
                <p>必加入时降低￥100</p>
                <p><i>￥</i><em>999</em><del>1099</del>- <span>1</span> +</p>
              </div>
            </li>
          </ul>
        </div> -->
      </van-tab>
      <van-tab title="降价(4)">内容 2</van-tab>
      <van-tab title="常卖(2)">内容 3</van-tab>
      <van-tab title="分类">内容 4</van-tab>
    </van-tabs>
    <div class="foot">
      <div class="foot1">
        <input type="radio" name="" :checked="all" id="radio" class="radio" />
        <label @click="all1" name="radio"></label>全选
      </div>
      <div class="foot2">
        合计
        <p>已免运费</p>
      </div>
      <div class="foot3">￥{{ allp }}</div>
      <div class="foot4" @click="$router.push('/confirm')">结算</div>
    </div>
  </div>
</template>

<script>
// 引入头2组件
import head1 from "../components/head";
import { Dialog } from "vant";
import { getCartList, getCartEdit, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      v: true,
      active: 0,
      check: [],
      all: false,
      cartlist: {},
      allp: 0,
    };
  },
  mounted() {
    //购物车列表获取
    this.getCartList();
  },
  components: {
    head1,
  },
  methods: {
    //封获取购物车列表
    async getCartList() {
      this.cartlist = await getCartList({
        uid: JSON.parse(sessionStorage.getItem("user")).uid,
      });
      for (let i = 0; i < this.cartlist.length; i++) {
        this.check.push(false);
      }
    },
    // 加加
    async plus(i) {
      await getCartEdit({
        id: this.cartlist[i].id,
        type: 2,
      });
      if (this.check[i] == true) {
        this.allp += this.cartlist[i].price;
      }
    },
    // 减减
    async minus(i) {
      await getCartEdit({
        id: this.cartlist[i].id,
        type: 1,
      });
      if (this.check[i] == true) {
        this.allp -= this.cartlist[i].price;
      }
    },
    // 删除
    async del(i){
      if(this.check[i] == true){
        this.allp -= this.cartlist[i].price*this.cartlist[i].num;
      }
      await getCartDelete({
        id:this.cartlist[i].id
      })
      this.getCartList();
    },
    // 单选的选中
    check1(i) {
      let inp = document.getElementsByClassName("inp");
      this.check[i] = !this.check[i];
      inp[i].checked = this.check[i];
      if (this.check[i] == true) {
        this.allp += this.cartlist[i].price * this.cartlist[i].num;
      } else {
        this.allp -= this.cartlist[i].price * this.cartlist[i].num;
      }
      this.all = this.check.every((item) => item);
      console.log(this.all);
    },
    all1() {
      let inp = document.getElementsByClassName("inp");
      this.allp = 0;
      this.all = !this.all;
      this.check.map((item, i) => {
        inp[i].checked = this.all;
        if (this.all) {
          this.allp += this.cartlist[i].price * this.cartlist[i].num;
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    //判断当前操作者是否登录
    if (sessionStorage.getItem("user")) {
      next();
    } else {
      //调用消息确认框
      Dialog.confirm({
        title: "未登录",
        message: "当前未登录，赶快去登录！！！",
      })
        .then(() => {
          //确认逻辑
          next("/login");
        })
        .catch(() => {});
    }
  },
};
</script>

<style src='../assets/css/shopping.css' scoped>
</style>