<template>
  <view class="container">
    <view class="image-container">
      <image :src="carBgImgUrl"></image>
    </view>
    <!-- 车牌信息 -->
    <view class="vehicleInfo">
      <view class="left">
        <view class="vehicle-model">宝沃BX5</view>
        <view class="license-plate">苏A**Q1S</view>
      </view>
      <view class="right">
        <view class="orderNumber">订单编号:16790431261342</view>
        <view class="vehicle-characteristics">1.4T自动|SUV 5座|灰色</view>
      </view>
    </view>

    <!-- 复选框 -->
    <view class="checkboxs">
      <nut-checkbox v-model="val1" class="checkbox"> 定金 </nut-checkbox>
      <nut-checkbox v-model="val2" class="checkbox"> 费用支付 </nut-checkbox>
      <nut-checkbox v-model="val3" class="checkbox"> 合同 </nut-checkbox>
      <nut-checkbox v-model="val4" class="checkbox"> 免押 </nut-checkbox>
      <nut-checkbox v-model="val5" class="checkbox"> 整备 </nut-checkbox>
      <nut-checkbox v-model="val6" class="checkbox"> 发车 </nut-checkbox>
    </view>

    <!-- 车辆违章 -->
    <view class="vehicle-violation">
      <view class="header">
        <view class="left">车辆和违章押金</view>
        <view class="right">信用卡</view>
      </view>
      <view class="content">
        还车后订单无欠款，30天可解绑
      </view>
    </view>

    <!-- 租车费用 -->
    <view class="car-rental-fee">
      <view class="fee-cost">
        <view class="fee">租车费用</view>
        <view class="cost">总价 ¥809.84</view>
      </view>

      <nut-divider class="divider" />

      <view class="basic-fee">
        <view class="title">基础费用</view>
      </view>
      <view class="basic-fee">
        <view class="left">车辆租赁及服务费</view>
        <view class="right">¥491</view>
      </view>
      <view class="basic-fee">
        <view class="left">基础服务费</view>
        <view class="right">¥100</view>
      </view>
      <view class="basic-fee">
        <view class="left">车辆整备费</view>
        <view class="right">¥20</view>
      </view>
      <view class="basic-fee">
        <view class="left">ETC费用</view>
        <view class="right">¥98.84</view>
      </view>

      <nut-divider class="divider" />

      <view class="basic-fee">
        <view class="title">优惠组合</view>
      </view>
      <view class="basic-fee">
        <view class="left">满减券</view>
        <view class="right">-¥30</view>
      </view>

      <nut-divider class="divider" />

      <!-- 查看支付人 查看支付明细 按钮跳转-->
      <view class="pay-about">
        <view class="payMen">查看支付人</view>
        <view>|</view>
        <view class="payDetail">查看支付明细</view>
      </view>
    </view>



  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import './orderDetail.scss'
import sendRequest from '../../utils/http'

// @ts-ignore
let carBgImgUrl = require('/src/assets/carBg.png')
const val1 = ref(false)
const val2 = ref(false)
const val3 = ref(false)
const val4 = ref(false)
const val5 = ref(false)
const val6 = ref(false)
onMounted(async () => {
})
</script>
