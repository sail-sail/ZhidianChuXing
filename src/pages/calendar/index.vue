<template>
  <view class="container">
    <tm-calendar-view v-model="calendarValue" color="green" model="rang" hideButton :start="new Date()"
      @click="handleClick"></tm-calendar-view>
    <view class="display">
      <span>开始:{{ startDateTime[0] }}&nbsp;{{ startDateTime[1] }}</span>
      <span>共计:{{ totalDayHour[0] ? (totalDayHour[0] + '天') : null }}&nbsp;{{ totalDayHour[1] ? (totalDayHour[1] + '时')
        : null }}</span>
      <span>结束:{{ endDateTime[0] }}&nbsp;{{ endDateTime[1] }}</span>
    </view>
    <tm-button color="rgb(100,200,36)" font-color="white" block>确认</tm-button>
    <tm-button font-color="#000" block @click="goBack">返回</tm-button>
    <tm-drawer :height="1300" placement="bottom" v-model:show="showWin" hideCancel :overlayClick="false" @ok="handleOk">
      <view class="timeItems">
        <tm-button v-for="(item, index) in timeArray" :key="item" class="tiemItem" @click="chooseTime(index)"
          :transprent="activeIndex === index ? true : false" color="green" fontColor="#000"
          :disabled="disabledIndex ? index < disabledIndex : false" :width="125">{{ item }}</tm-button>
      </view>
    </tm-drawer>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import {
  timeArray,
  timeObj
} from './config'
import useCalendarStore from "@/store/calendar";
const calendarStore = useCalendarStore();

let startDateTime = $ref<string[]>(calendarStore.startDateTime)
let endDateTime = $ref<string[]>(calendarStore.endDateTime)
let totalDayHour = $ref<number[]>(calendarStore.totalDayHour)
let calendarValue = $ref<string[]>([])

let showWin = $ref<boolean>(false)
let activeIndex = $ref<number>()
let type = $ref<'start' | 'end' | undefined>(undefined)
let disabledIndex = $ref<number>()

function handleClick(e: unknown) {
  if (typeof e === 'string') {
    //开始时间，点击的就是开始的，或者结束已经有值了，说明再次选择的了,
    if (startDateTime[0] === '') {
      startDateTime[0] = e
      calendarValue[0] = e

      //清空 结束时间 计算时间
      endDateTime[0] = ''
      endDateTime[1] = ''
      totalDayHour = []

      activeIndex = undefined
      getDisabledIndex('start')
      type = 'start'
      showWin = true
    } else if (endDateTime[0] !== '') {
      if (calendarValue[1]) calendarValue.pop()
      startDateTime[0] = e
      calendarValue[0] = e

      //清空 结束时间 计算时间
      endDateTime[0] = ''
      endDateTime[1] = ''
      totalDayHour = []

      activeIndex = undefined
      getDisabledIndex('start')
      type = 'start'
      showWin = true
    } else {
      if (dayjs(e).unix() > dayjs(startDateTime[0]).unix()) {
        endDateTime[0] = e
        calendarValue[1] = e
        activeIndex = undefined
        getDisabledIndex('end')
        type = 'end'
        showWin = true
      } else {
        startDateTime[0] = ''
        startDateTime[1] = ''
        endDateTime[0] = ''
        endDateTime[1] = ''
        totalDayHour = []
        calendarValue = []
        activeIndex = undefined
        type = undefined
        showWin = false
      }
    }
    //计算相差天数
    if (startDateTime[0] && startDateTime[0] !== '' && endDateTime[0] && endDateTime[0] !== '') {
      let day = dayjs(endDateTime[0]).diff(dayjs(startDateTime[0]), 'day');
      totalDayHour[0] = day
    }
    calendarStore.setAllDayTime(startDateTime, endDateTime, totalDayHour)
  }
}

function getDisabledIndex(type: 'start' | 'end') {
  if (type === 'start') {
    //开始时间 是 今天 的 才需要 闲置可选时间段
    if (dayjs(startDateTime[0]).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
      //补0操作
      let tempStr = dayjs().hour() < 10 ? `0${String(dayjs().hour())}` : `${String(dayjs().hour())}`
      let lastIndex = timeArray.findLastIndex((item) => item.includes(tempStr))
      disabledIndex = (lastIndex + 1) <= 47 ? (lastIndex + 1) : lastIndex
    }
  } else {
    disabledIndex = undefined
  }
}

function chooseTime(index: number) {
  activeIndex = index
}

function handleOk() {
  if (!activeIndex) return
  const chooseTimeItem = timeArray[activeIndex]
  if (type === 'start') {
    startDateTime[1] = chooseTimeItem
  } else if (type === 'end') {
    endDateTime[1] = chooseTimeItem
  }
  //计算时间差值
  if (startDateTime[1] && startDateTime[1] !== '' && endDateTime[1] && endDateTime[0] !== '') {
    let hour = timeObj[endDateTime[1]] - timeObj[startDateTime[1]]
    // 差值大于0不用减去1天
    if (hour > 0) {
      totalDayHour[1] = hour
    } else {
      totalDayHour[0] = totalDayHour[0] - 1
      totalDayHour[1] = hour + 24
    }
  }
  calendarStore.setAllDayTime(startDateTime, endDateTime, totalDayHour)
}

function goBack() {
  uni.navigateBack()
}

</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.display {
  display: flex;
  flex-direction: column;
}

.timeItems {
  width: 100%;
  box-sizing: border-box;
  padding: 25rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .tiemItem {
    margin-right: 25rpx;
    margin-bottom: 15rpx;
  }
}
</style>
