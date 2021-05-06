<template>
  <div class="table">
    <!-- 添加列表 -->
    <el-table
      :data="list"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="120">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="120">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success"> 启用 </el-tag>
            <el-tag v-else type="danger"> 禁用 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <div slot-scope="item">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(item.row.id)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(item.row.id)"
          ></el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入封装好的菜单列表
import { delMenu, getMenuList } from "../../util/axios";

export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    //菜单列表接口调取
    getMenuList().then((res) => {
      res.code == 200 ? (this.list = res.list) : this.$message.error(res.msg);
    });
  },
  methods: {
    //封装一个删除事件
    del(id) {
      this.$confirm("确定要删除此数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            res.code == 200
              ? (this.$message.success(res.msg),
                setTimeout(() => {
                  location.reload();
                }, 500))
              : this.$message.error(res.msg);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装一个编辑事件,给父组件传值
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>


<style lang="stylus" scoped>
.el-table {
  background: #f2f2f2;
}
</style>