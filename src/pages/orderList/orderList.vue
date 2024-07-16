<template>
  <view class="container">
    <view class="order" v-for="item in orderList" :key="item.id">
      <view class="header">
        <view class="left">
          <view class="drive">自驾</view>
          <view class="car">用车</view>
        </view>
        <view class="right">{{ item.status }}</view>
      </view>

      <view class="content">
        <view>订单编号:&nbsp;{{ item.orderNumber }}</view>
        <view>用车车型:&nbsp;{{ item.vehicleModel }}</view>
        <view>用车时间:&nbsp;{{ item.startTime }}&nbsp;至&nbsp;{{ item.endTime }}({{ item.day }}天)</view>
        <view>订单金额:&nbsp;¥{{ item.amount }}</view>
      </view>

      <view class="detail" v-on:touchstart="gotoOrderDetail">
        查看详情
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import './orderList.scss'
import sendRequest from '../../utils/http'


let orderList = ref<any>([
  {
    id: 1,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  },
  {
    id: 2,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  },
  {
    id: 3,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  },
  {
    id: 4,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  },
  {
    id: 5,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  },
  {
    id: 6,
    status: '取消',
    orderNumber: '17182428360914',
    vehicleModel: '雪佛兰科鲁泽',
    startTime: '2024-06-13',
    endTime: '2024-06-15',
    day: '2',
    amount: 0
  }
])

// 跳转到订单列表页面
function gotoOrderDetail() {
  Taro.navigateTo({
    url: '/pages/orderDetail/orderDetail',
  })
}

onMounted(async () => {
})
</script>
