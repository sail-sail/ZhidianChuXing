<template>
<tm-app
  un-bg="gray-100"
  un-gap="2"
>
  <view
    un-box-border
    un-rounded="4"
    un-p="y-4 x-4"
    un-bg="white"
    un-m="2"
    un-shadow="md"
  >
    
    <view
      un-flex="~"
      un-items="center"
      un-box-border
      un-rounded="4"
      un-bg="white"
    >
      <view
        un-flex="~"
        un-items="center"
        un-text="bold 4"
        un-gap="2"
      >
        <view
          un-whitespace="nowrap"
        >
          上海
        </view>
        <view
          un-text="gray-200"
        >
          |
        </view>
        <view
          un-whitespace="nowrap"
          un-overflow="hidden"
          un-text="ellipsis"
        >
          虹桥客运站
        </view>
      </view>
      
      <view
        un-flex="[1_0_0]"
      ></view>
      
      <view
        un-box-border
        un-rounded="4"
        un-bg="gray-200"
        un-p="x-2 y-1"
      >
        到店
      </view>
    </view>
    
    <view
      un-m="y-4"
    >
      <tm-divider
        color="#efefef"
        :margin="[0, 0]"
      ></tm-divider>
    </view>
    
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
    
  </view>
  
  <view
    un-rounded="md"
    un-bg="white"
  >
    <tm-filterMenu
      ref="filterRef"
    >
      
      <tm-filterMenu-item
        title="排序"
        :height="180"
      >
        <tm-radio-group
          v-model="sortValue"
          :defaultValue="sortValue"
          direction="customCol"
        >
          
          <tm-radio
            un-m="t-1"
            value="1"
            label="低价优先 (总价)"
            @click="filterRef?.close()"
          ></tm-radio>
          
          <tm-radio
            un-m="t-4"
            value="2"
            label="高价优先 (总价)"
            @click="filterRef?.close()"
          ></tm-radio>
          
        </tm-radio-group>
      </tm-filterMenu-item>
      
      <tm-filterMenu-item
        title="筛选"
        :height="600"
        :footer-height="100"
        un-w="full"
      >
        <view>
          
          <tm-text
            :font-size="34"
            label="类型"
          ></tm-text>
          
          <tm-divider :margin="[10, 10]"></tm-divider>
          
          <tm-radio-group
            v-model="typeRadio"
            :defaultValue="typeRadio"
            :custom="false"
          >
            <tm-radio
              v-for="item in typeData"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :custom="false"
            >
              <template v-slot:default="{ checked }">
                <tm-tag
                  :userInteractionEnabled="false"
                  :label="item.label"
                  :border="1"
                  :shadow="0"
                  :text="!checked.checked"
                  size="n"
                ></tm-tag>
              </template>
            </tm-radio>
          </tm-radio-group>
          
        </view>
        
        <view
          un-m="t-4"
        >
          
          <tm-text
            :font-size="34"
            label="价格区间 (日租金)"
          ></tm-text>
          
          <tm-divider></tm-divider>
          
          <tm-radio-group
            v-model="priceRadio"
            :defaultValue="priceRadio"
            :custom="false"
          >
            <tm-radio
              v-for="item in priceData"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :custom="false"
            >
              <template v-slot:default="{ checked }">
                <tm-tag
                  :userInteractionEnabled="false"
                  :label="item.label"
                  :border="1"
                  :shadow="0"
                  :text="!checked.checked"
                  size="n"
                ></tm-tag>
              </template>
            </tm-radio>
          </tm-radio-group>
          
        </view>
        
        <view
          un-m="t-4"
        >
          
          <tm-text
            :font-size="34"
            label="品牌"
          ></tm-text>
          
          <tm-divider></tm-divider>
          
          <tm-radio-group
            v-model="brandRadio"
            :defaultValue="brandRadio"
            :custom="false"
          >
            <tm-radio
              v-for="item in brandData"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :custom="false"
            >
              <template v-slot:default="{ checked }">
                <tm-tag
                  :userInteractionEnabled="false"
                  :label="item.label"
                  :border="1"
                  :shadow="0"
                  :text="!checked.checked"
                  size="n"
                ></tm-tag>
              </template>
            </tm-radio>
          </tm-radio-group>
          
        </view>
        
        <template v-slot:footer>
          <view class="flex flex-row flex-row-between">
            <view class="pl-24 pr-12 flex-1">
              <tm-button
                @click="resetFilter"
                :shadow="0"
                text
                :outlined="true"
                block
                label="重置"
                :round="25"
              ></tm-button>
            </view>
            <view class="pr-24 pl-12 flex-1">
              <tm-button
                @click="filterRef?.close()"
                block
                :border="1"
                label="确认"
                :round="25"
              ></tm-button>
            </view>
          </view>
        </template>
      </tm-filterMenu-item>
      
    </tm-filterMenu>
  </view>
  
  <view
    un-box-border
    un-p="y-2"
    un-bg="white"
    un-w="full"
  >
    <view
      v-for="model in car_models"
      :key="model.id"
      un-box-border
      un-rounded="4"
      un-m="2"
      un-p="2"
      un-shadow="lg"
      un-bg="white"
      @click="onCarDetail(model)"
    >
      <view
        un-flex="~"
        un-min-h="20"
        un-box-border
        un-p="2"
        un-gap="2"
      >
        <view
          un-flex="~"
          un-w="20"
        >
          <image
            un-w="full"
            un-h="full"
            :src="model.img"
            mode="aspectFit"
          ></image>
        </view>
        
        <view
          un-flex="~ [1_0_0] col"
          un-overflow="hidden"
          un-justify="between"
          un-m="l-1"
        >
          <view
            un-text="black 4"
          >
            {{ model.name }}
          </view>
          <view
            un-flex="~"
          >
            <view>
              {{ model.transmission_type }}
            </view>
            <view> / </view>
            <view>
              {{ model.displacement }}
            </view>
            <view> / </view>
            <view>
              {{ model.car_type }}
            </view>
          </view>
          <view>
            {{ model.color }}
          </view>
        </view>
        
      </view>
      
      <tm-divider
        :margin="[0, 0]"
      ></tm-divider>
      
      <view
        un-flex="~ col"
        un-min-h="14"
        un-box-border
        un-p="2"
        un-gap="2"
      >
        
        <view
          un-flex="~"
          un-justify="between"
          un-items="center"
        >
          <view
            un-flex="~"
            un-items="center"
          >
            <tm-tag
              v-for="(tag, t) in model.tags"
              :key="model.id + tag"
              size="xs"
              :label="tag"
              :border="1"
              :text="t > 0"
            ></tm-tag>
          </view>
          <view
            un-flex="~"
            un-items="center"
            un-gap="x-2"
          >
            <view
              un-text="red 4"
            >
              日均
            </view>
            <view
              un-text="red 4"
              un-font="bold"
            >
              ¥ {{ model.price }}
            </view>
          </view>
        </view>
        
        <view
          un-flex="~"
          un-justify="end"
          un-items="center"
        >
          <view
            un-text="gray-400 3"
            un-bg="red-100"
            un-p="x-2 y-1"
            un-box-border
            un-rounded="md"
          >
            总价:¥{{ model.total }}
          </view>
        </view>
        
      </view>
    </view>
    
    <view
      un-m="x-4"
    >
      <tm-divider
        :font-size="24"
        align="center"
        label="我是有底线的"
      ></tm-divider>
    </view>
  </view>
  
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
import {
  onMounted,
} from "vue";

