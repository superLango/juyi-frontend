<template>
  <div id="teamAddPage">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      若不设置过期时间则永久有效！
    </van-notice-bar>
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
<!--        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              type="datetime"
              title="请选择过期时间"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :min-date="minDate"/>
        </van-popup>-->

        <van-field
            style="margin: 10px 0"
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="calendar"
            label="过期时间："
            placeholder="点击选择过期时间"
            @click="showCalendar = true"
        />
        <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>

        <!--        最大人数-->
        <van-field name="stepper" label="请选择最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
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

import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import moment from "moment";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter();

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

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0
}

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('添加成功');
    router.push({
      path: '/team',
      replace: true
    });
  } else {
    showFailToast(`添加失败，${res.description}`)
  }
}

</script>

<style scoped>

</style>