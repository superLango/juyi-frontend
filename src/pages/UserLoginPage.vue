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