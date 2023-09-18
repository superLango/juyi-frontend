<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          required
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          required
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div>
      <van-row justify="end">
        <van-col span="10" style="font-size: 14px;color: #1989fa" @click="doLogin">没有账号？点击注册</van-col>
      </van-row>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <div>
    <div
        style="width:300px;margin:0 auto; padding:20px 0;text-align: center;position: absolute;bottom: 50px;left: 30px;">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=62092202000136"
         style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="../assets/beian.png" style="float:left;"/>
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">甘公网安备
          62092202000136号</p></a>
      
    </div>
    <div
        style="width:300px;margin:0 auto; padding:20px 0;text-align: center;position: absolute;bottom: 30px;left: 30px;">
      <a target="_blank" href="https://beian.miit.gov.cn"
         style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">备案号&nbsp;陇ICP备2023001048号-1</p></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录')
  if (res.code === 0 && res.data){
    showSuccessToast('登录成功')
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
   window.location.href = redirectUrl;
  }else {
    showFailToast(`登录失败，${res.description}`)
  }
};

const doLogin = () => {
  router.push({
    path: "/user/register"
  })
}

</script>

<style scoped>

</style>