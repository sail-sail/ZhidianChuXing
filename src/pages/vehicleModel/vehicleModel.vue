<template>
  <view class="vehicle-container" v-if="inited">
    <!-- 送还地点 选车 -->
    <view class="return-vehicle-box">
      <view class="use-time">
        <text v-on:touchstart="chooseDateInfo('start')">
          {{ returnVehicleObj.startDate }}
          {{ returnVehicleObj.startTime }}
        </text>
        <text>&nbsp;-&nbsp;</text>
        <text v-on:touchstart="chooseDateInfo('end')">
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
    </view>

    <nut-row>
      <nut-col :span="6">
        <view class="col" v-on:touchstart="selectType('sort')">综合排序</view>
      </nut-col>
      <nut-col :span="6">
        <view class="col" v-on:touchstart="selectType('brand')">品牌</view>
      </nut-col>
      <nut-col :span="6">
        <view class="col" v-on:touchstart="selectType('price')">价格</view>
      </nut-col>
      <nut-col :span="6">
        <view class="col" v-on:touchstart="selectType('types')">类型</view>
      </nut-col>
    </nut-row>

    <nut-tabs v-model="value" direction="vertical" title-scroll style="height: 200px">
      <nut-tab-pane v-for="item in list" :key="item.id" :title="item.power_name" :pane-key="item.id">
        <!-- 车型列表 -->
        <view class="vehicle-list" v-for="item in vehicleList" :key="item.id">
          <!-- 车辆图片 车辆代号 -->
          <view class="images-codes">
            <image :src="item.image" :mode="'widthFix'"></image>
            <view class="codes">
              <view class="code-name">{{ item.motorcycle_name }}</view>
              <view class="code-special" v-if="Array.isArray(item.home1_tags) && item.home1_tags.length > 0">
                <view v-for="(i, index) in item.home1_tags" :key="index">
                  {{ i }}<text v-if="index !== item.home1_tags.length - 1">&nbsp;|&nbsp;</text>
                </view>
              </view>
            </view>
          </view>
          <!-- 分割线 -->
          <AtDivider />
          <!-- 车辆特点 -->
          <view class="character" v-if="Array.isArray(item.home2_tags) && item.home2_tags.length > 0">
            <view v-for="(i, index) in item.home2_tags" :key="index">
              {{ i }}
            </view>
          </view>
          <!-- 车辆详情 租金 -->
          <view class="detail-money">
            <view class="detail">车辆详情</view>
            <view class="money">
              <text>¥</text>
              {{ item.price }}
              <text>/</text>
              <text>天</text>
            </view>
          </view>
        </view>
      </nut-tab-pane>
    </nut-tabs>

    <!-- 选择时间 -->
    <selectDate :isOpened="isSelectDateOpend" :returnVehicleObj="returnVehicleObj" :type="type"
      @confirm="handleSelectDateCallBack" @close="handleSelectDateCallBack">
    </selectDate>

    <!-- 排序 价格 类型 的选择器弹窗 -->
    <nut-popup v-model:visible="selectTypeShow" position="bottom">
      <nut-picker :columns="columns" :title="selectTypeName()" three-dimensional @confirm="selectTypeConfirm"
        @cancel="selectTypeCancel" />
    </nut-popup>
    <nut-popup v-model:visible="selectTypeShow2" position="bottom">
      <nut-picker :columns="columns2" title="请选择车辆的品牌" three-dimensional @change="selectType2Change2"
        @confirm="selectTypeConfirm2" @cancel="selectTypeCancel2" />
    </nut-popup>

  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import QQMapWX from '../utils/map-wx-jssdk';
import sentRequest from '../utils/http'
import config from '../utils/config';
import './vehicleModel.scss'

import selectDate from '../selectdate/selectdate.vue';
import { nextTick } from 'vue';

let inited = ref<boolean>(false)
let type = ref<string | undefined>('')
// 送还选车时间
let returnVehicleObj = ref<any>({
  startDate: dayjs().format('YYYY-MM-DD'),
  endDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
  startTime: '14:00',
  endTime: '14:00',
})
// 位置信息
let positionInfo = ref<any>({
  latitude: '',
  longitude: '',
  city: '',
  address: ''
})

