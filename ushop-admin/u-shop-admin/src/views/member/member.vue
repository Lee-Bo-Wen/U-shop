<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
    <!-- 弹框的渲染 -->
    <v-dialog ref="diaRef" @cancel='cancel' :isShow='isShow'></v-dialog>
  </div>
</template>

<script>
//引入封装好的列表
import vList from "./list";
import vDialog from './dialog'
export default {
  data() {
    return {
        isShow:false,//用于控制弹框的显示隐藏
    };
  },
  components: {
    vList,
    vDialog
  },
  methods: {
    //子控制父关闭弹框
    cancel(e){
      this.isShow = e
    },
    //封装一个点击编辑出现弹框事件
    edit(e){
      //打开弹框
      this.isShow = true
      //调用子组件中封装好的单条查询方法
      this.$refs.diaRef.lookup(e)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button{
    margin 10px
}
</style>
