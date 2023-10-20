<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <team-card-list :team-list="teamList" @refresh="onRefresh"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue"
import {onMounted, ref} from "vue";

const router = useRouter();

const searchText = ref('');

const teamList = ref([]);

const loading = ref(false);

const onRefresh = () => {
  listTeam()
  setTimeout(() => {
    // showSuccessToast('刷新成功');
    loading.value = false;
  }, 1000);
};

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

// 页面加载时只触发一次
onMounted(() => {
  listTeam();
})

const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>
#teamPage {

}
</style>