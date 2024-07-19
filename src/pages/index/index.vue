<template>
  <view class="container">
    <!-- <nut-button shape="round" type="info" :size="'small'" @click="login">一键登录</nut-button> -->
    <!-- 轮播图 -->
    <nut-swiper :init-page="0" :auto-play="3000" pagination-visible pagination-color="#426543"
      pagination-unselected-color="#808080" class="swiper">
      <nut-swiper-item v-for="item in bannarList" :key="item.id" :itemId="item.id" class="swiper-item">
        <image :src="item.image"></image>
      </nut-swiper-item>
    </nut-swiper>

    <view class="return-vehicle-box">
      <view class="city-address">
        <view class="city-model">
          <view class="city-title">送车城市</view>
          <view class="city-content">{{ positionInfo.city }}</view>
        </view>

        <view class="address-model" v-on:touchstart="chooseLoactionInfo">
          <view class="address-title">送车地点</view>
          <view class="address-content">{{ positionInfo.address }}</view>
        </view>
      </view>

      <view class="use-time">
        <text v-on:touchstart="chooseDateInfo('start')">
          {{ returnVehicleObj.startDate }}
          {{ returnVehicleObj.startTime }}
        </text>
        <text>&nbsp;-&nbsp;</text>
        <text v-on:touchstart="chooseDateInfo('end')">
          {{ returnVehicleObj.endDate }}
          {{ returnVehicleObj.endTime }}
        </text>
      </view>

      <!-- 选车按钮 -->
      <nut-button class="select-vehicle-button" block type="warning" :size="'small'" @click="selectVehicleMoedl">去选车</nut-button>
      <!-- 提示服务费 -->
      <view class="service-fee">上门送取¥{{ serviceFee }}</view>
    </view>

    <!-- 租车须知 -->
    <view class="notice-box" v-on:touchstart="gotoCarRentailNotice">
      <view class="model">
        <image :src="noticeImg" class="noticeImg"></image>
        <view>租车须知</view>
      </view>

      <AtIcon value='chevron-right' size='24' color='#bbb'></AtIcon>
    </view>

    <!-- 广告 -->
    <view class="advertisement">
      <view class="advertisement-top">
        <image :src="advertisement1"></image>
      </view>
      <view class="advertisement-bottom">
        <view class="left">
          <image :src="advertisement2"></image>
          <view class="model">
            <view>企业用车</view>
            <view>一分钟教你租还车</view>
            <view>查看详情
              <AtIcon value="chevron-right" color="#D8D8D8" size="14"></AtIcon>
            </view>
          </view>
        </view>
        <view class="right">
          <image :src="advertisement3"></image>
          <view class="model">
            <view>成为车主</view>
            <view>成为车主轻松赚钱</view>
            <view>查看详情
              <AtIcon value="chevron-right" color="#D8D8D8" size="14"></AtIcon>
            </view>
          </view>
        </view>
      </view>
    </view>


    <!-- 底部导航栏 -->
    <customTabBar></customTabBar>

    <!-- 租车声明 -->
    <stateMent :isOpened="stateMentOpened" @confirm="handleStateMentConfirm" @cancel="handleStateMentCancel">
    </stateMent>

    <!-- 选择时间 -->
    <selectDate :isOpened="isSelectDateOpend" :returnVehicleObj="returnVehicleObj" :type="type"
      @confirm="handleSelectDateCallBack" @close="handleSelectDateCallBack">
    </selectDate>

    <!-- 警告提示 -->
    <nut-overlay v-model:visible="overlayShow" class=overlay-container>
      <view style="font-size:28rpx;">{{ overlayText }}</view>
    </nut-overlay>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

import QQMapWX from '../../utils/map-wx-jssdk';
import sendRequest from '../../utils/http'
import common from '../../utils/common'
import config from '../../utils/config';
import auth from '../../utils/auth'
import './index.scss'

import customTabBar from '../custom-tab-bar/custom-tab-bar.vue'
import stateMent from '../statement/statement.vue'
import selectDate from '../selectdate/selectdate.vue';

// 轮播图
let bannarList = ref<any[]>([])
// 送还选车时间
let type = ref<string | undefined>()
let returnVehicleObj = ref<any>({
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
  startTime: '14:00',
  endTime: '14:00',
})