let isSelectDateOpend = ref<boolean>(false)
function chooseDateInfo(type_: string) {
  type.value = type_
  isSelectDateOpend.value = true;
}
function handleSelectDateCallBack() {
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

let selectTypeShow = ref<boolean>(false)
let selectTypeShow2 = ref<boolean>(false)
let columns2 = reactive<any[]>([])
let t = ref<string>('')
function selectType(_t: string) {
  if (_t === 'brand') {
    selectTypeShow2.value = true
  } else {
    t.value = _t;
    selectTypeShow.value = true;
  }
}
let columns = computed(() => {
  if (t.value === 'sort') {
    return [
      { text: '综合排序', value: 0 },
      { text: '价格从低到高', value: 1 },
      { text: '价格从高到低', value: 2 }
    ]
  } else if (t.value === 'price') {
    return [
      { text: '不限', value: '' },
      { text: '0-150元/天', value: 'b' },
      { text: '150-250元/天', value: 'c' },
      { text: '250-350元/天', value: 'b' },
      { text: '350-1000元/天', value: 'c' },
      { text: '1000-2000元/天', value: 'b' },
      { text: '2000-3000元/天', value: 'c' }
    ]

  } else if (t.value === 'types') {
    return [
      { text: '全部', value: 0 },
      { text: '自助取还', value: 1 },
      { text: '上门送取', value: 2 }
    ]
  } else {
    return []
  }
})
function selectTypeName() {
  if (t.value === 'sort') {
    return '请选择车辆的排序规则'
  } else if (t.value === 'price') {
    return '请选择车辆价格区间'
  } else if (t.value === 'types') {
    return '请选择车辆取还类型'
  } else {
    return ''
  }
}

// 或许下拉选择 的 品牌选项
async function getColumns2() {
  sentRequest({
    url: '/api/car/Index/carBrand',
    data: {},
    success: function (res) {
      if (res.code >= 1 && res.data.length) {
        const list = res.data
        for (let i = 0; i < list.length; ++i) {
          const item = list[i];
          columns2.push({
            text: item.brand_name,
            value: item.id,
            children: []
          })
        }
        // 级联组装数据
        sentRequest({
          url: '/api/car/Index/carSeries',
          data: { brand_id: columns2[0].value },
          success: function (res) {
            if (res.code >= 1 && res.data.length) {
              columns2[0].children = res.data.map((val) => {
                return {
                  text: val.series_name,
                  value: val.id,
                }
              })
            }
          }
        })
      }
    }
  })
}

function selectType2Change2(obj) {
  console.log(obj)
  if (obj.columnIndex === 0) {
    sentRequest({
      url: '/api/car/Index/carSeries',
      data: { brand_id: obj.selectedOptions[0].value },
      success: function (res) {
        if (res.code >= 1 && res.data.length) {
          obj.selectedOptions[0].children = res.data.map((val) => {
            return {
              text: val.series_name,
              value: val.id,
            }
          })
        }
      }
    })
  }
}

function selectTypeConfirm(obj) {
  console.log(obj.selectedValue[0]);
  selectTypeShow.value = false;
}
function selectTypeCancel() {
  selectTypeShow.value = false;
}

function selectTypeConfirm2(obj) {
  console.log(obj.selectedValue[obj.selectedValue.length-1]);
  selectTypeShow2.value = false;
}
function selectTypeCancel2() {
  selectTypeShow2.value = false;
}

let value = ref(0)
let list = reactive<any>([])
let vehicleList = reactive<any>([])
//获取左侧分类
async function getCarDong() {
  sentRequest({
    url: '/api/car/Index/powertype',
    data: {},
    success: res => {
      if (res.code >= 1 && res.data.length) {
        list = res.data;
        list.unshift({
          id: 0,
          power_name: '全部',
          starting_price: 0,
        })
        console.log(list)
        inited.value = true
      }
    }
  })
}

//获取车型列表
async function getVehicleListApi() {
  sentRequest({
    url: '/api/car/Index/motorcycle',
    data: {
      page: 1,
      limit: 100,
    },
    success: function (res) {
      if (res.code == 1) {
        vehicleList = res.data.data;
        console.log(res.data.data, '车型列表')
      }
    }
  })
}


// 页面加载的时
onMounted(async () => {
  //读取取车还车时间
  Taro.getStorage({
    key: 'pickupDateTime',
    success: function (res) {
      returnVehicleObj.value = res.data._value
    }
  })
  // 读取地点
  Taro.getStorage({
    key: 'location',
    success: function (res) {
      positionInfo.value = res.data._value
    }
  })

  // 调取各接口
  await getCarDong()
  await getColumns2()
  await getVehicleListApi()
})
</script>
