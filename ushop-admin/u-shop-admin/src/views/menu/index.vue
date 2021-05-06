<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button
      @click="addDialog"
      class="add_to"
      icon="el-icon-edit-outline"
      size="small"
      round
      plain
      >添加</el-button
    >
    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
    <!-- 
            弹框 父子组件传输
                父传子打开弹框；
                子传父关闭弹框；
        -->
    <v-dialog ref='diaInfo' @cancle="cancle" :diaInfo="diaInfo"></v-dialog>
  </div>
</template>
<script>
// 引入列表
import vList from "./list";
// 引入弹框
import vDialog from "./dialog";
export default {
  data() {
    return {
      diaInfo: {
        isShow: false, //控制弹框显示的开关
        isAdd: true, //用了控制添加和编辑
      },
    };
  },
  components: {
    vList,
    vDialog,
  },
  methods: {
    addDialog() { 
      //操作开关控制弹框显示的事件
      this.diaInfo.isShow = true;
      this.diaInfo.isAdd = true;
    },
    //子组件操作关闭弹框
    cancle(e) {
      this.diaInfo.isShow = e;
    },
    edit(e){
      //打开弹框
      this.diaInfo.isShow = true;
      //告诉弹框这是一个编辑
      this.diaInfo.isAdd = false;
      this.$refs.diaInfo.lookup(e)
    }
  },
};
</script>

<style lang="stylus" scoped>
.add_to {
  margin: 10px;
  margin-left: 0;
  background: #ccc;
  border-color: #999;
  color: #000;
}
</style>
