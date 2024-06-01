<template>
  <view>
    <u-popup :show="show" @close="close" mode="bottom" round="10" closeable>
      <view class="popDialog">
          <view class="pop_title">费用明细</view>
          <view class="pop_row">
            <view class="font-weight">车辆租金</view>
            <view class="acea-row row-between m-t-24">
               <text class="color-sub">租车费</text>
               <text class="font-weight">¥{{settle.yuyuemoney}}</text>
            </view>
          </view>
          <view class="pop_row">
            <view class="font-weight">保障费用</view>
            <view class="acea-row row-between m-t-24">
               <text class="color-sub">租车押金</text>
               <text class="font-weight">¥{{settle.zuche_deposit}}</text>
            </view>
            <view class="acea-row row-between m-t-24">
               <text class="color-sub">违章押金</text>
               <text class="font-weight">¥{{settle.weizhang_deposit}}</text>
            </view>
            <view class="acea-row row-between m-t-24" v-if="settle.insure">
               <text class="color-sub">保障费用</text>
               <text class="font-weight">¥{{settle.insure}}</text>
            </view>
            <view class="acea-row row-between m-t-24" v-if="settle.insure">
               <text class="color-sub">服务费用</text>
               <text class="font-weight">¥{{settle.sever_money}}</text>
            </view>
            <view class="acea-row row-between m-t-24"  style="color: #FF622D;">
               <text class="">优惠券抵扣</text>
               <text class="font-weight">-¥{{settle.coupon_money}}</text>
            </view>
          </view>
          <view class="pop_operation">
            <view class="money">总价： <i>￥{{settle.saleamount}}</i></view>
            <view class="acea-row row-middle">
              <view class="confirm" @click="confirm">提交订单</view>
            </view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"expense-detail",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      settle: [Object]
    },
    data() {
      return {
        
      };
    },
    methods: {
      close() {
        this.$emit('close',{pop: "showExpense"})
      },
      confirm() {
        this.$emit('confirm',{pop: "showExpense"})
      },
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  padding: 28rpx 28rpx;
  .pop_title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
    padding-bottom: 32rpx;
    border-bottom: 2rpx solid #F2F2F2;
    text-align: center;
  }
  .pop_row {
    margin-top: 30rpx;
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #F2F2F2;
    &:last-child {
      border-bottom: none;
    }
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
    margin-top: 20rpx;
    .money {
      display: flex;
      align-items: center;
      font-size: $font-size-tag;
      i {
        color: #FF622D;
        font-style: normal;
      }
    }
    .confirm {
      width: 220rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background: #00BC7E;
      border-radius: 40rpx;
      font-size: $font-size-toolbar;
      color: #FFFFFF;
    }
  }
}
</style>