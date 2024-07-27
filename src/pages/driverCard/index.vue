<template>
  <tm-app>
    <view class="container">
      <view class="content">
        <tm-cell :margin="[0, 0]" :padding="[0, 15]" :titleFontSize="30" title="驾驶证" rightIcon=""></tm-cell>

        <view class="images">
          <view @click="upLoad('font')"><tm-image :width="320" :height="250" :src="driverCard.frontSrc"
              :showLoad="false" :border="1"></tm-image></view>
          <view @click="upLoad('back')"> <tm-image :width="320" :height="250" :src="driverCard.backSrc"
              @click="upLoad('back')" :showLoad="false" :border="1"></tm-image> </view>
        </view>

        <tm-divider color="#efefef" :margin="[0, 24]"></tm-divider>

        <tm-form ref="driverCard" :label-width="190" :margin="[0, 0]">
          <tm-form-item label="档案编号" field="num" :rules="[]">
            <tm-input :inputPadding="[0, 0]" v-model.lazy="driverCard.num" :transprent="true" :showBottomBotder="false"
              placeholder="请输入 档案编号">
            </tm-input>
          </tm-form-item>

          <tm-form-item label="准驾车型" field="model" :rules="[]">
            <view class="date" @click="showDriver = true">{{ !driverCard.model ? '请选择 准驾车型' : driverCard.model }}</view>
          </tm-form-item>

          <tm-form-item label="有效期" field="startDate" :rules="[]">
            <view class="date" @click="showDate = true">{{ !driverCard.startDate ? '开始时间' :
              dayjs(driverCard.startDate).format('YYYY-MM-DD') }}/{{
                !driverCard.endDate ?
                  '结束时间' : dayjs(driverCard.endDate).format('YYYY-MM-DD') }}</view>
          </tm-form-item>
        </tm-form>

        <tm-button font-color="#fff" :margin="[25, 20]" :round="10" :width="600" @click="confirm">提交认证</tm-button>
      </view>
    </view>

    <tm-picker :columns="pickerlist" v-model:show="showDriver" @confirm="handleDriverComfirm"></tm-picker>

    <tm-drawer v-model:show="showDate" :height="600" hideHeader>
      <tm-time-between :asyncModel="false" :quickBtn="[]" :start="new Date('2000/01/01')" :end="new Date('2050/12/31')"
        @confirm="handleDateConfirm"></tm-time-between>
    </tm-drawer>
  </tm-app>
</template>

<script setup lang="ts">
import { onMounted, nextTick, reactive } from 'vue';
import dayjs from 'dayjs';
import {
} from './Api'

import {
  upLoadImg
} from '@/util/util'

let driverCard = reactive<any>({
  frontSrc: '',
  backSrc: '',
  num: '',
  model: undefined,
  startDate: undefined,
  endDate: undefined
})
let showDriver = $ref<boolean>(false)
let pickerlist = $ref<any[]>([
  {
    text: 'A1',
    id: 'A1'
  },
  {
    text: 'A2',
    id: 'A2'
  },
  {
    text: 'A3',
    id: 'A3'
  },
  {
    text: 'B1',
    id: 'B1'
  },
  {
    text: 'B2',
    id: 'B2'
  },
  {
    text: 'C1',
    id: 'C1'
  },
  {
    text: 'C2',
    id: 'C2'
  }
])

let showDate = $ref<boolean>(false)

async function upLoad(type: string) {
  const imgs = await upLoadImg()
  if (imgs && Array.isArray(imgs)) {
    if (type === 'font') {
      driverCard.frontSrc = imgs[0]
    } else {
      driverCard.backSrc = imgs[0]
    }
  }
  await nextTick()
}

function handleDriverComfirm(val) {
  driverCard.model = pickerlist[val[0]].text
}


function handleDateConfirm(rang: string[]) {
  driverCard.startDate = rang[0]
  driverCard.endDate = rang[1]
  showDate = false
}

function confirm() {
  uni.showModal({
    title: "确认提交吗?"
  })
}

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
  background-color: rgb(247, 246, 250);
}

.content {
  box-sizing: border-box;
  margin: 25rpx;
  background-color: #fff;
  padding: 25rpx;
}

.images {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date {
  color: rgba(38, 38, 38, 1) !important;
  height: 36px;
  line-height: 36px;
}
</style>
