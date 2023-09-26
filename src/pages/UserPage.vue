<template>
  <template v-if="user">
    <van-space style="margin-left: 20px">
      <van-image
          round
          width="80"
          height="80"
          :src="user?.avatarUrl"
          @click="toUserUpdatePage"
      />
      <van-cell :title="user.username" is-link to="/user/update" style="width: 260px" :center="true">
        <template #label>
          <div style="width: 60%;">
            <van-text-ellipsis :content="user.profile ? user.profile : '点此编辑个性签名'" @click.stop="toEditProfile"/>
          </div>
        </template>
      </van-cell>
    </van-space>
    <van-cell center style="margin-top: 15px">
      <template #title>
        <span style="margin-left: 20px">我的标签：</span>
      </template>
<!--      <template #value>-->
<!--        <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">-->
<!--          {{ tag }}-->
<!--        </van-tag>-->
<!--      </template>-->
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 2px">{{ tag }}
        </van-tag>
      </template>
    </van-cell>
  </template>
  <van-divider />
  <van-grid :column-num="3">
    <van-grid-item text="创建的队伍" to="/user/team/create">
      <template #icon>
      <van-icon style="font-size: 25px;padding-bottom: 8px;color: #1989FA" class="iconfont" class-prefix="icon" name="duiwu" />
      </template>
    </van-grid-item>
    <van-grid-item text="加入的队伍" to="/user/team/join">
      <template #icon>
        <van-icon style="font-size: 25px;padding-bottom: 8px;color: #00EEB3" class="iconfont" class-prefix="icon" name="duiwu1" />
      </template>
    </van-grid-item>
    <van-grid-item text="联系作者" >
      <template #icon>
        <van-icon style="font-size: 25px;padding-bottom: 8px;color: #00C800" class="iconfont" class-prefix="icon" name="weixin" />
      </template>
    </van-grid-item>
    <van-grid-item text="直达仓库" >
      <template #icon>
        <van-icon style="font-size: 25px;padding-bottom: 8px;color: #191717" class="iconfont" class-prefix="icon" name="GitHub" />
      </template>
    </van-grid-item>
    <van-grid-item text="设置" >
      <template #icon>
        <van-icon style="font-size: 25px;padding-bottom: 8px;" class="iconfont" class-prefix="icon" name="shezhi" />
      </template>
    </van-grid-item>
    <van-grid-item text="点击退出" @click="logout">
      <template #icon>
        <van-icon style="font-size: 25px;padding-bottom: 8px;color: #D81E06" class="iconfont" class-prefix="icon" name="tuichu" />
      </template>
    </van-grid-item>
  </van-grid>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import '../assets/icon/iconfont.css';
import {UserType} from "../models/user";

// const user = {
//   id: 1,
//   username: 'lango',
//   userAccount: 'superlango',
//   avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F23%2F20200423072218_fsglf.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685952700&t=20aa70d4359109d330f369e500e112fe',
//   gender: '男',
//   phone: '12345687',
//   email: '13543218@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const logout = async () => {
  let res = await myAxios.post("/user/logout");
  if (res?.code === 0) {
    showSuccessToast("退出成功")
    await router.replace("/user/login")
  } else {
    showFailToast("内部错误," + res?.message)
  }
}

const toEditProfile = () => {
  router.push({
    path: "/user/edit",
    query: {
      editKey: "profile",
      editName: "个性签名",
      editValue: user.value.profile
    }
  })
}
const toUserUpdatePage = () => {
  router.push("/user/update")
}

</script>

<style scoped>
#button-bottom {
  width: 100%;
  position: absolute;
  bottom: 60px;
}

.button {
  text-align: center;
}

.van-button {
  width: 300px;
}

</style>