<template>
  <view>
    <u-popup :show="show" @close="close" mode="bottom" round="10" closeable>
      <view class="popDialog">
          <view class="pop_title">积分抵扣</view>
          <view class="pop_row" @click="changeRadio(0)">
            <view class="font-weight font-size-toolbar">积分 可用（{{score}}）</view>
            <view class="money acea-row row-middle">
               <text class="m-r-24">减 ¥ {{score_money}}</text>
               <u-icon name="checkmark-circle-fill" color="#00BC7E" v-if="radio == 0"></u-icon>
               <u-icon name="checkmark-circle" color="#E6E6E6" v-else></u-icon>
            </view>
          </view>
          <view class="pop_row" @click="changeRadio(1)">
            <view class="font-weight font-size-toolbar">不使用</view>
            <view class="money acea-row row-middle">
               <u-icon name="checkmark-circle-fill" color="#00BC7E" v-if="radio == 1"></u-icon>
               <u-icon name="checkmark-circle" color="#E6E6E6" v-else></u-icon>
            </view>
          </view>
          <view class="pop_operation">
            <view class="btn btn_confirm" @click="confirm()">确定</view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"coin-pop",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      score_money: [Number,String]
    },
    data() {
      return {
        radio: 0,
        coin_rate: 0,
        score: 0,
        score_money: 0,
      };
    },
    created() {
      if(uni.getStorageSync('userInfo')) this.score = uni.getStorageSync('userInfo').score;
      if(this.score_money>0) this.radio = 0;
      else this.radio = 1;
    },
    methods: {
      close() {
        this.$emit('close',{pop: "show"})
      },
      confirm() {
        this.$emit('confirm',{pop: "show"})
      },
      changeRadio(index) {
        this.radio = index;
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
  .pop_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30rpx;
    .money {
      font-size: $font-size-tag;
      color: #FF622D;
    }
  }
  .content {
    margin: 40rpx 0 80rpx;
    color: #656565;
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    margin-top: 40%;
    .btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>