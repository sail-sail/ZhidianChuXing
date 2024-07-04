<template>
  <AtDrawer :show="isOpened" right :mask="false" width="100%">
    <view class="container">
      <view class="content-container">
      </view>
      <view class="buttons-container">
        <AtButton @click="onClose">确认</AtButton>
        <AtButton @click="onClose">关闭</AtButton>
      </view>
    </view>
  </AtDrawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import './searchvehicle.scss'

const emit = defineEmits(['close'])//声明传递的事件名

const props = withDefaults(
  defineProps<{
    isOpened: boolean,
  }>(), {
  isOpened: false
})

let isOpened = ref<boolean>(props.isOpened)
watch(() => props.isOpened,
  () => {
    isOpened.value = props.isOpened;
  })



function onClose() {
  isOpened.value = false
  emit('close')
}
</script>
