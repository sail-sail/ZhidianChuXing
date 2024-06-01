<template>
  <view>
    <u-popup :show="show" @close="close"  mode="center" round="10" >
      <view class="popDialog">
         <view class="pop_title">
           <image src="../../static/shiming.png" mode="" class="img"></image>
           <text>实名认证</text>
         </view>
         <view class="pop_info">您尚未进行实名认证，根据国家相关法律法规要求，需要尽快上传有效身份证，避免影响您的后续使用。</view>
         <button class="pop_btn" type="primary" @click="confirm()">立即认证</button>
         <image src="../../static/close.png" mode="" class="close" @click="close()"></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"realname-pop",
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
  position: relative;
  width: 638rpx;
  padding: 40rpx 32rpx;
  text-align: center;
  box-sizing: border-box;
  .pop_title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    color: #333333;
    .img {
      width: 240rpx;
      height: 212rpx;
    }
  }
  .pop_info {
    color: #4E4E4E;
    margin-top: 28rpx;
    margin-bottom: 56rpx;
  }
  .pop_btn {
    border-radius: 10rpx;
    background-color: $color-title2;
  }
  .close {
    position: absolute;
    bottom: -80rpx;
    left: 50%;
    margin-left: -24rpx;
    width: 48rpx;
    height: 48rpx;
  }
}
</style>