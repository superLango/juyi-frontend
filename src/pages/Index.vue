<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img class="carousel-img" :src="image"/>
    </van-swipe-item>
  </van-swipe>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>
  <van-search placeholder="请输入搜索关键词" v-model="username" shape="round" @search="searchUser"/>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <user-card-list :user-list="userList" :loading="loading"/>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
  </van-pull-refresh>
</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<boolean>(false);

const username = ref('');

const userList = ref([]);

// const loading = ref(true);


const loading = ref(false);
const onRefresh = () => {
  loadData()
  setTimeout(() => {
    showSuccessToast('刷新成功');
    loading.value = false;
  }, 1000);
};

/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式 ，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showFailToast('请求失败');
        })
  } else {
    // 普通模式，直接分页查询
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    console.log(userList)
  }
  loading.value = false;
}

const searchUser = async (username) => {
  const res = await myAxios.get("/user/search?username=" + username)
  if (res?.code === 0) {
    if (res.data) {
      res.data.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
    }
    userList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

watchEffect(() => {
  loadData()
})

import img1 from "../assets/carousel/1.jpeg"
import img2 from "../assets/carousel/2.jpeg"
import img3 from "../assets/carousel/3.jpeg"
import img4 from "../assets/carousel/4.jpeg"

const images = [
  img1, img2, img3, img4

];

</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100px;
}
</style>