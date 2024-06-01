<template>
  <view>
    <u-popup :show="show" @close="close" @open="open" mode="center" round="10">
      <view class="popDialog">
          <view class="pop_title">确定取消订单吗</view>
          <view class="content">
           <!-- 本订单已超出免责取消时间将<br>
            <text class="color">收取50%违约金</text> -->
          </view>
          <view class="pop_operation">
            <view class="btn btn_cancel" @click="confirm()">狠心取消</view>
            <view class="btn btn_confirm" @click="cancel()">容我想想</view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"cancel-pop",
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

<style lang="scss">
.popDialog {
  padding: 56rpx 40rpx 50rpx;
  text-align: center;
  .pop_title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
  }
  .content {
    margin: 40rpx 66rpx;
    color: #656565;
    .color {
      color: #FF622D;
    }
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 264rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_cancel {
      border: 2rpx solid #E7E7E7;
      margin-right: 30rpx;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>