<template>
  <div>
    <el-table :data="specslist" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="100px">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性" > 
        <template slot-scope="item">
          <div>
            <!-- {{item.row.attrs}} -->
            <el-tag type='info' v-for="attr in item.row.attrs" :key='attr'>{{attr}}</el-tag>
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
    <!-- 分页视图 -->
    <el-pagination
      :page-size="size"
      @current-change="onChange"
      background
      layout="prev, pager, next"
      :total="count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSpecsDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  mounted() {
    //页面一加载调用接口列表和总条数
    this.getSpecsList();
    this.getCount();
  },
  computed: {
    ...mapGetters({
      specslist: "goodsspecs/getSpecsList",
      size: "goodsspecs/getSize",
      count: "goodsspecs/getCount",
    }),
  },
  methods: {
    //页码切换触发的方式
    onChange(e) {
      //e 当前页码
      //触发修改页面的行动
      //  this.$store.dispatch('changePageAction',e)
      this.changePage(e);
    },
    ...mapActions({
      getSpecsList: "goodsspecs/getSpecsListAction",
      getCount: "goodsspecs/getCountAction",
      changePage: "goodsspecs/changePageAction",
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
          getSpecsDelete({ id }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getSpecsList();
              //重新调用总数
              this.getCount()
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
.imgInfo {
  width: 120px;
  height: 120px;
}
</style>
