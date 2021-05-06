<template>
  <div>
    <!-- 搭建基本布局 -->
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt="" />
          <span class="projctename">大型后台操作系统</span>
        </div>
        <div class="bgc">
          欢迎回来!{{ $store.getters.getUserInfo.username
          }}<el-button class="next" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <!-- 侧边栏菜单 -->
          <v-nav> </v-nav>
        </el-aside>
        <el-main class="main">
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/vNav";

export default {
  data() {
    return {};
  },
  components: {
    vNav,
  },
  methods: {
    //封装一个退出事件
    logout() {
      this.$store.dispatch("changeUserAction", false);
      //去登录页
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: $firstColor;
  line-height: 60px;
  font-size: 24px;
  color: $thirdColor;
}

.bgc {
  color: $thirdColor;
  font-size: 18px;
  float: right;
}

.next {
  background: $secondColor;
  color: $thirdColor;
  border: none;
}

.next:hover {
  color: $fourColor;
}

.main {
  background: #f2f2f2;
  height: 90vh;
}

.logo {
  float: left;
  width: 300px;
  height: 60px;
  color: $thirdColor;
  display: flex;
}

.logo img {
  width: 60px;
  height: 60px;
}

.projctename {
  flex: 1;
  text-align: center;
}
</style>