// 位置信息
let positionInfo = ref<any>({
  latitude: '',
  longitude: '',
  city: '测试市',
  address: '测试地址'
})

// 服务费用
let serviceFee = ref<number>(0)
// @ts-ignore
let noticeImg = require('/src/assets/notice.png')
// @ts-ignore
let advertisement1 = require('/src/assets/advertisement1.png')
// @ts-ignore
let advertisement2 = require('/src/assets/advertisement2.png')
// @ts-ignore
let advertisement3 = require('/src/assets/advertisement3.png')
// 警告提示
let overlayShow = ref<boolean>(false)
let overlayText = ref<string>('')

let isSelectDateOpend = ref<boolean>(false)
function chooseDateInfo(type_: string) {
  type.value = type_
  isSelectDateOpend.value = true;
}
function handleSelectDateCallBack() {
  isSelectDateOpend.value = false;
}


//后期需要根据userInfo(是否登录过控制弹出)
let stateMentOpened = ref<boolean>(true)
function handleStateMentConfirm(obj) {
  if (obj) {
    positionInfo.value = obj
    //存档。
  }
}
function handleStateMentCancel() {
  stateMentOpened.value = false
}

// 选择地点
function chooseLoactionInfo() {
  Taro.authorize({
    scope: 'scope.userLocation',
    success: function () {
      Taro.chooseLocation({
        success: function (res) {
          console.log(res, '选择的地址')
          const latitude = res.latitude
          const longitude = res.longitude
          const qqmapsdk = new QQMapWX({ key: config.mpKey })
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              console.log(res, '解析的地址')
              Taro.setStorage({
                key: 'location',
                data: {
                  latitude: latitude,//存储经纬度
                  longitude: longitude,
                  city: res.result.ad_info.city,//存储城市
                  address: res.result.address//存储详细地址
                }
              })
              //记录送还车城市 和 地址
              positionInfo.value.city = res.result.ad_info.city
              positionInfo.value.address = res.result.address
            },
            fail: function (res) {
              console.log('解析具体位置失败：', res);
            }
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  });
}

// 跳转到选车页面
function selectVehicleMoedl() {
  if (dayjs(returnVehicleObj.value.startDate).unix() >= dayjs(returnVehicleObj.value.endDate).unix()) {
    overlayText.value = '取车时间不能大于还车时间'
    overlayShow.value = true;
    return;
  }
  if (positionInfo.value.city === '' && positionInfo.value.address === '') {
    console.log(positionInfo.value, 'positionInfo.value')
    overlayText.value = '取车城市地点不能为空请授权定位!'
    overlayShow.value = true;
    return;
  }
  // 存储 日期时间 地点
  Taro.setStorage({
    key: "pickupDateTime",
    data: returnVehicleObj
  })
  Taro.setStorage({
    key: 'location',
    data: positionInfo
  })
  Taro.navigateTo({
    url: '/pages/vehicleModel/vehicleModel',
  })
}

// 跳转到租车须知页面
function gotoCarRentailNotice() {
  Taro.navigateTo({
    url: '/pages/carRentalNotice/carRentalNotice',
  })
}


//获取轮播图
async function getBannerListApi() {
  sendRequest({
    url: '/api/index.index/bannerList',
    success: function (res) {
      if (res.code == 1) {
        if (res.data.banner) {
          const banner = res.data.banner
          if (banner && Array.isArray(banner)) {
            banner.forEach((i) => {
              i.image = common.getImgUrl(i.image)
            })
          }
          bannarList.value = banner
        }
      }
    }
  })
}
//获取服务费
async function getServiceFeeApi() {
  sendRequest({
    url: '/api/car/Index/sever_money',
    success: function (res) {
      if (res.code == 1) {
        serviceFee.value = res.data;
        Taro.setStorage({
          key: 'serviceFee',
          data: res.data
        })
      }
    }
  })
}


function login() {
  // 登录 记录userInfo
  auth.login()
}

// 页面加载的时
onMounted(async () => {
  //后期需要根据userInfo(是否登录过控制弹出)


  // 调取各接口
  await getBannerListApi()
  await getServiceFeeApi()
})
</script>
