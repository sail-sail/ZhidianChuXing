<template>
  <view>
    <u-popup :show="show" @close="close"  mode="bottom" round="10">
      <view class="popDialog">
          <view class="pop_title">续租提醒</view>
          <view class="content" v-if="stock==0">
            当前车辆库存不足，无法续租，您可以联系客服协商或者重新预定其他车辆
          </view>
          <view class="content" v-else>
            当前车辆库存充足，确认续租吗？
          </view>
          <view class="pop_operation">
            <button class="btn btn_cancel" open-type="contact" style="margin: 0;padding: 0;">联系客服</button>
            <view class="btn btn_confirm" @click="confirm()" v-if="stock==0">重新预定</view>
            <view class="btn btn_confirm" @click="confirm()" v-else>确认续租</view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"zu-pop",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      stock: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        
      };
    },
    methods: {
      close() {
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm')
      },
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  padding: 28rpx 28rpx;
  text-align: center;
  .pop_title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
    padding-bottom: 32rpx;
    border-bottom: 2rpx solid #F2F2F2;
  }
  .content {
    margin: 40rpx 0 80rpx;
    color: #656565;
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 328rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_cancel {
      border: 2rpx solid #E7E7E7;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>