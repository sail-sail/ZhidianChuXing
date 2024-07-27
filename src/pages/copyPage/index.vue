<template>
  <tm-app>
    <view class="container">
      <tm-card title="我的订单">
        <template v-slot:content>
          1111
        </template>
      </tm-card>

      <tm-card title="更多">
        <template v-slot:content>
          1111
        </template>
      </tm-card>


    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
} from './Api'

onMounted(async () => {
})


</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - env(safe-area-inset-bottom) - 75rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 246, 250);
}
</style>
