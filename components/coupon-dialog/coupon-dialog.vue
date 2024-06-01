<template>
  <view class="popDialog">
    <u-popup :show="show" mode="center" @close="close">
      <view class="pop-dialog">
        <image src="../../static/coupon_bg.png" mode="" class="bg"></image>
        <view class="dialogTop">
          <view class="top-title">
            <text class="line m-r-16"></text>
            <text>新人专享福利</text>
            <text class="line m-l-16"></text>
          </view>
          <view class="money">{{total}}元新人礼</view>
        </view>
        <scroll-view scroll-y="true" class="dialog-main">
          <block v-for="(item,index) in coupon" :key="index" v-if="index<1">
          <view class="item" v-if="index==0">
            <image src="../../static/coupon.png" mode="" class="item_bg"></image>
            <view class="price font-weight" style="z-index: 3;"> <text class="font-size-toolbar">￥</text>{{item.jian_zhe}}</view>
            <text style="z-index: 3;">{{item.type_text}}</text>
          </view>
          </block>
          <view class="item-2">
            <view class="item2" v-for="(item,index) in coupon" :key="index" v-if="index>0">
              <image src="../../static/coupon_2.png" mode="" class="item2_bg"></image>
              <view class="price font-weight" style="z-index: 3;position: relative;"> 
                 <text class="font-size-toolbar">￥</text>{{item.jian_zhe}}
              </view>
              <view style="z-index: 3;position: relative;">{{item.type_text}}</view>
            </view>
          </view>
        </scroll-view>
        <view class="receive" @click="goReceive()">立即领取</view>
        <image src="../../static/close.png" mode="" class="close" @click="close()"></image>
      </view>
      
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"coupon-dialog",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      coupon: [Object,Array],
      total: [String,Number]
    },
    data() {
      return {
        
      };
    },
    methods: {
      close() {
        this.$emit('close')
      },
      goReceive() {
        this.$emit('receive')
      },
    }
  }
</script>


<style lang="scss" scoped>

.pop-dialog {
  position: relative;
  width: 638rpx;
  height: 738rpx;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 638rpx;
    height: 738rpx;
  }
  .dialogTop {
    position: relative;
    margin: 32rpx 0;
    .top-title {
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0,0,0,0.8);
      .line {
        width: 60rpx;
        height: 2rpx;
        background: rgba(0,0,0,0.8);
      }
    }
    .money {
      font-weight: 600;
      color: #D10D00;
      line-height: 100rpx;
      font-size: 72rpx;
      text-align: center;
      margin-top: 24rpx;
    }
  }
  .dialog-main {
    margin: 80rpx 28rpx 24rpx;
    width: 91%;
    height: 306rpx;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      width: 582rpx;
      height: 144rpx;
      padding-left: 52rpx;
      box-sizing: border-box;
      .price {
        color: #F0483D;
        font-size: 56rpx;
        width: 40%;
      }
      .item_bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 582rpx;
        height: 144rpx;
      }
    }
    .item-2 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 18rpx;
      width: 100%;
      .item2 {
        position: relative;
        padding-left: 40rpx;
        width: 284rpx;
        height: 144rpx;
        box-sizing: border-box;
        margin-bottom: 18rpx;
        .price {
          color: #F0483D;
          font-size: 56rpx;
          width: 30%;
        }
        .item2_bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 284rpx;
          height: 144rpx;
        }
      }
    }
  }
  .receive {
    position: relative;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: linear-gradient(180deg, #FFF3DF 0%, #FEE2BC 100%);
    border-radius: 40rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #56370D;
    margin: 0 28rpx;
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