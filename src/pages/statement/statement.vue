<template>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Taro from '@tarojs/taro'

import QQMapWX from '../utils/map-wx-jssdk';
import config from '../utils/config';
import './statement.scss'

const emit = defineEmits(['confirm','cancel'])//声明传递的事件名

const props = withDefaults(
  defineProps<{
    isOpened: boolean
  }>(), {
  isOpened: false
}
)

//后期需要根据userInfo(是否登录过控制弹出)
let isOpened = ref<boolean>(props.isOpened)

watch(() => props.isOpened,
  () => {
    isOpened.value = props.isOpened;
  })


//初次登录的时候的弹窗确认
function handleConfirm() {
  isOpened.value = !isOpened.value;
  Taro.authorize({
    scope: 'scope.userLocation',
    success: function () {
      Taro.getLocation({
        type: 'wgs84',
        success: function (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          const qqmapsdk = new QQMapWX({ key: config.mpKey })
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
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
              emit('confirm', {
                city: res.result.ad_info.city,
                address: res.result.address
              })
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
  isOpened.value = false;
  emit('cancel');
}

</script>
