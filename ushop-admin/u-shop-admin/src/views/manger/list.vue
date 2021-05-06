<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
              @click="edit(item.row.uid)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="del(item.row.uid)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {delUser } from "../../util/axios";
export default {
  props: ["list"],
  methods: {
    //封装一个编辑事件
    edit(id) {
      //把id传递给父组件
      this.$emit("edit", id);
    },
    //封装一个山删除事件
    del(uid) {
      this.$confirm("你确定要删除这条数据吗？？？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ uid }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.$emit('init')
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

<style scoped></style>
