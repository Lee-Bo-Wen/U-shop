<template>
  <div>
    <div class="header">
      {{$route.name}}
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
</style>