import TmFilterMenu from "@/tmui/components/tm-filterMenu/tm-filterMenu.vue";

import dayjs from "dayjs";

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

let filterRef = $ref<InstanceType<typeof TmFilterMenu>>();
let sortValue = $ref<string>("1");
let typeRadio = $ref<string>("");
let typeData = [
  {
    label: "三厢车",
    value: "1",
  },
  {
    label: "SUV",
    value: "2",
  },
  {
    label: "MPV",
    value: "3",
  },
  {
    label: "掀背车",
    value: "4",
  },
  {
    label: "软顶敞篷车",
    value: "5",
  },
  {
    label: "硬顶跑车",
    value: "6",
  },
  {
    label: "旅行车",
    value: "7",
  },
  {
    label: "硬顶敞篷车",
    value: "8",
  },
];
let priceRadio = $ref<string>("");
let priceData = [
  {
    label: "0-200",
    value: "1",
  },
  {
    label: "200-500元",
    value: "2",
  },
  {
    label: "500+",
    value: "3",
  },
];
let brandRadio = $ref<string>("");
let brandData = [
  {
    label: "奥迪",
    value: "1",
  },
  {
    label: "宝马",
    value: "2",
  },
  {
    label: "奔驰",
    value: "3",
  },
  {
    label: "大众",
    value: "4",
  },
  {
    label: "丰田",
    value: "5",
  },
  {
    label: "本田",
    value: "6",
  },
  {
    label: "日产",
    value: "7",
  },
  {
    label: "现代",
    value: "8",
  },
  {
    label: "福特",
    value: "9",
  },
  {
    label: "别克",
    value: "10",
  },
  {
    label: "雪佛兰",
    value: "11",
  },
  {
    label: "马自达",
    value: "12",
  },
  {
    label: "雷克萨斯",
    value: "13",
  },
  {
    label: "沃尔沃",
    value: "14",
  },
  {
    label: "保时捷",
    value: "15",
  },
  {
    label: "路虎",
    value: "16",
  },
  {
    label: "捷豹",
    value: "17",
  },
  {
    label: "奔驰",
    value: "18",
  },
  {
    label: "宝马",
    value: "19",
  },
  {
    label: "奥迪",
    value: "20",
  },
  {
    label: "保时捷",
    value: "21",
  },
  {
    label: "路虎",
    value: "22",
  },
  {
    label: "捷豹",
    value: "23",
  },
  {
    label: "奔驰",
    value: "24",
  },
  {
    label: "宝马",
    value: "25",
  },
  {
    label: "奥迪",
    value: "26",
  },
];

