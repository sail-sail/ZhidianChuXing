<template>
  <view class="vehicle-container">
    <nut-tabs v-model="value" direction="vertical" title-scroll style="height: 200px">
      <nut-tab-pane v-for="item in list" :key="item" :title="item" :pane-key="item">
        <!-- 车型列表 -->
        <view class="vehicle-list" v-for="item in vehicleList" :key="item.id" v-on:touchstart="gotoDetail(item.id)">
          <!-- 车辆图片 车辆代号 -->
          <view class="images-codes-character">
            <image :src="item.image" :mode="'widthFix'"></image>
            <view class="codes-character">
              <view class="codes">
                <view class="code-name">{{ item.motorcycle_name }}</view>
                <view class="code-special" v-if="Array.isArray(item.home1_tags) && item.home1_tags.length > 0">
                  <view v-for="(i, index) in item.home1_tags" :key="index">
                    {{ i }}
                  </view>
                </view>
              </view>
              <!-- 车辆特点 -->
              <view class="character" v-if="Array.isArray(item.home2_tags) && item.home2_tags.length > 0">
                <view v-for="(i, index) in item.home2_tags" :key="index">
                  {{ i }}
                </view>
              </view>
            </view>
          </view>
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
