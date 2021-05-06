<template>
  <div>
    <el-dialog
      title="编辑会员"
      :visible.sync="isShow"
      :before-close="cancel"
      center
    >
    <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="memberInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="memberInfo.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
        <p>留空则不修改密码</p>
          <el-input v-model="memberInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="memberInfo.status"
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
//引入封装好的接口
import { getMemberInfo, postEditMemeber } from "../../util/axios";
import { mapActions } from "vuex";
export default {
    props:['isShow'],
  data() {
    return {
       memberInfo: {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1 //状态1正常2禁用
      },
      formLabelWidth: "120px", //label宽度
      //规则验证
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max:11, message: "长度在 11个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max:8, message: "长度在 2~8个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction"
    }),
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.memberInfo = {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1 //状态1正常2禁用
      };
      //调用清空验证的方法
      this.$refs.memberInfo.resetFields();
    },
    //封装一个查询单条事件
    lookup(uid) {
      getMemberInfo({ uid }).then((res) => {
        if (res.code == 200) {
     this.memberInfo = res.list;
          this.memberInfo.uid = uid;
          this.memberInfo.password =''
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.memberInfo.validate((val) => {
        if (val) {
          //编辑接口
          postEditMemeber(this.memberInfo).then((res) => {
            if (res.code === 200) {
              //关闭弹框 清空验证
              this.cancel();
              //重新触发行动
              this.getMemberList();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
