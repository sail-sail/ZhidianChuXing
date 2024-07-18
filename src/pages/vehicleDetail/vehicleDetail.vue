<template>
  <view class="container" v-if="inited">
    <view class="swiper-container">
      <nut-swiper :init-page="0" pagination-visible pagination-color="#426543" pagination-unselected-color="#808080"
        class="swiper">
        <nut-swiper-item class="swiper-item">
          <image :src="urls[0]" v-if="hasImg" v-on:touchstart="chooseImage"></image>
          <view v-else v-on:touchstart="chooseImage" class="uploadImg">
            +
          </view>
        </nut-swiper-item>
      </nut-swiper>
    </view>

    <!-- 车辆情况 -->
    <view class="vehicle-situation">
      <view class="name-life">
        <view class="name">{{ vehicleObj.name }}</view>
        <view class="life">车龄{{ vehicleObj.life }}内</view>
      </view>

      <view class="details">
        <view class="detail" v-for="item in vehicleObj.details" :key="item.type">
          <view>{{ item.type }}</view>
          <view>{{ item.correSponding }}</view>
        </view>
      </view>
    </view>

    <!-- 四周图 -->
    <view class="around-image">
      <view class="arounds-container">
        <view class="around" v-for="(item, index) in arounds" :key="item.type">
          <view>{{ item.type }}</view>
          <image :src="item.url" v-if="item.url !== ''" v-on:touchstart="chooseImageAround(index)"></image>
          <view v-else v-on:touchstart="chooseImageAround(index)" class="uploadImg">
            +
          </view>
        </view>
      </view>
    </view>

    <!-- 配置信息 -->
    <view class="configuration-information">
      <view class="title">配置信息</view>
      <nut-swiper :init-page="0" pagination-visible pagination-color="#" pagination-unselected-color="#808080"
        @change="handleChange">
        <nut-swiper-item v-for="item in length" :key="item" class="information-item">
          <view class="infos">
            <view class="info" v-for="i in arr" :key="i.type">
              <view>{{ i.type }}</view>
              <view>{{ i.correSponding }}</view>
            </view>
          </view>
        </nut-swiper-item>
      </nut-swiper>
    </view>


    <view class="updateVehicle">
      <view></view>
      <view class="save">保存</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Taro from '@tarojs/taro'
import './vehicleDetail.scss'
import sendRequest from '../../utils/http'


// @ts-ignore
let carBgImgUrl = require('/src/assets/carBg.png')
let vehicleObj = ref<any>({
  name: '雪佛兰科鲁泽',
  life: 2,
  details: [
    {
      type: '能源类型',
      correSponding: '汽油'
    },
    {
      type: '排量/排挡',
      correSponding: '1.5L 自动'
    },
    {
      type: '结构/座位',
      correSponding: '三厢轿车 5座'
    },
    {
      type: '燃油标号',
      correSponding: '92-93汽油'
    },
    {
      type: '油箱容积',
      correSponding: '44L'
    },
    {
      type: '车门数',
      correSponding: '4门'
    },
    {
      type: '驱动方式',
      correSponding: '前驱'
    },
    {
      type: '行李厢容积',
      correSponding: '405L'
    },
    {
      type: '安全气囊数量',
      correSponding: '3个'
    },
    {
      type: '方向盘助力',
      correSponding: '电动助力'
    },
    {
      type: 'ABS防抱死',
      correSponding: '有'
    },
    {
      type: '车身稳定控制',
      correSponding: '有'
    },
    {
      type: '备胎规格',
      correSponding: '全尺寸备胎'
    },
    {
      type: '儿童座椅安全接口',
      correSponding: '有'
    }
  ]
})

let arounds = ref<any>([
  {
    type: '前面',
    url: ''
  },
  {
    type: '后面',
    url: ''
  },
  {
    type: '左前',
    url: ''
  },
  {
    type: '右前',
    url: ''
  },
  {
    type: '左后',
    url: ''
  },
  {
    type: '右后',
    url: ''
  },
  {
    type: '左面',
    url: ''
  },
  {
    type: '右面',
    url: ''
  }
])



let infoList = ref<any>([
  {
    type: '前/后雷达',
    correSponding: '无/有'
  },
  {
    type: '驾驶辅助影像',
    correSponding: '倒车影像'
  },
  {
    type: '胎压监测功能',
    correSponding: '胎压显示'
  },
  {
    type: '蓝牙/充电口',
    correSponding: '有/USB+Type-C'
  },
  {
    type: '手机互联',
    correSponding: 'carplay/carlife'
  },
  {
    type: '天窗',
    correSponding: '可开启天窗'
  },
  {
    type: '远/近光灯',
    correSponding: 'LED/LED'
  },
  {
    type: '巡航系统',
    correSponding: '定速巡航'
  },
  {
    type: '自动驻车',
    correSponding: '有'
  },
  {
    type: '一键启动',
    correSponding: '有'
  },
  {
    type: 'GPS导航',
    correSponding: '有'
  },
  {
    type: '空气系统',
    correSponding: '车载过滤PM2.5'
  },
  {
    type: '多功能方向盘',
    correSponding: '有'
  },
  {
    type: '驻车自动类型',
    correSponding: '电子手刹'
  },
  {
    type: '座椅',
    correSponding: '皮革处理'
  },
  {
    type: '后排座位放倒',
    correSponding: '不可放倒'
  },
  {
    type: '真皮方向盘',
    correSponding: '有'
  },
  {
    type: '外后视镜',
    correSponding: '电动调节'
  },
  {
    type: '后座出风口',
    correSponding: '有'
  },
  {
    type: '前排座椅功能',
    correSponding: '无'
  },
  {
    type: '前台电动坐骑',
    correSponding: '无'
  },
  {
    type: '抬头显示',
    correSponding: '无'
  },
  {
    type: '后排隐私玻璃',
    correSponding: '无/有'
  },
  {
    type: '车顶行李架',
    correSponding: '无'
  },
])
let length = ref<number>(0)
let arr = ref<any>([])
let inited = ref<boolean>(false)
function handleChange(index) {
  arr.value = []
  infoList.value.forEach((item, i) => {
    if (i >= (index - 0) * 6 && i < (index + 1) * 6) {
      arr.value.push({ ...item })
    }
  }) || []
}

let hasImg = ref<boolean>(false)
let urls = ref<string[]>([carBgImgUrl])
function chooseImage() {
  Taro.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    success: function (res) {
      console.log(res)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      urls.value = res.tempFilePaths
      // 仅此本地路径需上传到服务器 通过详情获取最新的图片
      hasImg.value = true
    }
  })
}

function chooseImageAround(index) {
  console.log(index)
  Taro.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    success: function (res) {
      console.log(res)
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      arounds.value[index].url = res.tempFilePaths[0]
      // 仅此本地路径需上传到服务器 通过详情获取最新的图片
    }
  })
}
onMounted(async () => {
  arr.value = []
  infoList.value.forEach((item, i) => {
    if (i >= 0 && i < 6) {
      arr.value.push(item)
    }
  }) || []
  length.value = infoList.value.length / 6;
  await nextTick()
  inited.value = true
})
</script>
