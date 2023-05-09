<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from 'qs';

const route = useRoute()
const {tags} = route.query
const userList = ref([]);


onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        showSuccessToast('请求成功');
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        showFailToast('请求失败');
      })
  console.log(userListData)
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

// const mockUser = {
//   id: 12345,
//   username: 'string',
//   userAccount: '123456',
//   profile: '目前一位头发浓密的精神小伙，哈哈哈哈哈，谢谢大家，阿八八八八八八八八八八八八八',
//   avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F23%2F20200423072218_fsglf.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685952700&t=20aa70d4359109d330f369e500e112fe',
//   gender: 0,
//   phone: '12345678912',
//   email: 'string',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', 'python', '打工中', 'C++', 'Golang', 'html', 'js', 'ts', 'css'],
//   createTime: new Date(),
// }


</script>

<style scoped>

</style>