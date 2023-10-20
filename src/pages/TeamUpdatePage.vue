<template>
  <div id="teamAddPage">
    <van-cell icon="photo-o" title="队伍头像" is-link center>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">
        <img :src="imgSrc" style="width: 48px;height: 48px;border-radius: 50%" alt=""/>
      </van-uploader>
    </van-cell>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!--        队伍名-->
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <!--        队伍描述-->
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <!--        过期时间-->
        <van-field
            style="margin: 10px 0"
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="calendar"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>

        <!--        队伍状态-->
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请输入密码' }]"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import moment from "moment";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import '../assets/icon/iconfont.css';

const router = useRouter();
const route = useRoute();

// 展示日期选择器
const showCalendar = ref(false);

const onConfirm = (date) => {
  let month: string | number = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  let day = date.getDate();
  day = day < 10 ? '0' + day : day
  let year = date.getFullYear()
  addTeamData.value.expireTime = `${year}-${month}-${day}`;
  showCalendar.value = false;
};

// 需要用户填写的表单数据
const addTeamData = ref({})

const id = route.query.id;


const imgSrc = ref('');
// 获取队伍信息
onMounted(async () => {
  if (id <= 0) {
    showFailToast('加载失败');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
    imgSrc.value = res.data.teamAvatarUrl;
  } else {
  }
})

const fileList = ref([]);
const afterRead = async () => {
  let formData: any = new FormData();
  formData.append("id", id)
  formData.append("file", fileList.value[0].file)
  const res = await myAxios.post("/team/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res?.code === 0) {
    showSuccessToast("更新成功")
    imgSrc.value = res?.data
  } else {
    showFailToast("更新失败：" + res.data.message)
  }
  fileList.value = []
}

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('更新成功');
    router.push({
      path: '/team',
      replace: true
    });
  } else {
    showFailToast('更新失败')
  }
}

</script>

<style scoped>

</style>