<template>
  <view class="vehicle-container">
    <!-- 送还地点 选车 -->
    <view class="return-vehicle-box">
      <view class="use-time" v-on:touchstart="chooseDateInfo">
        <text>
          {{ returnVehicleObj.startDate }}
          {{ returnVehicleObj.startTime }}
        </text>
        <text>&nbsp;-&nbsp;</text>
        <text>
          {{ returnVehicleObj.endDate }}
          {{ returnVehicleObj.endTime }}
        </text>
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

      <nut-menu>
        <nut-menu-item v-model="val1" :options="options1" />
        <nut-menu-item v-model="val2" :options="options2" @change="onChange" />
        <nut-menu-item v-model="val3" :options="options3" @change="onChange" />
      </nut-menu>
      <nut-category :category="data.category" @change="change">
        <nut-category-pane :categoryChild="data.categoryChild" @onChange="onChange"> </nut-category-pane>
      </nut-category>

    </view>

    <!-- 选择时间 -->
    <selectDate :isOpened="isSelectDateOpend" :returnVehicleObj="returnVehicleObj" @close="handleSelectDateClose">
    </selectDate>

  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import QQMapWX from '../utils/map-wx-jssdk';
import sentRequest from '../utils/http'
import config from '../utils/config';
import './vehicleModel.scss'

import selectDate from '../selectdate/selectdate.vue';

// 送还选车时间
let returnVehicleObj = ref<any>({
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
  startTime: '14:00',
  endTime: '14:00',
})
// 位置信息
let positionInfo = ref<any>({
  city: '佛山市',
  address: '顺德区大良街道'
})

let isSelectDateOpend = ref<boolean>(false)
function chooseDateInfo() {
  isSelectDateOpend.value = true;
}

function handleSelectDateClose() {
  isSelectDateOpend.value = false;
}


// 选择地点
function chooseLoactionInfo() {
  Taro.authorize({
    scope: 'scope.userLocation',
    success: function () {
      Taro.chooseLocation({
        success: function (res) {
          console.log(res, '选择的地址')
          const latitude = res.latitude
          const longitude = res.longitude
          const qqmapsdk = new QQMapWX({ key: config.mpKey })
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: function (res) {
              console.log(res, '解析的地址')
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
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  });
}

const val1 = ref(0)
const val2 = ref('a')
const val3 = ref('b')
const options1 = ref([
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
])
const options2 = ref([
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
])

const options3 = ref([
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
])

let data = reactive({
  "categoryChild": [
    {
      "catId": "1581",
      "catName": "地方特产",
      "catLevel": 2,
      "catType": 1,
      "childCateList": [
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg",
          "catId": "1589",
          "catName": "新疆",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/88907/33/6457/231663/5df33b56Eae1ffafd/819f96550ae520a3.jpg",
          "catId": "2644",
          "catName": "北京",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/109937/34/10781/169393/5e81b698Ede55aa35/62f6c77ce58c8866.jpg",
          "catId": "2647",
          "catName": "山西",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/28325/2/11472/104599/5c90b563E7f9df943/c7c4e5f8ba45e64e.jpg",
          "catId": "2648",
          "catName": "内蒙古",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t23359/28/1944198302/228556/cb81ba0c/5b6d5786Nf3c63ac8.jpg",
          "catId": "2653",
          "catName": "福建",
          "showPic": true,
          "showVideo": false
        }
      ],
      "showPic": true,
      "showVideo": false
    },
    {
      "catId": "1583",
      "catName": "休闲食品",
      "catLevel": 2,
      "catType": 1,
      "childCateList": [
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/124512/30/4055/648064/5ed85dacE631811d6/a1ddb3d215909a1f.jpg",
          "catId": "1590",
          "catName": "休闲零食",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/199261/17/17179/132409/6191fb65E1d49e5d2/d42c69c018b646d0.jpg",
          "catId": "1591",
          "catName": "坚果炒货",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/126378/6/3795/857665/5ed5ab9fE61ee75df/79253ec46360ca43.png",
          "catId": "1592",
          "catName": "肉干肉脯",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/221194/12/2713/225980/6191fceeE2e5d1fee/b7140001d23c9198.jpg",
          "catId": "1593",
          "catName": "蜜饯果干",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/130034/25/15618/523938/5fac8e15E84b871da/45dc31dee1a4e220.png",
          "catId": "1594",
          "catName": "糖果",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/177728/10/9717/731375/60cb77e9E4c10e9e1/7ae1d424f0c4d406.png",
          "catId": "1595",
          "catName": "饼干蛋糕",
          "showPic": true,
          "showVideo": false
        }
      ],
      "showPic": true,
      "showVideo": false
    },
    {
      "catId": "1585",
      "catName": "饮料冲调",
      "catLevel": 2,
      "catType": 1,
      "childCateList": [
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/175064/33/23005/219475/6168eee1Ed59f4aef/a7f7dab7fb5c8d99.jpg",
          "catId": "1601",
          "catName": "冲饮谷物",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t25171/268/1139055306/236004/bb244324/5b88b326Na7890577.jpg",
          "catId": "1602",
          "catName": "饮料",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/171130/22/6024/128321/6020b2e4Ef4ba4542/353a556d47c25121.jpg",
          "catId": "3986",
          "catName": "咖啡/奶茶",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/107411/30/15915/199263/5eaf6b4cE0a7b4080/41335d5d95f576ce.jpg",
          "catId": "9434",
          "catName": "牛奶乳品",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/201557/13/17647/135095/61a9ceecE312cb7f8/81b6c24f7d7727c1.jpg",
          "catId": "10975",
          "catName": "饮用水",
          "showPic": true,
          "showVideo": false
        },
        {
          "backImg": "https://m.360buyimg.com/n2/jfs/t1/51415/33/16609/122207/61397309E88c81fbc/7c38686c1f2ffb84.jpg",
          "catId": "12200",
          "catName": "蜂蜜/柚子茶",
          "showPic": true,
          "showVideo": false
        }
      ],
      "showPic": true,
      "showVideo": false
    }
  ],
  "category": [
    {
      "catId": "A1",
      "catName": "电视机",
      "showPic": false,
      "showVideo": false
    },
    {
      "catId": "A2",
      "catName": "食品",
      "showPic": false,
      "showVideo": false
    },
    {
      "catId": "A3",
      "catName": "数码",
      "showPic": false,
      "showVideo": false
    },
    {
      "catId": "A4",
      "catName": "健康",
      "showPic": false,
      "showVideo": false
    },
    {
      "catId": "A5",
      "catName": "运动机械",
      "showPic": false,
      "showVideo": false
    }
  ]
})


const change = (index) => {
  console.log(index)
}
const onChange = (e) => {
  console.log('当前分类数据', e)
}
// 页面加载的时
onMounted(async () => {

  // 调取各接口

})
</script>
