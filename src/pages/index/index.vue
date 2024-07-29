<template>
  <tm-app>
    <view class="container">
      <view class="carousel">
        <tm-carousel autoplay :margin="[0, 10]" :round="0" :width="750" :height="380" :list="bannerList"></tm-carousel>
      </view>
      <view class="content">
        <view class="city-address-pickup">
          <view class="city-address">
            <view>上海市</view>
            <view>&nbsp;|&nbsp;</view>
            <view>{{ address }}</view>
          </view>
          <view class="pickup">到店</view>
        </view>

        <tm-divider color="#efefef" :margin="[0, 0]"></tm-divider>

        <view class="time-weekday-date">
          <view class="item" @click="goCalendar">
            <span class="time-weekday">{{ startWeekDay }}{{ startDateTime[1] }}</span>
            <span class="date">{{ startDateTime[0] }}</span>
          </view>
          <view class="item">
            <span></span>
            <span class="total">{{ totalDayHour[0] ? (totalDayHour[0] + '天') : null }}&nbsp;{{ totalDayHour[1] ?
              (totalDayHour[1] +
                '时')
              : null }}</span>
          </view>
          <view class="item" @click="goCalendar">
            <span class="time-weekday">{{ endWeekDay }}{{ endDateTime[1] }}</span>
            <span class="date">{{ endDateTime[0] }}</span>
          </view>
        </view>

        <tm-button font-color="#fff" :margin="[100, 20]" :round="10" :width="550">去选车</tm-button>

        <view class="store-navigation-share">
          <view class="item" @click="callPhone"><tm-icon color="blue" :font-size="32"
              name="tmicon-phone-fill"></tm-icon>&nbsp;&nbsp;<span>联系门店</span>
          </view>
          <view class="item" @click="startNavigation"><tm-icon color="blue" :font-size="32"
              name="tmicon-paperplane-fill"></tm-icon>&nbsp;&nbsp;<span>地址导航</span></view>
        </view>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import dayjs from 'dayjs';

import {
  getBannerList
} from './Api'

import useCalendarStore from "@/store/calendar";
const calendarStore = useCalendarStore();

let bannerList = $ref<string[]>([])
let address = $ref<string>('质电出行(虹桥客运站店)')
//应有一个自取点的下拉列表选择然后匹配对应的经纬度，点击下方导航就会导航到对应的自取点

let startDateTime = $computed<string[]>(() => calendarStore.startDateTime)
let endDateTime = $computed<string[]>(() => calendarStore.endDateTime)
let totalDayHour = $computed<number[]>(() => calendarStore.totalDayHour)
let startWeekDay = $computed<string>(() => {
  const temp = dayjs(startDateTime[0]).format('dddd')
  const weekDay = calendarStore.weekDay[temp as string]
  return weekDay
})
let endWeekDay = $computed<string>(() => {
  const temp = dayjs(endDateTime[0]).format('dddd')
  const weekDay = calendarStore.weekDay[temp as string]
  return weekDay
})

function goCalendar() {
  uni.navigateTo({
    url: '/pages/calendar/index'
  });
}

function callPhone() {
  uni.makePhoneCall({
    phoneNumber: '400-1234-1234'
  });
}

function startNavigation() {
  uni.openLocation({
    latitude: 31.194283, // 纬度，浮点数，范围为90 ~ -90
    longitude: 121.317207, // 经度，浮点数，范围为180 ~ -180。
    name: "质电出行(虹桥客运站店)", // 位置名
    address: "上海市闵行区申虹路298号", // 地址详情说明
  });
}

onMounted(async () => {
  const res = await getBannerList()
  if (res && res.banner) {
    bannerList = res.banner.map((i) => i.image)
  }
})
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - env(safe-area-inset-bottom) - 75rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 246, 250);
}

.carousel {
  width: 100%;
}

.content {
  box-sizing: border-box;
  border-radius: 25rpx;
  position: relative;
  top: -80rpx;
  z-index: 2;
  background-color: #fff;
  padding-bottom: 20rpx;

  .city-address-pickup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25rpx;
    margin-bottom: 10rpx;

    .city-address {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 28rpx;
    }

    .pickup {
      box-sizing: border-box;
      padding: 5rpx 20rpx;
      border-radius: 20rpx;
      background-color: rgb(229, 229, 229);
    }
  }


  .time-weekday-date {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .time-weekday {
        color: gray;
        font-size: 30rpx;
        margin-top: 30rpx;
        margin-bottom: 15rpx;
      }

      .date {
        font-size: 36rpx;
        font-weight: bold;
      }

      .total {
        color: gray;
        font-size: 30rpx;
      }
    }
  }

  .store-navigation-share {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 25rpx;
    margin-bottom: 25rpx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
