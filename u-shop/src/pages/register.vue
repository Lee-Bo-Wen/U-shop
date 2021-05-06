<template>
  <div>
    <head1></head1>
    <div class="cont">
      <img src="../assets/img/orange.png" alt="" />
      <van-form @submit="register">
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, validator, message: '请填写手机号' }]"
        />
      <van-field
        v-model="userInfo.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
//引入轻提示框
import { Toast } from "vant";
//引入封装好的接口
import { Register } from "../util/axios";
import head1 from "../components/head";
export default {
  data() {
    return {
      userInfo: {
        phone: "", //手机号
        nickname: "", //昵称
        password: "", //密码
      },
    };
  },
  components: {
    head1,
  },
  methods: {
    //自定义验证器 返回一个true或false
    validator(val) {
      return /1\d{10}/.test(val);
    },
    register() {
      Register(this.userInfo)
        .then((res) => {
          if (res.code == 200) {
            //跳转到登录
            this.$router.push("/login");
            Toast.success(res.msg);
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          console.log(err, "错误拦截");
        });
    },
  },
};
</script>

<style scoped>
.cont {
  background-color: #fff;
  width: 3.55rem;
  height: 6rem;
  margin: 0.1rem auto;
  overflow: hidden;
}
img {
  margin: 0 auto;
  margin-top: 1.6rem;
  margin-bottom: 0.3rem;
}
.van-button--info {
  background: #ff6040;
  border: 0;
  border-radius: 0;
}
</style>