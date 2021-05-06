<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称"> </el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import { getSeckDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //页面一加载就获取轮播图列表
    this.getSeckList();
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList"
    })
  },
  methods: {
    ...mapActions({
            getSeckList:'seck/getSeckListAction'
    }),
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getSeckDelete({ id }).then(res => {
            if (res.code == 200) {
              this.getSeckList();
              this.$message.success(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //封装一个点击编辑按钮事件
    edit(id) {
      this.$emit("edit", id);
    }
  }
};
</script>

<style lang="stylus" scoped>
.imgurl
  width 120px
  height 120px
</style>
