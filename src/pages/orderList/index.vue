<template>
  <tm-app>
    <view class="container">
      <tm-segtab :width="750" :list="list" defaultValue="2"></tm-segtab>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
} from './Api'

let list = $ref([
  { text: '已预订', id: '1' },
  { text: '进行中', id: '2' },
  { text: '已完成', id: '3' },
  { text: '已取消', id: '4' },
])
onMounted(async () => {
})


</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
</style>
