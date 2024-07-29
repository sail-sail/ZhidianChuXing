<template>
  <tm-app>
    <view class="container">
      <view class="userInfo" @click="baseInfo">
        <tm-avatar img="https://picsum.photos/200/300" :round="12" :size="150"></tm-avatar>
        <view class="userName">中国移动</view>
        <view class="userPhone">13800138000</view>
      </view>

      <tm-card title="我的订单">
        <template v-slot:content>
          <tm-grid :width="650" :col="4">
            <tm-grid-item @click="orderList">
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="待付款"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="进行中"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="已完成"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="已取消"></tm-text>
            </tm-grid-item>
          </tm-grid>
        </template>
      </tm-card>

      <tm-card title="更多">
        <template v-slot:content>
          <tm-grid :width="650" :col="4">
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="收藏车辆"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="优惠卷"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="团购订单"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="客服"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="意见反馈"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="关于我们"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <tm-icon name="tmicon-layergroup-fill" :font-size="42"></tm-icon>
              <tm-text :font-size="22" label="后台管理"></tm-text>
            </tm-grid-item>
          </tm-grid>
        </template>
      </tm-card>

    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
} from './Api'

function baseInfo() {
  uni.navigateTo({
    url: '/pages/baseInfo/index'
  })
}

function orderList() {
  uni.navigateTo({
    url: '/pages/orderList/index'
  })
}
onMounted(async () => {
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

.userInfo {
  width: 100vw;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.userName {
  margin-top: 25rpx;
  font-size: 36rpx;
  font-weight: bold;
}

.userPhone {
  margin-top: 25rpx;
  color: gray;
  font-size: 30rpx;
}
</style>
