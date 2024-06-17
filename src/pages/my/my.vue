<template>
  <view>
    <view @click="handleclick">我的</view>

    <customTabBar></customTabBar>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import './my.scss'

import Taro from '@tarojs/taro'

import customTabBar from '../custom-tab-bar/custom-tab-bar.vue'

function handleclick(){
  console.log(1111)
}

</script>
