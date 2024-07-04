<template>
  <view class="vehicle-container">
    <!-- 送还地点 选车 -->
    <view class="return-vehicle-box">
      <view class="use-time" v-on:touchstart="chooseDateInfo">
        <text>
          {{ returnVehicleObj.startDate }}
          {{ returnVehicleObj.startTime }}
        </text>
        <text>&nbsp;-&nbsp;</text>
        <text>
          {{ returnVehicleObj.endDate }}
          {{ returnVehicleObj.endTime }}
        </text>
      </view>
      <!-- 送车城市 地点 -->
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
      <!-- 提示服务费 高级筛选 -->
      <view class="service-fee-search">
        <view class="service-fee">上门送取¥{{ serviceFee }}</view>
        <view class="search" v-on:touchstart="handleSearchVehicleOpend">高级筛选</view>
      </view>

    </view>

    <!-- 选择时间 -->
    <selectDate :isOpened="isSelectDateOpend" :returnVehicleObj="returnVehicleObj" @close="handleSelectDateClose">
    </selectDate>

    <!-- 高级搜索 -->
    <searchVehicle :isOpened="isSearchVehicleOpend" @close="handleSearchVehicleClose">
    </searchVehicle>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import QQMapWX from '../utils/map-wx-jssdk';
import sentRequest from '../utils/http'
import config from '../utils/config';
import './vehicleModel.scss'

import selectDate from '../selectdate/selectdate.vue';
import searchVehicle from '../searchvehicle/searchvehicle.vue'

// 送还选车时间
let returnVehicleObj = ref<any>({
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
  startTime: '14:00',
  endTime: '14:00',
})
// 位置信息
let positionInfo = ref<any>({
  city: '佛山市',
  address: '顺德区大良街道'
})
// 服务费用
let serviceFee = ref<number>(0)
let isSelectDateOpend = ref<boolean>(false)
function chooseDateInfo() {
  isSelectDateOpend.value = true;
}

function handleSelectDateClose() {
  isSelectDateOpend.value = false;
}

// 高级搜索
let isSearchVehicleOpend = ref<boolean>(false)
function handleSearchVehicleOpend(){
  isSearchVehicleOpend.value = true
}
function handleSearchVehicleClose(){
  isSearchVehicleOpend.value = false
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

//获取服务费
async function getServiceFeeApi() {
  let flag = false
  Taro.getStorage({
    key: 'serviceFee',
    success: function (res) {
      serviceFee.value = res.data
      flag = true
    }
  })
  if (!flag) {
    sentRequest({
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
}

// 页面加载的时
onMounted(async () => {

  // 调取各接口
  await getServiceFeeApi()
})
</script>
