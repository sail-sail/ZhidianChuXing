<template>
  <view class="container">
    <view class="notice" v-for="item in noticeList" :key="item.id"
      v-on:touchstart="goToDetail(item.id)"
    >
      <view class="title">{{ item.title }}</view>
      <view class="createtime">{{ item.createtime }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import './carRentalNotice.scss'
import sendRequest from '../../utils/http'

let noticeList = ref<any>([])
async function getNoticeList() {
  sendRequest({
    url: '/api/index.index/bannerList',
    data: {},
    success: res => {
      if (res.code == 1) {
        noticeList.value = res.data.notice;
      }
    }
  })
}

function goToDetail(id:string){
  Taro.navigateTo({
    url: `/pages/carRentalNotice/detail/detail?id=${encodeURIComponent(id)}`,
  })
}

onMounted(async () => {
  await getNoticeList()
})
</script>
