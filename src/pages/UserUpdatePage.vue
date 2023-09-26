<template>
  <template v-if="user">
    <van-cell title="头像" is-link center>
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="shilikapian" />
      </template>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">
        <img :src="imgSrc" style="width: 48px;height: 48px;border-radius: 50%"/>
      </van-uploader>
    </van-cell>
    <van-cell title="昵称" is-link :value="user.username"
              @click="toEdit('username','昵称' ,user.username)">
      <template #icon>
      <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="customer-center" />
      </template>
    </van-cell>
    <van-cell title="账号" :value="user.userAccount">
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="customer-center" />
      </template>
    </van-cell>
    <van-cell title="性别" is-link @click="()=>showPicker=true">
      <span v-if="user.gender===1">男</span>
      <span v-if="user.gender===0">女</span>
      <span v-if="user.gender===2">保密</span>
      <span v-if="user.gender===null">{{ "还没有填写性别" }}</span>
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="xingbie" />
      </template>
    </van-cell>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
          title="性别"
          :columns="genders"
          @confirm="onConfirmGender"
          @cancel="()=>showPicker=false"
      />
    </van-popup>
    <van-cell title="个性签名" is-link @click="toEdit('profile','个性签名' ,user.profile)">
      <template #value>
        <van-text-ellipsis :content="user.profile ? user.profile : '还没有填写个性签名'"/>
      </template>
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="discount" />
      </template>
    </van-cell>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话' ,user.phone)">
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="phone" />
      </template>
    </van-cell>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱' ,user.email)">
      <template #icon>
        <van-icon style="padding-right: 5px" class="iconfont" class-prefix="icon" name="email" />
      </template>
    </van-cell>
    <van-cell title="注册时间" :value="user.createTime">
      <template #icon>
        <van-icon style="font-size: 23px;margin-left: -5px;padding-right: 3px" class="iconfont" class-prefix="icon" name="shijian" />
      </template>
    </van-cell>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
// 引入自定义图标
import '../assets/icon/iconfont.css';

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
const showPicker = ref(false);
const genders = [
  {text: '男', value: '1'},
  {text: '女', value: '0'},
  {text: '保密', value: '2'}
];


async function getUser() {
  let currentUser = await getCurrentUser();
  if (currentUser) {
    user.value = await getCurrentUser();
    imgSrc.value = user.value.avatarUrl
  } else {
    showFailToast("未登录")
    await router.replace("/user/login")
  }
}

onMounted(async () => {
  await getUser()
})

console.log(user)

const router = useRouter();

const toEdit = (editKey: string, editName: string, editValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      editValue,
    }
  })
}

const fileList = ref([]);
const imgSrc = ref('')

const afterRead = async () => {
  let formData = new FormData();
  formData.append("file", fileList.value[0].file)
  const res = await myAxios.post("/user/upload", formData, {
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

const onConfirmGender = async ({selectedValues}) => {
  const res = await myAxios.post("/user/update", {
    'id': user.value.id,
    gender: selectedValues[0]
  })
  if (res?.code === 0) {
    showSuccessToast("修改成功")
  } else {
    showFailToast("修改失败")
  }
  showPicker.value = false
  await refresh()
};

const refresh = async () => {
  await getUser()
}

</script>

<style scoped>

</style>