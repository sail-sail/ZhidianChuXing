<template>
  <view class="vehicle-container">
    <!-- 送还地点 选车 -->
    <view class="return-vehicle-box">
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
    </view>


    <nut-menu>
      <nut-menu-item v-model="val1" :options="options1" />
      <nut-menu-item v-model="val2" :options="options2" @change="onChange" />
      <nut-menu-item v-model="val3" :options="options3" @change="onChange" />
    </nut-menu>

    <nut-tabs v-model="value" direction="vertical" title-scroll style="height: 200px">
      <nut-tab-pane v-for="item in list" :key="item" :title="`Tab ${item}`" :pane-key="item">
        Content {{ item }}
      </nut-tab-pane>
    </nut-tabs>

    <!-- 选择时间 -->
    <selectDate :isOpened="isSelectDateOpend" :returnVehicleObj="returnVehicleObj" :type="type"
      @confirm="handleSelectDateCallBack" @close="handleSelectDateCallBack">
    </selectDate>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import QQMapWX from '../utils/map-wx-jssdk';
import sentRequest from '../utils/http'
import config from '../utils/config';
import './vehicleModel.scss'

import selectDate from '../selectdate/selectdate.vue';

let type = ref<string | undefined>('')
// 送还选车时间
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
  city: '',
  address: ''
})

let isSelectDateOpend = ref<boolean>(false)
function chooseDateInfo(type_: string) {
  type.value = type_
  isSelectDateOpend.value = true;
}
function handleSelectDateCallBack() {
  isSelectDateOpend.value = false;
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

let val1 = ref(0)
let val2 = ref('a')
let val3 = ref('b')
const options1 = ref([
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
])
const options2 = ref([
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
])

const options3 = ref([
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
])

const value = ref('1')
const list = new Array(10).fill(0).map((_, index) => index + 1)

// 页面加载的时
onMounted(async () => {
  //读取取车还车时间
  Taro.getStorage({
    key: 'pickupDateTime',
    success: function (res) {
      returnVehicleObj.value = res.data._value
    }
  })
  // 读取地点
  Taro.getStorage({
    key: 'location',
    success: function (res) {
      positionInfo.value = res.data._value
    }
  })

  // 调取各接口

})
</script>
