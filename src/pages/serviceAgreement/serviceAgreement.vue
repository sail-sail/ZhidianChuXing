<template>
  <view class="container">

    <canvas style="width: 300px; height: 200px;" canvas-id="canvas" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import './serviceAgreement.scss'
import sendRequest from '../../utils/http'


onMounted(async () => {
})
</script>
