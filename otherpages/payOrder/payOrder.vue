<template>
  <view class="container">
    
    <view class="title">
      <view class="time">付款金额</view>
      <view class="money"><text style="font-size: 28rpx;">¥</text>{{money}}</view>
    </view>
    
    <view class="main">
      <view class="row acea-row row-middle" @click="changeRadio(1)">
        <image src="../../static/pay1.png" mode="" class="imgs"></image>
        微信支付
        <image :src="payIndex==1?'../../static/radio_on3.png':'../../static/radio.png'" mode="" class="radioImg"></image>
      </view>
      <view class="row acea-row row-middle" @click="changeRadio(2)">
        <image src="../../static/pay2.png" mode="" class="imgs"></image>
        {{balance_tips}}（{{balance}}元）
        <image :src="payIndex==2?'../../static/radio_on3.png':'../../static/radio.png'" mode="" class="radioImg"></image>
      </view>
    </view>
    
    <button type="primary"  class="btn" @click="payOrder()">立即支付</button>
    <view class="acea-row row-center-wrapper font-size-toolbar color-sub m-t-32" @click="$util.redirectTo('/pages/index/index')">暂不支付</view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        payIndex: 1,
        money: 0,
        order_sn: '',
        balance: 0.00,
        balance_tips: '',
        pay_flag: false,  //支付锁
        is_xuzu: 0, //1表示续租支付
      }
    },
    onLoad(option) {
      this.money = option.money?option.money:0;
      this.order_sn = option.order_sn;
      this.is_xuzu = option.is_xuzu || 0;
      //获取用户余额
      this.balance = uni.getStorageSync('userInfo').money;
      if(parseFloat(this.balance) < parseFloat(this.money)) this.balance_tips = "余额不足";
      else this.balance_tips = "余额";
    },
    methods: {
      changeRadio(index) {
        this.payIndex = index;
      },
      //立即支付
      payOrder() {
        var that = this;
        if(this.pay_flag) return;
        //判断余额支付方式
        if(this.payIndex==2) {
          if(parseFloat(this.balance) < parseFloat(this.money)) {
            this.$util.showToast({title: '余额不足'});
            return
          }
        }
        //支付中判断
        uni.showLoading({
        	title: '支付中...',
        	mask: true
        });
        this.pay_flag = true;
        
        let url = '';
        if(this.is_xuzu == 1) url = '/api/car/Order/xuzupay';
        else url = '/api/car/Order/pay';
        
        this.$api.sendRequest({
          url: url,
          data: {
            order_sn: this.order_sn,
            paytype: this.payIndex == 1?'wechat':'yue'
          },
          success: res => {
            uni.hideLoading();
            if(res.code == 1) {
              this.pay_flag = true;
              uni.removeStorageSync('coupon');
              if(this.payIndex==2) {  //余额
               this.$util.showToast({title: '支付成功'});
               //清除缓存里面的取车日期
               uni.removeStorageSync('pickupdate');
                setTimeout(function() {
                  if(that.is_xuzu == 1) {
                    uni.reLaunch({
                      url: '/pages/order/order?tabsIndex='+4
                    })
                  }else {
                    uni.reLaunch({
                      url: '/pages/order/order?tabsIndex='+3
                    })
                  }
                },1000)
              }else { //微信
                this.pay(res.data);
              }
            }else {
              this.pay_flag = false;
              this.$util.showToast({ title: res.msg });
            }
          }
        })
      },
      //支付
      pay(payData) {
        var that = this;
        
        uni.requestPayment({
        	provider: 'wxpay',
        	timeStamp: payData.timeStamp,
        	nonceStr: payData.nonceStr,
        	package: payData.package,
        	signType: payData.signType,
        	paySign: payData.paySign,
        	success: res => {
            //清除缓存里面的取车日期
            uni.removeStorageSync('pickupdate');
            if(that.is_xuzu == 1) {
              uni.reLaunch({
                url: '/pages/order/order?tabsIndex='+4
              })
            }else {
              uni.reLaunch({
                url: '/pages/order/order?tabsIndex='+3
              })
            }
        	},
        	fail: res => {
        		that.pay_flag = false;
        		if (res.errMsg == 'requestPayment:fail cancel') {
        			that.$util.showToast({ title: '您已取消支付' });
        		} else {
        			uni.showModal({ content: '支付失败,失败原因: ' + res.errMsg, showCancel: false });
        		}
        		setTimeout(() => {
        			that.$util.redirectTo('/pages/order/order');
        		}, 1000);
        	}
        });
      },
    }
  }
</script>

<style lang="scss">
.title {
  padding: 100rpx 0 50rpx;
  text-align: center;
  .time {
    color: rgba(0,0,0,0.3);
    font-size: $font-size-tag;
  }
  .money {
    font-size: 48rpx;
    font-weight: bold;
  }
}
.main {
  background-color: #fff;
  margin: 24rpx 28rpx;
  border-radius: 20rpx;
  .row {
    height: 100rpx;
    padding: 0 32rpx;
    border-bottom: 1rpx solid #F6F6F6;
    &:last-child {
      border-bottom: none;
    }
    .imgs {
      width: 48rpx;
      height: 48rpx;
      margin-right: 12rpx;
    }
    .radioImg {
      width: 40rpx;
      height: 40rpx;
      margin-left: auto;
    }
  }
}
.btn {
  margin-top: 40rpx;
  border-radius: 10rpx;
}
</style>
