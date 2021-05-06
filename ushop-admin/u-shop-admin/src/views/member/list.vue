<template>
  <div>
    <el-table
      :data="memberList"
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号" width="100px">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
              @click="edit(item.row.uid)"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this,'实例')
    //页面一加载就获取菜单列表
    this.getMemberList();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList"
    })
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction"
    }),
    //封装一个点击编辑按钮事件
    edit(uid) {
      this.$emit("edit", uid);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-table{
  margin-top:30px
}
</style>
