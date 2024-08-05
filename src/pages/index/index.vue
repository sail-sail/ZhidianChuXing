<template>
<tm-app>
  <view class="container">
    <view class="carousel">
      <tm-carousel autoplay :margin="[0, 0]" :round="0" :width="750" :height="380" :list="bannerList"></tm-carousel>
    </view>
    <view class="content">
      <view
        class="city-address-pickup"
        @click="showCityPicker = true"
      >
        <view class="city-address">
          <view>
            {{ cityLbl }}
          </view>
          <view>&nbsp;|&nbsp;</view>
          <view>{{ address }}</view>
        </view>
        <view class="pickup">到店</view>
      </view>
      
      <tm-divider color="#efefef" :margin="[0, 0]"></tm-divider>
      
      <view
        class="time-weekday-date"
        @click="startTimeShow = true"
      >
        <view
          class="item"
        >
          <span class="time-weekday">
            {{ startWeekDay }}
            {{ startTimeHHmm }}
          </span>
          <span class="date">
            {{ startTimeYYYYMMDD }}
          </span>
        </view>
        <view class="item">
          <span></span>
          <span class="total">{{ totalDayHourStr }}</span>
        </view>
        <view
          class="item"
        >
          <span class="time-weekday">
            {{ endWeekDay }}
            {{ endTimeHHmm }}
          </span>
          <span class="date">
            {{ endTimeYYYYMMDD }}
          </span>
        </view>
      </view>

      <tm-button
        font-color="#fff"
        :margin="[100, 20]"
        :round="10"
        :width="550"
        @click="toCarList"
      >
        去选车
      </tm-button>

      <view class="store-navigation-share">
        <view class="item" @click="callPhone"><tm-icon color="blue" :font-size="32"
            name="tmicon-phone-fill"></tm-icon>&nbsp;&nbsp;<span>联系门店</span>
        </view>
        <view class="item" @click="startNavigation"><tm-icon color="blue" :font-size="32"
            name="tmicon-paperplane-fill"></tm-icon>&nbsp;&nbsp;<span>地址导航</span></view>
      </view>
    </view>
    
    <!-- 芝麻免压 -->
    <view
      un-flex="~"
      un-h="30"
      un-m="x-2.5 t--5"
      un-gap="2.5"
    >
      
      <view
        un-flex="~ [1_0_0] col"
        un-overflow="hidden"
        un-bg="white"
        un-rounded="lg"
        un-p="x-2 y-3"
        un-box-border
        un-text="3"
        un-gap="1"
      >
        <view
          un-flex="~"
          un-text="[#64b0f3]"
        >
          <view>
            <view
              un-i="iconfont-zhima"
            ></view>
          </view>
          <view>
            芝麻免押
          </view>
        </view>
        
        <view
          un-flex="~ [1_0_0] col"
          un-overflow="hidden"
          un-gap="1"
        >
          <view
            un-font="bold"
          >
            免押租车
          </view>
          <view
            un-text="gray-800"
          >
            租车押金, 违章押金, 双免
          </view>
        </view>
        
        <view
          un-flex="~"
          un-text="gray-500"
        >
          <view>
            查看详情
          </view>
          <view>
            <view
              un-i="iconfont-right"
            ></view>
          </view>
        </view>
        
      </view>
      
      <view
        un-flex="~ [2_0_0] col"
        un-gap="2"
      >
        <view
          un-flex="~ [1_0_0]"
          un-overflow="hidden"
          un-bg="white"
          un-rounded="lg"
          un-items="center"
        >
          <view
            un-flex="~ [1_0_0] col"
            un-overflow="hidden"
            un-gap="1"
            un-p="l-2"
            un-box-border
          >
            <view
              un-font="bold"
            >
              全城上门送取
            </view>
            <view
              un-text="3 gray-800"
            >
              预定时可选择上门送取服务
            </view>
          </view>
          <view
            un-flex="~"
            un-text="3 gray-500"
          >
            <view>
              查看详情
            </view>
            <view>
              <view
                un-i="iconfont-right"
              ></view>
            </view>
          </view>
        </view>
        <view
          un-flex="~ [1_0_0]"
          un-overflow="hidden"
          un-bg="white"
          un-rounded="lg"
          un-items="center"
        >
          <view
            un-flex="~ [1_0_0] col"
            un-overflow="hidden"
            un-gap="1"
            un-p="l-2"
            un-box-border
          >
            <view
              un-font="bold"
            >
              <text>
                长租 精选
              </text>
              <text
                un-text="[red]"
              >
                特惠
              </text>
            </view>
            <view
              un-text="3 gray-800"
            >
              个人/企业长租定制专属方案
            </view>
          </view>
          <view
            un-flex="~"
            un-text="3 gray-500"
          >
            <view>
              查看详情
            </view>
            <view>
              <view
                un-i="iconfont-right"
              ></view>
            </view>
          </view>
        </view>
      </view>
      
    </view>
    
    <!-- 新手租车指南 -->
    <view
      un-flex="~"
      un-justify-center
      un-items-center
      un-h="16"
      un-m="x-2.5 y-2.5"
      un-gap="2.5"
      un-rounded="3.125"
      un-bg="[#408ecc]"
      un-p="2.5"
      un-box-border
      un-relative
      un-text="white"
    >
      <view
        un-flex="~ [1_0_0] col"
        un-overflow="hidden"
        un-gap="1"
      >
        <view
          un-text="4 center"
        >
          新手租车指南
        </view>
        <view
          un-text="3 center"
        >
          在线租车 高效服务
        </view>
      </view>
      
      <view
        un-absolute
        un-right="2.5"
        un-h="full"
        un-top="0"
        un-flex="~"
        un-items-center
      >
        <view
          un-i="iconfont-right"
        ></view>
      </view>
    </view>
    
  </view>
  <tm-picker
    :defaultValue="cityIndex"
    v-model="cityIndex"
    v-model:show="showCityPicker"
    :columns="cityPickerData"
  ></tm-picker>
  
  <tm-drawer
    v-model:show="startTimeShow"
    hideHeader
  >
    <view class="pa-16">
      <tm-time-between
        @confirm="startTimeShow = false"
        :asyncModel="false"
        v-model="startEndTime"
        :default-value="startEndTime"
        :showDetail="{
          year: true,
          month: true,
          day: true,
          hour: true,
        }"
        :quickBtn="[ ]"
      ></tm-time-between>
    </view>
  </tm-drawer>
</tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import dayjs from 'dayjs';

import {
  getBannerList
} from './Api'

let bannerList = $ref<string[]>([])
//应有一个自取点的下拉列表选择然后匹配对应的经纬度，点击下方导航就会导航到对应的自取点

let startTimeShow = $ref<boolean>(false);
const dateNow = new Date();

let startTime = $ref<Date>(dateNow);
let endTime = $ref<Date>(dayjs(dateNow).add(2, "day").toDate());
let startEndTime = $computed({
  get() {
    return [
      startTime,
      endTime,
    ];
  },
  set(val: Date[]) {
    startTime = dayjs(val[0]).toDate();
    endTime = dayjs(val[1]).toDate();
  },
});

const startTimeHHmm = $computed<string>(() => {
  const str = dayjs(startTime).format("HH:mm");
  return str;
});

const startTimeYYYYMMDD = $computed<string>(() => {
  const str = dayjs(startTime).format("YYYY-MM-DD");
  return str;
});

const totalDayHourStr = $computed<string>(() => {
  const startTimeNum = startTime.getTime();
  const endTimeNum = endTime.getTime();
  const durationNum = endTimeNum - startTimeNum;
  const dayDur = Math.floor(durationNum / 86400000);
  const hourDur = Math.round((durationNum % 86400000) / 3600000);
  let str = "";
  if (dayDur > 0) {
    str += `${ dayDur } 天 `;
  }
  if (hourDur > 0) {
    str += `${ hourDur } 小时 `;
  }
  if (str.endsWith(" ")) {
    str = str.substring(0, str.length - 1);
  }
  return str;
});

