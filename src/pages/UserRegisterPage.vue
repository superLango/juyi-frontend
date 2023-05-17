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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="密码"
          required
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次输入密码' }]"
      />
      <van-field
          v-model="planetCode"
          type="planetCode"
          name="planetCode"
          label="编号"
          required
          placeholder="请输入编号"
          :rules="[{ required: true, message: '请输入编号' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
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
const checkPassword = ref('')
const planetCode = ref('')
const onSubmit = async () => {
  const res = await myAxios.post('/user/register',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
  })
  console.log(res,'用户注册')
  if (res.code === 0 && res.data){
    showSuccessToast('注册成功')
    // 跳转到之前的页面
    window.location.href = '/user/login';
  }else {
    showFailToast(`注册失败，${res.description}`)
  }
};

</script>

<style scoped>

</style>