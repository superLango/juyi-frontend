<template>
  <div id="teamPage">
    <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>
    <team-card-list :team-list="teamList" />
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue"
import {onMounted, ref} from "vue";

const router = useRouter();

// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

// 页面加载时只触发一次
onMounted(async () => {
  const res = await myAxios.get("/team/list");
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showFailToast('加载队伍失败，请刷新重试');
  }
})

</script>

<style scoped>
#teamPage {

}
</style>