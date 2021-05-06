<template>
  <div class="index">
    <!-- <h1>首页</h1> -->
    <router-view></router-view>
    <foot1></foot1>
  </div>
</template>

<script>
// 引入脚组件
import foot1 from "../components/foot";
export default {
  data() {
    return {};
  },
  components: {
    foot1,
  },
};
</script>

<style scoped>
.index {
  width: 3.75rem;
  margin: 0 auto;
  background-color: rgb(241, 239, 239);
}
</style>