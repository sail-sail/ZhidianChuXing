<template>
  <tm-app>
    <view class="container">
      <tm-card title="基本信息">
        <template v-slot:content>
          <view class="base-content">
            <tm-cell :margin="[0, 0]" :titleFontSize="30" title="昵称">
              <template v-slot:rightText>
                {{ base.nickname }}
              </template>
            </tm-cell>
            <tm-cell :margin="[0, 0]" :titleFontSize="30" title="个人头像" @click="upload">
              <template v-slot:rightText>
                <tm-avatar :img="base.avatar" :round="12" :size="65"></tm-avatar>
              </template>
            </tm-cell>
            <tm-cell :margin="[0, 0]" :titleFontSize="30" title="手机号">
              <template v-slot:rightText>
                {{ base.phone }}
              </template></tm-cell>
            <tm-cell :margin="[0, 0]" :titleFontSize="30" title="紧急联系人">
              <template v-slot:rightText>
                {{ base.emergencyContact === '' ? '去添加' : base.emergencyContact }}
              </template></tm-cell>
          </view>
        </template>
      </tm-card>

      <tm-card title="证照信息">
        <template v-slot:content>
          <view class="certificate-content">
            <tm-cell :margin="[0, 0]" :padding="[0, 15]" :titleFontSize="30" title="身份证" rightIcon=""></tm-cell>
            <tm-image :width="650" :height="230" src="https://store.tmui.design/api_v2/public/random_picture"
              @click="certificate('idCard')"></tm-image>
            <tm-cell :margin="[0, 0]" :padding="[0, 15]" :titleFontSize="30" title="驾驶证" rightIcon=""></tm-cell>
            <tm-image :width="650" :height="230" src="https://store.tmui.design/api_v2/public/random_picture"
              @click="certificate('driverCard')"></tm-image>
          </view>
        </template>
      </tm-card>

      <tm-button font-color="#fff" :margin="[70, 20]" :round="10" :width="600">退出登录</tm-button>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
} from './Api'

// import {
//   upLoadImg
// } from '@/util/util'

let base = $ref<any>({
  nickname: '中国移动',
  avatar: "https://picsum.photos/200/300",
  phone: '13800138000',
  emergencyContact: ''
})

async function upload() {
  const imgs = await upLoadImg()
  if (imgs && Array.isArray(imgs)) {
    base.avatar = imgs[0]
  }
}
function certificate(type: string) {
  if (type === 'idCard') {
    uni.navigateTo({
      url: '/pages/idCard/index'
    })
  } else {
    uni.navigateTo({
      url: '/pages/driverCard/index'
    })
  }
}

onMounted(async () => {
})


</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 246, 250);
}

.base-content {
  width: 100%;
  height: auto;
}

.certificate-content {
  width: 100%;
  overflow: auto;
  height: 600rpx;
}
</style>
