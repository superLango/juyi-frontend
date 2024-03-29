<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="team.teamAvatarUrl?team.teamAvatarUrl:test"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px;margin-top: 2px">{{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数：${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div>
          {{ '过期时间：' + (team.expireTime !== null ? team.expireTime : "永不过期") }}
        </div>
        <div>
          {{ '发布时间：' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" plain type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id || currentUser?.role===1" size="small" plain type="success"
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <!-- 仅加入队伍可见 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain type="warning"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id || currentUser?.role === 1" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import test from '../assets/test.jpg'
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

let emits = defineEmits(['refresh']);

const onRefresh = () => {
  emits("refresh")
}

const router = useRouter();

interface TeamCardListProps {
  teamList: TeamType[];

}

// noinspection TypeScriptValidateTypes
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const password = ref('')
const joinTeamId = ref();
const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () =>{
  joinTeamId.value = 0;
  password.value = ''
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    onRefresh()
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('退出成功');
    onRefresh()
  } else {
    showFailToast('退出失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('解散成功');
    onRefresh()
  } else {
    showFailToast('解散失败' + (res.description ? `，${res.description}` : ''));
  }
}


</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>