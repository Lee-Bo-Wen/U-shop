<template>
  <div>
      <ul>
          <router-link to="/home" tag="li" activeClass="active">
              <van-icon name="shop-o" color="#999999" size=".3rem"/>
              <p>商城</p>
          </router-link>
          <router-link to="/getcate" tag="li" activeClass="active">
              <van-icon name="gift-card-o" color="#999999" size=".3rem"/>
              <p>分类</p>
          </router-link>
          <router-link to="/shopping" tag="li" activeClass="active">
              <van-icon name="shopping-cart-o" color="#999999" size=".3rem"/>
              <p>购物车</p>
          </router-link>
          <router-link to="/my" tag="li" activeClass="active">
              <van-icon name="user-o" color="#999999" size=".3rem"/>
              <p>我的</p>
          </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang='less' scoped>
ul{
    background-color: #fff;
    width: 3.75rem;
    padding: .1rem 0;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    li{
        text-align: center;
        width: 0.4rem;
        height: 0.5rem;
        font-size: .12rem;
        color: #999999;
        p{
            margin-top: 0.07rem;
        }
    }
}
.active{
    color: #FF6040;
    .van-icon{
        color: #FF6040!important;
    }
}
</style>