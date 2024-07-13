<template>
  <view class="container" v-if="inited">
    <!-- 背景轮播图 -->
    <view class="swiper-container">
      <nut-swiper :init-page="0" pagination-visible pagination-color="#426543" pagination-unselected-color="#808080"
        class="swiper">
        <nut-swiper-item class="swiper-item">
          <image :src="carBgImg"></image>
        </nut-swiper-item>
        <nut-swiper-item class="swiper-item">
          <image :src="carBgImg"></image>
        </nut-swiper-item>
      </nut-swiper>
    </view>

    <!-- 车辆情况 -->
    <view class="vehicle-situation">
      <view class="name">{{ vehicleObj.name }}</view>
      <view class="life">车龄{{ vehicleObj.life }}内</view>
      <view class="details">
        <view class="detail" v-for="item in vehicleObj.details" :key="item.type">
          <view>{{ item.type }}</view>
          <view>{{ item.correSponding }}</view>
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

    <!-- 评论 -->
    <view class="commen-container">

      <view class="reviews-contaner">
        <view class="reviews">精选评价</view>
        <view class="more">查看更多(107)</view>
      </view>

      <view class="comprehensive-evaluation">
        <view class="evaluation" v-for="item in evaluations" :key="item.type">
          {{ item.type }}&nbsp;{{ item.correSponding }}
        </view>
      </view>

      <scroll-view :scroll-y="true" style="height: 600rpx;">
        <view class="user-evaluation">
          <!-- 头像 姓名 时间 地点  热评-->
          <view class="header">
            <view class="header-left">
              <view class="avatar"> <nut-avatar size="normal"> <img :src="noticeImg" /> </nut-avatar></view>
              <view class="name-time">
                <view>黄先生</view>
                <view>2024-06</view>
              </view>
              <view class="repeat-customer-address">
                <view>回头客</view>
                <view>发布地点:湖北</view>
              </view>
            </view>
            <view class="header-right">热评</view>
          </view>
          <view class="comprehensive-evaluation">
            <view class="evaluation">油耗低</view>
            <view class="evaluation">配置实用</view>
            <view class="evaluation">外观时尚</view>
            <view class="evaluation">续航满意</view>
          </view>
          <!-- 内容 -->
          <view class="contents-images">
            <view class="contents">
              几次都是租的雪佛兰科鲁兹，该有的配置都有，油耗也低，内外都非常干净，工作人员也十分热情态度很好，每次用车都很满意，专门来给天门神州租车公司点个赞。
            </view>
            <view class="images">
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
            </view>
          </view>
        </view>

        <view class="user-evaluation">
          <!-- 头像 姓名 时间 地点  热评-->
          <view class="header">
            <view class="header-left">
              <view class="avatar"> <nut-avatar size="normal"> <img :src="noticeImg" /> </nut-avatar></view>
              <view class="name-time">
                <view>黄先生</view>
                <view>2024-06</view>
              </view>
              <view class="repeat-customer-address">
                <view>回头客</view>
                <view>发布地点:湖北</view>
              </view>
            </view>
            <view class="header-right">热评</view>
          </view>
          <view class="comprehensive-evaluation">
            <view class="evaluation">油耗低</view>
            <view class="evaluation">配置实用</view>
            <view class="evaluation">外观时尚</view>
            <view class="evaluation">续航满意</view>
          </view>
          <!-- 内容 -->
          <view class="contents-images">
            <view class="contents">
              几次都是租的雪佛兰科鲁兹，该有的配置都有，油耗也低，内外都非常干净，工作人员也十分热情态度很好，每次用车都很满意，专门来给天门神州租车公司点个赞。
            </view>
            <view class="images">
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
              <view class="image-item">
                <image :src="carBgImg"></image>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="gotoOrder">
      <view></view>
      <view class="book">立即预订</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Taro from '@tarojs/taro'
import './order.scss'
import sendRequest from '../../utils/http'


// @ts-ignore
let carBgImg = require('/src/assets/carBg.png')
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

let evaluations = ref<any>([
  {
    type: '行驶平稳',
    correSponding: '72'
  },
  {
    type: '外观时尚',
    correSponding: '63'
  },
  {
    type: '油耗低',
    correSponding: '61'
  },
  {
    type: '干净整洁',
    correSponding: '52'
  },
  {
    type: '后备厢空间大',
    correSponding: '31'
  },
  {
    type: '内饰好看',
    correSponding: '28'
  },
  {
    type: '配置实用',
    correSponding: '22'
  },
  {
    type: '经济好用',
    correSponding: '12'
  },
  {
    type: '续航满意',
    correSponding: '12'
  }
])
let noticeImg = require('/src/assets/notice.png')
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
