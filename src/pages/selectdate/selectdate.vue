<template>
  <!-- 选择日期 -->
  <AtFloatLayout :isOpened="isOpened" title="请选择取还车日期" @close="handleClose">
    <nut-date-picker
    v-model="val"
    type="datetime"
    :min-date="min"
    :max-date="max"
    :three-dimensional="false"
    @confirm="confirm"
  ></nut-date-picker>
    <!-- 取车日期 -->
    <view class="error" v-if="startDatetext !== ''">{{ startDatetext }}</view>
    <view class="pickup">
      <picker mode='date' :value="returnVehicleObj.startDate" @change="handleStartDateChange">
        <view class="datetime">
          <text>取车日期</text>
          <text>{{ returnVehicleObj.startDate }}</text>
        </view>
      </picker>

      <picker mode='time' :value="returnVehicleObj.startTime" @change="handleStartTimeChange">
        <view class="datetime">
          <text>取车当日时间</text>
          <text>{{ returnVehicleObj.startTime }}</text>
        </view>
      </picker>
    </view>

    <!-- 还车日期 -->
    <view class="error" v-if="endDatetext !== ''">{{ endDatetext }}</view>
    <view class="pickup">
      <picker mode='date' :value="returnVehicleObj.endDate" @change="handleEndDateChange">
        <view class="datetime">
          <text>还车日期</text>
          <text>{{ returnVehicleObj.endDate }}</text>
        </view>
      </picker>

      <picker mode='time' :value="returnVehicleObj.endTime" @change="handleEndTimeChange">
        <view class="datetime">
          <text>还车当日时间</text>
          <text>{{ returnVehicleObj.endTime }}</text>
        </view>
      </picker>
    </view>
  </AtFloatLayout>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import dayjs from 'dayjs';

import './selectdate.scss'

const emit = defineEmits(['close'])//声明传递的事件名

const props = withDefaults(
  defineProps<{
    isOpened: boolean,
    returnVehicleObj: any
  }>(), {
  isOpened: false
})

const min = new Date(2020, 0, 1, 10, 40)
const max = new Date(2025, 10, 1, 23, 29)
const val = ref(new Date())
const confirm = ({ selectedValue }) => {
  console.log(selectedValue)
}

//后期需要根据userInfo(是否登录过控制弹出)
let isOpened = ref<boolean>(props.isOpened)
let returnVehicleObj = ref<any>({
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
})

let startDatetext = ref<string>('')
let endDatetext = ref<string>('')

watch(() => props.isOpened,
  () => {
    isOpened.value = props.isOpened;
  })
watch(() => props.returnVehicleObj,
  () => {
    returnVehicleObj.value = props.returnVehicleObj
  }, {
  deep: true,
  immediate: true
})

function handleStartDateChange(obj) {
  // 判断所选时间不能小于当天
  const today = dayjs().subtract(1, 'day').unix()//当前时间 -1天 时间戳
  const selectDay = dayjs(obj.detail.value).unix()
  if (selectDay < today) {
    startDatetext.value = '取车日期不能早于今天'
  } else {
    returnVehicleObj.value.startDate = obj.detail.value
    startDatetext.value = ''
  }
}
function handleStartTimeChange(obj) {
  returnVehicleObj.value.startTime = obj.detail.value
  returnVehicleObj.value.endTime = obj.detail.value
}
function handleEndDateChange(obj) {
  // 判断所选时间不能小于当天
  const startDay = dayjs(returnVehicleObj.value.startDate).unix()
  const selectDay = dayjs(obj.detail.value).unix()
  if (selectDay <= startDay) {
    endDatetext.value = '还车日期不能早于等于取车日期'
  } else {
    returnVehicleObj.value.endDate = obj.detail.value
    endDatetext.value = ''
  }
}
function handleEndTimeChange(obj) {
  returnVehicleObj.value.startTime = obj.detail.value
  returnVehicleObj.value.endTime = obj.detail.value
}

// 取消
function handleClose() {
  isOpened.value = false
  emit('close')
  startDatetext.value = ''
  endDatetext.value = ''
}
</script>
