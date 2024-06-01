<template>
  <view >
    <u-popup :show="show" @close="close" @open="open" mode="bottom" round="10">
      <view class="popDialog">
          <view class="pop_title">更换车辆</view>
          <view class="content">
            更换车辆将自动取消当前订单，需要您重新选择车辆下单，请确认是否需要更换
          </view>
          <view class="pop_operation">
            <view class="btn btn_cancel" @click="cancel()">取消</view>
            <view class="btn btn_confirm" @click="confirm()">确定</view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"change-car",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      cancel() {
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