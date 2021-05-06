<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add" size="small" plain>添加</el-button>
    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
    <!-- 弹框的渲染 -->
    <v-dialog ref="diaRef" @cancel='cancel' :diaInfo='diaInfo'></v-dialog>
  </div>
</template>

<script>
//引入封装好的列表
import vList from "./list";
import vDialog from './dialog'
export default {
  data() {
    return {
      diaInfo:{
        isShow:false,//用于控制弹框的显示隐藏
        isAdd:true //是否是添加
      }
    };
  },
  components: {
    vList,
    vDialog
  },
  methods: {
    //封装点击添加出现弹框事件
    add(){
      //弹框出现
      this.diaInfo.isShow = true
      //我是一个添加弹框
      this.diaInfo.isAdd = true
    },
    //子控制父关闭弹框
    cancel(e){
      this.diaInfo.isShow = e
    },
    //封装一个点击编辑出现弹框事件
    edit(e){
      //打开弹框
      this.diaInfo.isShow = true
      //告诉弹框你是个编辑
      this.diaInfo.isAdd = false
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
