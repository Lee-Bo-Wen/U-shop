<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
              @click="edit(item.row.id)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="del(item.row.id)"
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
import { getRoleList, delRole } from "../../util/axios";
export default {
  data() {
    return {
      rolelist: [],
    };
  },
  mounted() {
      //页面一加载调用接口
      this.getRolelist()
  },
  methods: {
    //封装获取列表事件
    getRolelist() {
      //页面一加载调用角色列表
      getRoleList().then((res) => {
        if (res.code === 200) {
          this.rolelist = res.list;
        }
      });
    },
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
          delRole({ id }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //重新获取列表
              this.getRolelist()
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
