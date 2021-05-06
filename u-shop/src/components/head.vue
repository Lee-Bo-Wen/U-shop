<template>
  <div>
    <div class="header">
      {{$route.name}}
      <div class="header_img">
        <img @click="$router.go(-1)" src="../assets/img/左箭头.png" />
      </div>
    </div>
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
.header {
  width: 3.75rem;
  height: 0.44rem;
  line-height: 0.44rem;
  font-family: Helvetica;
  font-size: 0.17rem;
  color: #FFFFFF;
  letter-spacing: 0;
  background-color: #FF6040;
  text-align: center;
  position: relative;
}
.header .header_img {
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  left: 0.17rem;
  top: 0.12rem;
  margin-right: 1.5rem;
}
.header .header_img img {
  width: 0.2rem;
  height: 0.2rem;
}
.header span {
  opacity: 0.8;
}
</style>