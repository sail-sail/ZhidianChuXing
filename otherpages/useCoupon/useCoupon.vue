<template>
  <view class="container">
    
    <view class="coupon acea-row"  :style="{backgroundImage: 'url('+ backgroundImage + ')'}"  v-for="(item,index) in list">
      <view class="left">
        <view class="money"><i>￥</i>{{item.jian_zhe}}</view>
      </view>
      <view class="right acea-row row-middle row-between">
        <view class="" style="width: 71%;">
          <view class="font-weight-6 name">{{item.coupon_name}}</view>
          <view class="color-sub font-20 m-t-14">有效期{{item.begin_time}}至{{item.expire_time}}</view>
        </view>
        <view class="receive" style="background: #D9D9D9;"  v-if="coupon_id==item.id">已选择</view>
        <view class="receive" @click="goUse(item)" v-else>立即使用</view>
      </view>
    </view>
        
  </view>
</template>

<script>
  export default {
    data() {
      return {
        backgroundImage: require('../../static/11.png'),
        list: [],
        params: '',
        coupon_id: '',
      }
    },
    onLoad(option) {
      this.params = JSON.parse(option.params);
      if(uni.getStorageSync('coupon')) {
        this.coupon_id = uni.getStorageSync('coupon').coupon_id;
      }
      this.getAbleCoupon()
    },
    methods: {
      //使用优惠券
      goUse(item) {
        var coupon = {
          jian_zhe: item.jian_zhe,
          coupon_name: item.coupon_name,
          coupon_id: item.id
        }
        uni.setStorage({
          key: "coupon",
          data: coupon,
          success() {
            uni.navigateBack({
              delta:1
            })
          }
        })
      },
      //获取可用的优惠券
      getAbleCoupon() {
        this.$api.sendRequest({
          url: '/api/coupon/Index/chackCarcoupon',
          data: this.params,
          success: res => {
            if(res.code >=1) {
              this.list = res.data;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20rpx;
}
.coupon {
    height: 176rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 28rpx 24rpx;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 180rpx;
      margin: 16rpx 0;
      .money {
        display: flex;
        align-items: baseline;
        color: #FF9531;
        font-weight: 600;
        font-size: 45rpx;
        i {
          font-style: normal;
          font-size: $font-size-tag;
          color: #FF9531;
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 30rpx;
      padding-right: 30rpx;
    }
    .receive {
      width: 128rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      font-size: $font-size-tag;
      color: #fff;
      background: $color-title2;
      border-radius: 10rpx;
    }
  }
.coupon_disable {
  .money {
    color: #CCCCCC!important;
    i{color: #CCCCCC!important;}
  }
  .name {
    color: #CCCCCC;
  }
  .receive {
    background: #D9D9D9!important;
  }
}
</style>
