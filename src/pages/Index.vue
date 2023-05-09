<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()

const userList = ref([]);

onMounted(async () => {
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response) {
        console.log('/user/recommend succeed', response);
        showSuccessToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.error('/user/recommend error', error);
        showFailToast('请求失败');
      })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped>

</style>