<template>
  <van-skeleton title avatar round :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username}`"
        :thumb="user.avatarUrl?user.avatarUrl:test"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 2px">{{ tag }}
        </van-tag>
      </template>

      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
      <template #price>
        <van-icon name="phone-o" style="color: #969799;margin-top: 5px">{{ '：' + user.phone }}</van-icon>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {UserType} from "../models/user";
import test from '../assets/test.jpg'

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];

}

// noinspection TypeScriptValidateTypes
const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

</script>

<style scoped>

</style>