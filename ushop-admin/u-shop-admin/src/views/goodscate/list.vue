<template>
  <div>
    <el-table
      :data="catelist"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      default-expand-all
    >
      <el-table-column prop="id" label="分类编号" width="100px">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="item">
          <div>
            <img v-if="item.row.pid !=0&&item.row.img!=''" class='imgInfo' :src="$imgUrl+item.row.img" alt="">
            <!-- 如果没有图片，你可以指定默认图片或者提示用户暂无数据 -->
             <img v-if="item.row.pid !=0&&item.row.img==''" class='imgInfo' src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg" alt="">
          </div>
        </template>
         </el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="del(item.row.id)"
              size="mini"
              icon="el-icon-delete"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteCate } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    //页面一加载调用接口
    this.getCateList();
  },
  computed: {
    ...mapGetters({
      catelist: "goodscate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "goodscate/getCateListAction",
    }),
    //封装一个编辑事件
    edit(id) {
      //把id传递给父组件
      this.$emit("edit", id);
    },
    //封装一个山删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCate({ id }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getCateList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.imgInfo{
  width:120px;
  height:120px
}
</style>
