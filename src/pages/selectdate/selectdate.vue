<template>
  <nut-popup v-model:visible="isOpened" position="bottom" :style="{ height: '50%' }" round
    :close-on-click-overlay="false">
    <nut-date-picker type="datetime" :min-date="min" :three-dimensional="false" @confirm="confirm" @cancel="cancle">
      <view style="text-align: center;">
        {{ type === 'start' ? '取车时间' : '还车时间' }}
      </view>
    </nut-date-picker>
  </nut-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs';
import './selectdate.scss'

const emit = defineEmits(['confirm', 'close'])//声明传递的事件名
const props = withDefaults(
  defineProps<{
    isOpened: boolean,
    returnVehicleObj: any;
    type: string | undefined;
  }>(), {
  isOpened: false
})

const confirm = ({ selectedValue }) => {
  if (type.value === 'start') {
    returnVehicleObj.value.startDate = dayjs(new Date(selectedValue[0], selectedValue[1], selectedValue[2])).format('YYYY-MM-DD')
    returnVehicleObj.value.startTime = `${selectedValue[3]}:${selectedValue[4]}`
  } else if (type.value === 'end') {
    returnVehicleObj.value.endDate = dayjs(new Date(selectedValue[0], selectedValue[1], selectedValue[2])).format('YYYY-MM-DD')
    returnVehicleObj.value.endTime = `${selectedValue[3]}:${selectedValue[4]}`
  }
  //存档。
  Taro.setStorage({
    key: "pickupDateTime",
    data: returnVehicleObj
  })

  isOpened.value = false
  emit('confirm')
}
const cancle = () => {
  isOpened.value = false
  emit('close')
}

let min = ref<any>(new Date());
let isOpened = ref<boolean>(props.isOpened)
let type = ref<string | undefined>()
let returnVehicleObj = ref<any>({
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
})

watch(() => props.isOpened,
  () => {
    isOpened.value = props.isOpened;
  })
watch(() => [props.returnVehicleObj, props.type],
  () => {
    type.value = props.type
    returnVehicleObj.value = props.returnVehicleObj;
    min.value = type.value === 'end'
      ? new Date(dayjs(returnVehicleObj.value.startDate)
        .add(2, 'day')
        .format('YYYY-MM-DD hh:mm:ss'))
      : new Date()
  }, {
  deep: true,
  immediate: true
})
</script>
