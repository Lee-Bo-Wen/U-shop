<template>
  <div class="login">
    <!-- 登录输入框 -->
    <!-- el-from
            model 表单数据对象 object 
         -->
    <div class="videobox">
      <video
        muted
        loop="loop"
        autoplay="autoplay"
        class="viedo"
        src="../assets/video/login.mp4"
      ></video>
    </div>
    <div class="viedoplay">
      
    </div>
    <div class="bgc">
      <el-form
        :model="loginInfo"
        label-width="100px"
        class="loginForm"
        ref="login"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="inp" v-model="loginInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../util/axios";
export default {
  data() {
    return {
      //表单数据
      loginInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          //trigger: 'blur'失焦验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符串长度验证
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          //trigger: 'blur'失焦验证
          { required: true, message: "请输入密码", trigger: "blur" },
          //字符串长度验证
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //封装一个登录
    login() {
      this.$refs.login.validate(() => {
        userLogin(this.loginInfo).then((res) => {
          res.code == 200
            ? (this.$store.dispatch("changeUserAction", res.list),
              this.$message.success(res.msg),
              this.$router.push("/home"))
            : this.$message.error(res.msg);
        });
      });
    },
    beforeRouteLeave(to, from, next) {
      sessionStorage.getItem("userInfo") == null
        ? (next("/login"), location.reload())
        : next();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -250px;
  width: 400px;
  height: 200px;
  background-color: rgba(255,255,255,.5);
  text-align center
  padding-right 70px
  padding-top 50px
}

.el-input__inner{  
	background-color: transparent; 
  height 300px
	border:1px solid #ccc;
}

</style>