<template>
  <div>
    <!-- <h1>分类</h1> -->
    <head2></head2>
    <div class="head">
      <input type="text" placeholder="按内容搜索" />
      <van-icon size=".28rem" color="#999" name="search" />
    </div>
    <div class="contant">
      <van-sidebar @change="change" v-model="activeKey">
        <van-sidebar-item
          v-for="item in list"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <div>
        <div class="cont">
          <h1>商品列表</h1>
          <ul class="clearfix">
            <li @click="tolist(item.id)" v-for="item in children" :key="item.id">
              <img
                :src="
                  item.img
                    ? $imgUrl + item.img
                    : 'https://img0.baidu.com/it/u=1986451467,394304688&fm=26&fmt=auto&gp=0.jpg'
                "
                alt=""
              />
              <p>{{ item.catename }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import head2 from "../components/head2";
import { getTreeGoods } from "../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      list: [],
      children: [],
    };
  },
  components: {
    head2,
  },
  mounted() {
    this.gettree();
  },
  methods: {
    gettree() {
      getTreeGoods().then((res) => {
        this.list = res.list;
        this.children = this.list[0].children;
      });
    },
    change(i) {
      this.children = this.list[i].children;
    },
    tolist(i){
      this.$router.push('/list?id='+i)
    }
  },
};
</script>

<style src='../assets/css/class.css' scoped>
</style>