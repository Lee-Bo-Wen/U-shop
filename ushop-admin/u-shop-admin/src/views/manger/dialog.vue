<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="diaInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form
        :model="mangerForm"
        :rules="rules"
        ref="mangerForm"
        label-width="100px"
      >
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="mangerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="mangerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="mangerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="mangerForm.status"
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
import { getRoleList, addUser, getUserInfo, editUser } from "../../util/axios";
export default {
  data() {
    return {
      mangerForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      //规则设定
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        // password: [
        //   //失去焦点的验证
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   //字符串长度验证 产品经理设定
        //   {
        //     min: 6,
        //     max: 16,
        //     message: "长度在 6 到 16 个字符",
        //     trigger: "blur",
        //   },
        // ],
      },
      //rolelist 角色列表
      rolelist: [],
    };
  },
  props: ["diaInfo"],
  mounted() {
    //组件一加载 就调用菜单列表
    getRoleList().then((res) => {
      if (res.code == 200) {
        this.rolelist = res.list;
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
      this.mangerForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
      //清空验证规则
      this.$refs.mangerForm.resetFields();
    },
    //封装一个查询单条事件
    lookup(uid) {
      getUserInfo({ uid }).then((res) => {
        console.log(res, "管理员单条");
        if (res.code === 200) {
          this.mangerForm = res.list;
          this.mangerForm.uid = uid;
          //编辑的时候，如果密码为空就是不改，如果修改密码直接修改
          //给密码置空
          this.mangerForm.password = ''
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.mangerForm.validate((val) => {
        if (val) {
          //调用接口
          if (this.diaInfo.isAdd) {
            //添加接口
            addUser(this.mangerForm).then((res) => {
              // console.log(res,'添加管理员');
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表 这种方式是整体刷新，违背了单页应用局部刷新
                // location.reload();
                //重新调用父组件接口
                 this.$emit('init')
              }
            });
          } else {
            //编辑接口
            editUser(this.mangerForm).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //重新调用父组件接口
                 this.$emit('init')
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
