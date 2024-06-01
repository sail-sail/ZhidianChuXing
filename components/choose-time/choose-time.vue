<template>
  <view>
    <u-popup :show="show"  mode="top" round="20" :closeOnClickOverlay="false">
      <view class="popDialog">
         <view class="box-option acea-row">
           <view class="optionItem">
             <view class="color-sub font-size-tag m-b-10">取车城市</view>
             <view class="font-size-toolbar font-weight">{{city}}</view>
           </view>
           <view class="optionItem" @click="goTo('/otherpages/chooseAddress/chooseAddress')">
             <view class="acea-row row-middle color-sub font-size-tag m-b-10">取车地点 <u-icon name="arrow-down-fill"
                 color="#D8D8D8" size="12"></u-icon>
             </view>
             <view class="font-size-toolbar font-weight">{{address}}</view>
           </view>
         </view>
         <view class="timeCon" @click="$util.redirectTo('/otherpages/chooseDate/chooseDate')">
           <view class="timeItem" style="text-align: left;">
             <view class="font-weight">{{pickupdate.startDate1}}</view>
             <view class="font-size-tag color-sub">{{pickupdate.startDate | getDateWeek}} {{pickupdate.startTime}}</view>
           </view>
           <view class="days">{{pickupdate.dayNum}}天</view>
           <view class="timeItem" style="text-align: right;">
             <view class="font-weight">{{pickupdate.endDate1}}</view>
             <view class="font-size-tag color-sub">{{pickupdate.endDate | getDateWeek}} {{pickupdate.endTime}}</view>
           </view>
         </view>
         <view class="pop_operation">
           <view class="btn btn_cancel" @click="cancel()">关闭</view>
           <view class="btn btn_confirm" @click="confirm()">确定</view>
         </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"choose-time",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      pickupdate: [Object]
    },
    filters: {
      getDateWeek(week) {
        const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const myDate = new Date(Date.parse(week))
        return weekDay[myDate.getDay()]
      }
    },
    data() {
      return {
        city: '',
        address: ''
      };
    },
    created() {
      this.city = uni.getStorageSync('location').city;
      this.address = uni.getStorageSync('location').address;
    },
    methods: {
      cancel() {
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm')
      },
      goTo(url) {
        this.$util.redirectTo(url);
      },
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  padding: 32rpx 0;
  .box-option {
    margin: 0 28rpx;
    padding-bottom: 32rpx;
    border-bottom: 1px solid #F5F5F5;
  
    .optionItem {
      &:first-child {
        width: 30%;
      }
  
      &:last-child {
        width: 70%;
      }
    }
  }
  .timeCon {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 38rpx 28rpx 0;
    .timeItem {
      width: 40%;
      text-align: center;
    }
    .days {
      font-size: $font-size-tag;
      padding: 0 24rpx;
      height: 40rpx;
      border-radius: 22rpx;
      border: 1rpx solid rgba(0,0,0,0.1);
    }
    .timeTip {
      position: absolute;
      bottom: -88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 466rpx;
      height: 64rpx;
      background-color: $color-title2;
      border-radius: 10rpx;
      color: #fff;
      font-size: 30rpx;
      z-index: 9;
      &:before {
        position: absolute;
        top: -20rpx;
        content: '';
        display: inline-block;
        height:0;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid $color-title2;
      }
    }
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    margin: 60rpx 28rpx 0;
    .btn {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_cancel {
      width: 200rpx;
      border: 2rpx solid $color-title2;
      margin-right: 24rpx;
      color: $color-title2;
    }
    .btn_confirm {
      width: 468rpx;
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>