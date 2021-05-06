<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="diaInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="roleForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <!--           el-tree
            data	展示数据	array 
            show-checkbox	节点是否可被选择
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props
            label	指定节点标签为节点对象的某个属性值
            children	指定子树为节点对象的某个属性值
            default-expand-all	是否默认展开所有节点
            check-strictly	在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
            -->
          <el-tree
            ref="tree"
            :data="menulist"
            show-checkbox
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
            default-expand-all
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, addRole, getRoleInfo, editRole } from "../../util/axios";
export default {
  data() {
    return {
      roleForm: {
        rolename: "", //角色名称
        menus: [], //角色权限 id数组 [1,2,3] 后端接收的时候需要的是一个逗号分隔的字符串 或者 '[2,3,4]' 字符串数组
        status: 1, //状态1正常2禁用
      },
      //规则设定
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      //menulist 菜单列表
      menulist: [],
    };
  },
  props: ["diaInfo"],
  mounted() {
    //组件一加载 就调用菜单列表
    getMenuList().then((res) => {
      if (res.code == 200) {
        this.menulist = res.list;
      }
    });
  },
  methods: {
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.roleForm = {
        rolename: "", //角色名称
        menus: [], //角色权限 id数组 [1,2,3] 后端接收的时候需要的是一个逗号分隔的字符串 或者 '[2,3,4]' 字符串数组
        status: 1, //状态1正常2禁用
      };
      //清空验证规则
      this.$refs.roleForm.resetFields();
      //清空tree结构选择状态
      this.$refs.tree.setCheckedKeys([]);
    },
    //封装一个查询单条事件
    lookup(id) {
      getRoleInfo({ id }).then((res) => {
        console.log(res, "角色单条");
        if (res.code === 200) {
          this.roleForm = res.list;
          //给角色权限重新赋值
          //this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
          this.$refs.tree.setCheckedKeys(JSON.parse(this.roleForm.menus));
          this.roleForm.id = id;
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.roleForm.validate((val) => {
        if (val) {
          //针对于menu参数进行数据变更

          //this.$refs.tree.getCheckedKeys() [2, 5, 4] 后端要求的是字符串
          // this.roleForm.menus = this.$refs.tree.getCheckedKeys()
          //   ? this.$refs.tree.getCheckedKeys().join(",")
          //   : "";
          //后端要求我们传入'[1,2,3]'
             this.roleForm.menus = this.$refs.tree.getCheckedKeys()
            ? JSON.stringify(this.$refs.tree.getCheckedKeys())
            : "";
          //调用接口
          if (this.diaInfo.isAdd) {
            //添加接口
            addRole(this.roleForm).then((res) => {
              // console.log(res,'添加角色');
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                location.reload();
              }
            });
          } else {
            //编辑接口
            editRole(this.roleForm).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                location.reload();
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