async function resetFilter() {
  sortValue = "1";
  typeRadio = "";
  priceRadio = "";
  brandRadio = "";
}

let car_models = $ref([
  {
    id: "1",
    img: "https://img.yzcdn.cn/vant/apple-1.jpg",
    name: "大众 帕拉特新能源",
    // 自动挡
    transmission_type: "自动",
    // 排量
    displacement: "1.4T",
    // 车型
    car_type: "三厢车",
    color: "金色",
    tags: ["芝麻免押", "可配司机", "送车上门"],
    price: 200,
    total: 806,
  },
  {
    id: "2",
    img: "https://img.yzcdn.cn/vant/apple-2.jpg",
    name: "奥迪 A4L",
    // 自动挡
    transmission_type: "自动",
    // 排量
    displacement: "2.0T",
    // 车型
    car_type: "三厢车",
    color: "黑色",
    tags: ["芝麻免押", "可配司机", "送车上门"],
    price: 300,
    total: 1206,
  },
  {
    id: "3",
    img: "https://img.yzcdn.cn/vant/apple-3.jpg",
    name: "奔驰 C200L",
    // 自动挡
    transmission_type: "自动",
    // 排量
    displacement: "1.8T",
    // 车型
    car_type: "三厢车",
    color: "白色",
    tags: ["芝麻免押", "可配司机", "送车上门"],
    price: 400,
    total: 1606,
  },
  {
    id: "4",
    img: "https://img.yzcdn.cn/vant/apple-4.jpg",
    name: "宝马 320Li",
    // 自动挡
    transmission_type: "自动",
    // 排量
    displacement: "2.0T",
    // 车型
    car_type: "三厢车",
    color: "黑色",
    tags: ["芝麻免押", "可配司机", "送车上门"],
    price: 500,
    total: 2006,
  },
]);

// 打开详情页面
async function onCarDetail(model: any) {
  await uni.navigateTo({
    url: `/pages/car_detail/index?id=${ encodeURIComponent(model.id) }`,
  });
}
</script>

<style lang="scss" scoped>
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
</style>
