<template>
  <tm-app>
    <view class="container">
      <view class="content">
        <tm-cell :margin="[0, 0]" :padding="[0, 15]" :titleFontSize="30" title="身份证" rightIcon=""></tm-cell>

        <view class="images">
          <view @click="upLoad('font')"><tm-image :width="320" :height="250" :src="idCard.frontSrc" :showLoad="false"
              :border="1"></tm-image></view>
          <view @click="upLoad('back')"> <tm-image :width="320" :height="250" :src="idCard.backSrc"
              @click="upLoad('back')" :showLoad="false" :border="1"></tm-image> </view>
        </view>

        <tm-divider color="#efefef" :margin="[0, 24]"></tm-divider>

        <tm-form ref="idCard" :label-width="190" :margin="[0, 0]">
          <tm-form-item label="姓名" field="name" :rules="[]">
            <tm-input :inputPadding="[0, 0]" v-model.lazy="idCard.name" :transprent="true" :showBottomBotder="false"
              placeholder="请输入 姓名">
            </tm-input>
          </tm-form-item>
          <tm-form-item label="身份证号码" field="idCardNum" :rules="[]">
            <tm-input :inputPadding="[0, 0]" v-model.lazy="idCard.idCardNum" :transprent="true"
              :showBottomBotder="false" placeholder="请输入 身份证号码">
            </tm-input>
          </tm-form-item>
          <tm-form-item label="性别" field="radio" :rules="[]">
            <tm-radio-group v-model="idCard.radio">
              <tm-radio label="男" value="male"></tm-radio>
              <tm-radio label="女" value="female"></tm-radio>
            </tm-radio-group>
          </tm-form-item>
          <tm-form-item label="发证机关" field="licence" :rules="[]">
            <tm-input :inputPadding="[0, 0]" v-model.lazy="idCard.licence" :transprent="true" :showBottomBotder="false"
              placeholder="请输入 发证机关">
            </tm-input>
          </tm-form-item>

          <tm-form-item label="发证机关" field="licence" :rules="[]">
            <tm-input :inputPadding="[0, 0]" v-model.lazy="idCard.licence" :transprent="true" :showBottomBotder="false"
              placeholder="请输入 发证机关">
            </tm-input>
          </tm-form-item>

          <tm-form-item label="有效期" field="startDate" :rules="[]">
            <view class="date" @click="showDate = true">{{ !idCard.startDate ? '开始时间' :
              dayjs(idCard.startDate).format('YYYY-MM-DD') }}/{{
                !idCard.endDate ?
                  '结束时间' : dayjs(idCard.endDate).format('YYYY-MM-DD') }}</view>
          </tm-form-item>
        </tm-form>

        <tm-button font-color="#fff" :margin="[25, 20]" :round="10" :width="600" @click="confirm">提交认证</tm-button>
      </view>
    </view>

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

// import {
//   upLoadImg
// } from '@/util/util'

let idCard = reactive<any>({
  frontSrc: '',
  backSrc: '',
  name: '',
  idCardNum: '',
  sex: '',
  licence: '',
  startDate: undefined,
  endDate: undefined
})
let showDate = $ref<boolean>(false)

async function upLoad(type: string) {
  const imgs = await upLoadImg()
  if (imgs && Array.isArray(imgs)) {
    if (type === 'font') {
      idCard.frontSrc = imgs[0]
    } else {
      idCard.backSrc = imgs[0]
    }
  }
  await nextTick()
}
function handleDateConfirm(rang: string[]) {
  idCard.startDate = rang[0]
  idCard.endDate = rang[1]
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
