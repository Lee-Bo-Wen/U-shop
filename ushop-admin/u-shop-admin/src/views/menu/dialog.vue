<template>
  <div>
    <!-- before-close	关闭前的回调，会暂停 Dialog 的关闭	function(done)，done 用于关闭 Dialog	 -->
    <el-dialog
      :title="diaInfo.isAdd ? '添加菜单' : '编辑菜单'"
      center
      :before-close="cancle"
      :visible.sync="diaInfo.isShow"
    >
      <el-form :model="menufrom" :rules="rules" ref="menufrom">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="menufrom.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="menufrom.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menufrom.type" :label="1">目录</el-radio>
          <el-radio v-model="menufrom.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menufrom.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menufrom.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="menufrom.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menufrom.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button v-if="!diaInfo.isAdd" type="primary" @click="edit"
          >修 改</el-button
        >
        <el-button v-else type="primary" @click="add">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { addMenu, getMenuInfo, editMenu, getMenuList } from "../../util/axios";

export default {
  data() {
    return {
      //设定一个表单信息
      menufrom: {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      },
      formLabelWidth: "120px", //默认的label宽度
      menuList: [],
      //规则
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  props: ["diaInfo"], //接收父组件传递的isShow
  mounted() {
    //组件一加载就调用菜单列表接口
    getMenuList().then((res) => {
      res.code == 200
        ? (this.menuList = res.list)
        : this.$message.error(res.msg);
    });
  },
  methods: {
    cancle() {
      //子传父关闭弹框;同时可以修改el-dialog报错问题
      this.$emit("cancle", false);
      //情况输入框
      this.menufrom = {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      };
      this.$refs.menufrom.resetFields();
    },
    // 封装一个添加事件
    add() {
      this.$refs.menufrom.validate(() => {
        //调取添加接口
        addMenu(this.menufrom).then((res) => {
          res.code == 200
            ? (this.cancle(), location.reload())
            : this.$message.error(res.msg);
        });
      });
    },
    //封装一个查询一条数据（数据的回显）事件
    lookup(id) {
      //调取获取一条数据结构
      getMenuInfo({ id }).then((res) => {
        res.code == 200
          ? //取值在弹框中            //给对象添加id
            ((this.menufrom = res.list), (this.menufrom.id = id))
          : this.$message.error(res.msg);
      });
    },
    // 封装一个编辑菜单事件
    edit() {
      this.$refs.menufrom.validate(() => {
        //调取添加接口
        editMenu(this.menufrom).then((res) => {
          res.code == 200
            ? (this.cancle(), location.reload())
            : this.$message.error(res.msg);
        });
      });
    },
  },
};
</script>


<style lang="stylus" scoped></style>