<template>
  <view class="container">
    <!-- 轮播图 -->
    <swiper indicator-color='#999' indicator-active-color='#333' :vertical="false" :circular="true" :autoplay="true"
      class="swiper">
      <swiper-item v-for="item in bannarList" :key="item.id" :itemId="item.id" class="swiper-item">
        <image :src="item.image"></image>
      </swiper-item>
    </swiper>

    <!-- 送还地点 选车 -->
    <view class="return-vehicle-box">
      <view class="use-time">
        {{ returnVehicleObj.startDate }}&nbsp;{{ returnVehicleObj.startTime }}
        <text>-</text>
        {{ returnVehicleObj.endDate }}&nbsp;{{ returnVehicleObj.endTime }}
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
      <!-- 选车按钮 -->
      <AtButton type='primary' :size="'small'" >去选车</AtButton>
      <!-- 提示服务费 -->
      <view class="service-fee">上门送取¥{{ serviceFee }}</view>
    </view>

    <!-- 租车须知 -->
    <view class="notice-box">
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

    <!-- 特价车辆 更多车型 -->
    <view v-if="vehicleList.length > 0">
      <view class="special-recommen">
        <view>特价车辆</view>
        <view>更多车型</view>
      </view>
      <!-- 车型列表 -->
      <view class="vehicle-list" v-for="item in vehicleList" :key="item.id">
        <!-- 车辆图片 车辆代号 -->
        <view class="images-codes">
          <image :src="item.image" :mode="'widthFix'"></image>
          <view class="codes">
            <view class="code-name">{{ item.motorcycle_name }}</view>
            <view class="code-special" v-if="Array.isArray(item.home1_tags) && item.home1_tags.length > 0">
              <view v-for="(i, index) in item.home1_tags" :key="index">
                {{ i }}<text v-if="index !== item.home1_tags.length - 1">&nbsp;|&nbsp;</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 分割线 -->
        <AtDivider />
        <!-- 车辆特点 -->
        <view class="character" v-if="Array.isArray(item.home2_tags) && item.home2_tags.length > 0">
          <view v-for="(i, index) in item.home2_tags" :key="index">
            {{ i }}
          </view>
        </view>
        <!-- 车辆详情 租金 -->
        <view class="detail-money">
          <view class="detail">车辆详情</view>
          <view class="money">
            <text>¥</text>
            {{ item.price }}
            <text>/</text>
            <text>天</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <customTabBar></customTabBar>

    <!-- 租车声明 -->
    <AtModal :isOpened="isOpened">
      <AtModalHeader>感谢您使用质电租车小程序</AtModalHeader>
      <AtModalContent>
        我们非常重视您的个人信息和隐私保护。为了有效保障您的个人权益，在使用神州租车小程序前，请您务必审慎阅读
        <text class="info">《质电租车小程序隐私保护指引》</text>
        内的所有条款。当您点击同意并开始使用产品服务时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力。如后再次使用质电租车小程序，即表示您已同意《质电租车小程序隐私保护指引》
      </AtModalContent>
      <AtModalAction>
        <AtButton class="btn-item" @click="handleCancel">取消</AtButton>
        <AtButton class="btn-item" @click="handleConfirm">确定</AtButton>
      </AtModalAction>
    </AtModal>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

import QQMapWX from '../utils/map-wx-jssdk';
import sentRequest from '../utils/http'
import common from '../utils/common'
import config from '../utils/config';
import './index.scss'

import customTabBar from '../custom-tab-bar/custom-tab-bar.vue'

// 轮播图
let bannarList = ref<any[]>([])
// 送还选车时间
let returnVehicleObj = ref<any>({
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
  startTime: '14:00',
  endTime: '14:00',
})
// 位置信息
let positionInfo = ref<any>({
  city: '',
  address: ''
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
// 车型列表
let vehicleList = ref<any[]>([])

//后期需要根据userInfo(是否登录过控制弹出)
let isOpened = ref<boolean>(true)

//初次登录的时候的弹窗确认
function handleConfirm() {
  isOpened.value = !isOpened.value;
  Taro.authorize({
    scope: 'scope.userLocation',
    success: function () {
      Taro.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const qqmapsdk = new QQMapWX({ key: config.mpKey })
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              console.log(res.result);
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
          }
          )
        }
      })
    }
  });

}
//初次登录的时候的弹窗取消
function handleCancel() {
  isOpened.value = !isOpened.value;
}

// 选择地点
function chooseLoactionInfo() {
  Taro.authorize({
    scope: 'scope.userLocation',
    success: function (res) {
      console.log(res)
      Taro.chooseLocation({
        success: function (res) {
          console.log(res, 'res')
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  });
}



//获取轮播图
async function getBannerListApi() {
  sentRequest({
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
          console.log(bannarList)
        }
      }
    }
  })
}
//获取服务费
async function getServiceFeeApi() {
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
//获取车型列表
async function getVehicleListApi() {
  sentRequest({
    url: '/api/car/Index/motorcycle',
    data: {
      page: 1,
      limit: 5,//目前写死最多5条,页面不宜滚动太长距离
      is_recommend: "是",
    },
    success: function (res) {
      if (res.code == 1) {
        vehicleList = res.data.data;
      }
    }
  })
}

// 页面加载的时
onMounted(async () => {
  //后期需要根据userInfo(是否登录过控制弹出)


  // 调取各接口
  await getBannerListApi()
  await getServiceFeeApi()
  await getVehicleListApi()
})
</script>
