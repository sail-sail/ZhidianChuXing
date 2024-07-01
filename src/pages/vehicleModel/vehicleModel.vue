<template>
  <view>
    <view @click="handleclick">车型</view>

    <customTabBar></customTabBar>
  </view>
</template>

<script setup lang="ts">
import './vehicleModel.scss'



function handleclick(){
  console.log(1111)
}

</script>
