<template>
  <view class="vehicle-container">
    <nut-tabs v-model="value" direction="vertical"  auto-height size="small">
      <nut-tab-pane v-for="item in list" :key="item" :title="item" :pane-key="item">
        <!-- 车型列表 -->
        <view class="vehicle-list" v-for="item in vehicleList" :key="item.id" v-on:touchstart="gotoDetail(item.id)">
          <nut-card :img-url="item.image" :title="item.motorcycle_name" :price="item.price">
            <template #prolist>
              <view class="tags1">{{ item.home1_tags.join(' ') }}</view>
              <view class="tags2">{{ item.home2_tags.join(' ') }}</view>
            </template>
            <template #shop-tag>
            </template>
            <template #origin>
              <span></span>
            </template>
          </nut-card>
        </view>
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'

import sendRequest from '../../utils/http'
import './vehicleAssociation.scss'

let value = ref(0)
let list = reactive<any>([
  '保时捷',
  '路特斯',
  '宝马',
  '奔驰',
  '奥迪',
  '蔚来',
  '理想',
  '小鹏',
  '极氪',
  '领克',
  '特斯拉',
  '荣威',
  '腾势',
  '智己',
  '深蓝',
  '比亚迪',
  '高合',
  '别克'
])
let vehicleList = reactive<any>([])

//获取车型列表
function getVehicleListApi() {
  sendRequest({
    url: '/api/car/Index/motorcycle',
    data: {
      page: 1,
      limit: 5,
    },
    success: function (res) {
      if (res.code == 1) {
        vehicleList = res.data.data;
      }
    }
  })
}

function gotoDetail(id: string) {
  Taro.navigateTo({
    url: '/pages/vehicleDetail/vehicleDetail',
  })
}

// 页面加载的时
onMounted(async () => {
  getVehicleListApi()
})
</script>
