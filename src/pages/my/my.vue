<template>
  <view class="container">
    <!-- 头像 是否是vip -->
    <view class="avater-vip-container">
      <!-- 头像 -->
      <nut-avatar size="normal"> <img :src="noticeImg" /> </nut-avatar>
      <!-- 用户名 是否是vip  赚积分-->
      <view class="vip-container">
        <view>
          <view class="user-name">{{ userName }}</view>
          <view v-if="isVip" class="vip-img">
            <image :src="vipImg"></image>
          </view>
          <view v-else class="not-vip-img">
            <image :src="notVipImg"></image>
          </view>
        </view>

      </view>
      <!-- 赚积分 -->
      <view class="coin-container">
        <image :src="coinImg"></image>
        <view class="text">赚积分</view>
      </view>
    </view>

    <!-- 各个菜单 -->
    <view class="menus-container">
      <!-- 开通会员 -->
      <view class="vip-container">
        <view class="image-call">
          <image :src="levelImg"></image>
          <view class="vip-call">尊享会员</view>
        </view>
        <!-- 开通会员 -->
        <view class="vip-open">
          开通会员
        </view>
      </view>

      <!-- 我的资产 -->
      <view class="my-assets-container">
        <view class="integral-container">
          <view>积分</view>
          <view>0</view>
        </view>
        <view class="balance-container">
          <view>余额</view>
          <nut-price :price="8888.11" :decimal-digits="2" />
        </view>
        <view class="coupon-container">
          <view>优惠卷</view>
          <view>0</view>
        </view>
      </view>

      <!-- 车辆管理 订单 -->
      <view class="manage-container">
        <view class="car-container">
          <view class="image-car">
            <image :src="carImg"></image>
            <view>车辆管理</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <view class="order-container">
          <view class="image-order">
            <image :src="orderImg"></image>
            <view>订单管理</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
      </view>

      <!-- 实名认证 隐私管理 服务协议 用户协议 联系平台 客服 -->
      <view class="others-container">
        <!-- 实名认证 -->
        <view class="order-container">
          <view class="image-order">
            <image :src="listImg1"></image>
            <view>实名认证</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <!-- 隐私管理 -->
        <view class="order-container" v-on:touchstart="gotoPgaes('privacyStatement')">
          <view class="image-order">
            <image :src="listImg2"></image>
            <view>隐私管理</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <!-- 服务协议 -->
        <view class="order-container" v-on:touchstart="gotoPgaes('serviceAgreement')">
          <view class="image-order">
            <image :src="listImg3"></image>
            <view>服务协议</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <!-- 用户协议 -->
        <view class="order-container" v-on:touchstart="gotoPgaes('userAgreement')">
          <view class="image-order">
            <image :src="listImg4"></image>
            <view>用户协议</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <!-- 联系平台 -->
        <view class="order-container" v-on:touchstart="contactPlatform">
          <view class="image-order">
            <image :src="listImg5"></image>
            <view>联系平台</view>
          </view>
          <AtIcon value='chevron-right' size='22' color="#ccc"></AtIcon>
        </view>
        <!-- 客服 -->
        <nut-button :block="true" type="default" class="serviceChat-container" v-on:click="serviceChat">
          <template #icon>
            <view class="icon-container">
              <image :src="listImg6"></image>
              <span>客服</span>
            </view>
          </template>
        </nut-button>
      </view>
    </view>

    <customTabBar></customTabBar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'

import './my.scss'


import customTabBar from '../custom-tab-bar/custom-tab-bar.vue'

// @ts-ignore
let noticeImg = require('/src/assets/notice.png')
let userName = ref<string>('新人用户')
let isVip = ref<boolean>(true)
let vipImg = require('/src/assets/vip.png')
let notVipImg = require('/src/assets/vip-1.png')
let coinImg = require('/src/assets/coin.png')
let levelImg = require('/src/assets/level.png')
let carImg = require('/src/assets/car.png')
let orderImg = require('/src/assets/order.png')
let listImg1 = require('/src/assets/list1.png')
let listImg2 = require('/src/assets/list2.png')
let listImg3 = require('/src/assets/list3.png')
let listImg4 = require('/src/assets/list4.png')
let listImg5 = require('/src/assets/list5.png')
let listImg6 = require('/src/assets/list6.png')

// 隐私管理 服务协议 用户协议
function gotoPgaes(type: string) {
  //跳转到隐私管理页面
  if (type === 'privacyStatement') {
    Taro.navigateTo({
      url: '/pages/privacyStatement/privacyStatement',
    })
  }

  //跳转到服务协议页面
  if (type === 'serviceAgreement') {
    Taro.navigateTo({
      url: '/pages/serviceAgreement/serviceAgreement',
    })
  }

  //跳转到用户协议页面
  if (type === 'userAgreement') {
    Taro.navigateTo({
      url: '/pages/userAgreement/userAgreement',
    })
  }
}

// 联系平台
function contactPlatform() {
  Taro.makePhoneCall({
    phoneNumber: '40012341234'
  })
}

// 联系客服
function serviceChat() {
  Taro.openCustomerServiceChat({
    extInfo: { url: '' },
    corpId: '',
    success: function (res) { }
  })
}


</script>
