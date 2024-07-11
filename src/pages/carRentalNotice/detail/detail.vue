<template>
  <view class="container" v-if="data">
    <view class="notice">
      <view class="title">{{ data.title }}</view>
      <view class="createtime">{{ data.createtime }}</view>
      <image class="img-container" :src="imgUrl" />
    </view>
  </view>
</template>


<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted
} from 'vue'
import Taro from '@tarojs/taro'
import sendRequest from '../../../utils/http'
import common from '../../../utils/common'
import './detail.scss'

let data = ref<any>({})
let imgUrl = ref<string>('')

onBeforeMount(async () => {
  const query = Taro.useRouter().params
  if (query.id) {
    sendRequest({
      url: '/api/index.index/noticeDetail',
      data: {
        id: query.id,
      },
      success: res => {
        if (res.code == 1) {
          data.value = res.data
        }
        if (data.value.content) {
          let strs = common.extractImageSrc(data.value.content)
          let url = common.getImgUrl(strs[0])
          data.value.content = common.replaceImageSrc(data.value.content, strs[0], url)
          imgUrl.value = (common.extractImageSrc(data.value.content))[0]
        }
      }
    });
  }
})

onMounted(() => {

})
</script>
