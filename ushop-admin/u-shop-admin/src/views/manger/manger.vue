<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add" size="small" plain>添加</el-button>
    <!-- 列表 -->
    <v-list @init='init' :list="list" @edit="edit"></v-list>
    <!-- 弹框的渲染 -->
    <v-dialog
      @init="init"
      ref="diaRef"
      @cancel="cancel"
      :diaInfo="diaInfo"
    ></v-dialog>
    <!-- 
      分页列表 
      background	是否为分页按钮添加背景色
      total	总条目数
      page-size	每页显示条目个数，支持 .sync 修饰符
      current-change	currentPage 改变时会触发(事件)

      前端的分页如何与后端进行交互
      当前有18条数据
      分页有两个属性是必须要填的！！！ size (每一页显示多少条) page（页码）
      size 是前端控制的（取决于产品经理） 5条（默认）
      size  page  后端返回    剩余
      5     1       5         剩余 13
      5     2      5          剩余 8
      5     3       5         剩余3 
      5     4       5（它有多少返回多少，最多返回5）  剩余 0
    -->
    <el-pagination
      :page-size="pageInfo.size"
      background
      layout="prev, pager, next"
      :total="pageInfo.count"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入封装好的接口
import { getUserCount, getUserList } from "../../util/axios";
//引入封装好的列表
import vList from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      diaInfo: {
        isShow: false, //用于控制弹框的显示隐藏
        isAdd: true, //是否是添加
      },
      pageInfo: {
        size: 2, //显示条目
        page: 1, //页码
        count: 0, //总条数
      },
      list: [],
    };
  },
  components: {
    vList,
    vDialog,
  },
  mounted() {
    //组件一加载 调用初始化方法
    this.init();
  },
  methods: {
    //封装总数函数
    getCount() {
      getUserCount().then((res) => {
        if (res.code === 200) {
          console.log(res, "总数");
          this.pageInfo.count = res.list[0].total;
        }
      });
    },
    //封装列表函数
    getList() {
      getUserList({
        size: this.pageInfo.size,
        page: this.pageInfo.page,
      }).then((res) => {
        if (res.code === 200) {
          console.log(res, "总管理员列表");
          this.list = res.list ? res.list :[]
          //情景判断，如果不是第一页，删除其他页最后一条数据会出现一个空数组状态，这个是不符合需求
          //解决这个bug思路 如果它不是第一页并且它是空数据，我就page减一并且调取列表
          if(this.pageInfo.page>1&&this.list.length==0){
            //页码减一
            this.pageInfo.page-- 
            //重新调用接口
            this.getList()
            return
          }
          this.list = res.list;
        }
      });
    },
    init() {
      //初始化数据函数
      //调取总数接口
      this.getCount();
      //调取接口列表
      this.getList();
    },
    //封装一个修改页码触发是事件
    changePage(e) {
      //e代表的是当前页码
      console.log(e, "eeeeeeeeee");
      //重新给初识页码赋值
      this.pageInfo.page = e
      //重新调取列表
      this.getList()
    },
    //封装点击添加出现弹框事件
    add() {
      //弹框出现
      this.diaInfo.isShow = true;
      //我是一个添加弹框
      this.diaInfo.isAdd = true;
    },
    //子控制父关闭弹框
    cancel(e) {
      this.diaInfo.isShow = e;
    },
    //封装一个点击编辑出现弹框事件
    edit(e) {
      //打开弹框
      this.diaInfo.isShow = true;
      //告诉弹框你是个编辑
      this.diaInfo.isAdd = false;
      //调用子组件中封装好的单条查询方法
      this.$refs.diaRef.lookup(e);
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-button{
    margin 10px
}
</style>
