<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="test"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px;margin-top: 2px">{{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '最大人数：' + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：' + team.expireTime }}
        </div>
        <div>
          {{ '发布时间：' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" plain type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import test from '../assets/test.png'
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

interface TeamCardListProps {
  teamList: TeamType[];

}

// noinspection TypeScriptValidateTypes
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});
/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id
  });
  if (res?.code === 0){
    showSuccessToast('加入成功');
  }else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>