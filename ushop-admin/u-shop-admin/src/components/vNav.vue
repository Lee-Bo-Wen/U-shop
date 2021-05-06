<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      background-color="#444"
      text-color="#fff"
      active-text-color="#f00"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        v-for="item in getUserInfo.menus"
        :index="item.id.toString()"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="menu in item.children"
          :index="menu.url"
          :key="menu.id"
        >
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    //组件一加载切换path选中状态
    this.defaultActive = this.$route.path;
  },
  computed: {
    //获取vuex中的属性
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 90vh;
  font-size: 18px;
}
</style>
