<script lang="ts">
export default {
  options: {
    addGlobalClass: true // 解决tabbar样式隔离导致的<AtIcon />图标无法显示问题
  }
}
</script>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui-vue3'

import { storeToRefs } from 'pinia'
import { useSelectedStore } from '@/stores/selected'

import './custom-tab-bar.scss'

const store = useSelectedStore()
const { selected } = storeToRefs(store)

const systemInfo = Taro.getSystemInfoSync() // 获取系统信息
const theme: 'light' | 'dark' = systemInfo.theme || 'light'
console.log('systemInfo', systemInfo)
console.log('theme', theme)

const themeStyle = {
  light: {
    color: '#AAAAAA',
    activeColor: '#000000',
    backgroundColor: '#F9F9F9'
  },
  dark: {
    color: '#AAAAAA',
    activeColor: '#F5F5F5',
    backgroundColor: 'rgba(0, 0, 0, .65)'
  }
}
const tabBarList = [
  {
    title: '首页',
    icon: 'home',
    url: '/pages/index/index'
  },
  {
    title: '我的',
    icon: 'user',
    url: '/pages/my/my'
  }
]
function switchTab(index: number, url: string) {
  // const isAuthorized = Taro.getStorageSync('isAuthorized') || false
  // const authorizeInterception = ['/pages/my/my']
  // if (!isAuthorized && authorizeInterception.includes(url)) {
  //   Taro.navigateTo({
  //     url: `/subpackages/login/index?redirect=${encodeURIComponent(url)}&index=${index}`
  //   })
  // } else {
  //   store.setSelected(index)
  //   Taro.switchTab({ url })
  // }
  store.setSelected(index)
  Taro.switchTab({ url })
}
</script>
<template>
  <view class="m-tab-bar" :style="`background-color: ${themeStyle[theme].backgroundColor};`">
    <view class="m-tab-bar-item" v-for="(tabBar, index) in tabBarList" :key="index" @tap="switchTab(index, tabBar.url)">
      <AtIcon class="u-icon" :value="tabBar.icon" v-show="selected === index" :color="themeStyle[theme].activeColor" />
      <AtIcon class="u-icon" :value="tabBar.icon" v-show="selected !== index" :color="themeStyle[theme].color" />
      <text class="u-view"
        :style="{ color: selected === index ? themeStyle[theme].activeColor : themeStyle[theme].color }">{{ tabBar.title
        }}</text>
    </view>
  </view>
</template>