const endTimeHHmm = $computed<string>(() => {
  const str = dayjs(endTime).format("HH:mm");
  return str;
});

const endTimeYYYYMMDD = $computed<string>(() => {
  const str = dayjs(endTime).format("YYYY-MM-DD");
  return str;
});

const weekDay = {
  "Monday": '周一',
  "Tuesday": '周二',
  "Wednesday": '周三',
  "Thursday": '周四',
  "Friday": '周五',
  "Saturday": '周六',
  "Sunday": '周日',
};

const startWeekDay = $computed<string>(() => {
  const temp = dayjs(startTime).format('dddd')
  const str = weekDay[temp as string]
  return str;
});

const endWeekDay = $computed<string>(() => {
  const temp = dayjs(endTime).format('dddd')
  const str = weekDay[temp as string]
  return str;
});

async function callPhone() {
  try {
    await uni.makePhoneCall({
      phoneNumber: '400-1234-1234'
    });
  } catch(err) {
  }
}

// 去选车
async function toCarList() {
  await uni.navigateTo({
    url: "/pages/car_list/index",
  });
}

function startNavigation() {
  uni.openLocation({
    latitude: 31.194283, // 纬度，浮点数，范围为90 ~ -90
    longitude: 121.317207, // 经度，浮点数，范围为180 ~ -180。
    name: "质电出行(虹桥客运站店)", // 位置名
    address: "上海市闵行区申虹路298号", // 地址详情说明
  });
}

// 选择城市
let showCityPicker = $ref<boolean>(false);
let cityIndex = $ref<number[]>([ 0, 0 ]);
let cityPickerData = $ref<any[]>([
  {
    text: "上海",
    id: 1,
    children: [
      {
        text: "虹桥客运站",
        id: 11,
      },
      {
        text: "浦东新区",
        id: 12,
      },
      {
        text: "徐汇区",
        id: 13,
      },
    ],
  },
  {
    text: "杭州",
    id: 2,
    children: [
      {
        text: "杭州客运站",
        id: 21,
      },
      {
        text: "萧山区",
        id: 22,
      },
      {
        text: "余杭区",
        id: 23,
      },
    ],
  },
]);
const cityLbl = $computed(() => {
  return cityPickerData[cityIndex[0]]?.text ?? "";
});
const address = $computed(() => {
  return cityPickerData[cityIndex[0]]?.children?.[cityIndex[1]]?.text ?? "";
});


onMounted(async () => {
  const res = await getBannerList()
  if (res && res.banner) {
    bannerList = res.banner.map((i) => i.image)
  }
})
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - env(safe-area-inset-bottom));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 246, 250);
}

.carousel {
  width: 100%;
}

.content {
  box-sizing: border-box;
  border-radius: 25rpx;
  position: relative;
  top: -60rpx;
  z-index: 2;
  background-color: #fff;
  padding-bottom: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  
  .city-address-pickup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25rpx;
    margin-bottom: 10rpx;

    .city-address {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 28rpx;
    }

    .pickup {
      box-sizing: border-box;
      padding: 5rpx 20rpx;
      border-radius: 20rpx;
      background-color: rgb(229, 229, 229);
    }
  }


  .time-weekday-date {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .time-weekday {
        color: gray;
        font-size: 30rpx;
        margin-top: 30rpx;
        margin-bottom: 15rpx;
      }

      .date {
        font-size: 36rpx;
        font-weight: bold;
      }

      .total {
        color: gray;
        font-size: 30rpx;
      }
    }
  }

  .store-navigation-share {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 25rpx;
    margin-bottom: 25rpx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
