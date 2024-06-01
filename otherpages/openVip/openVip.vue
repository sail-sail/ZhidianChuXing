<template>
  <view class="container">
    <view class="topbg"></view>
    <view class="vipuser">
      <image src="../../static/4.png" mode="" class="bg"></image>
       <view class="userHead">
         <image :src="userInfo.avatar" mode="" class="avatar"></image>
         <view>
           <view class="font-size-toolbar font-weight name1">{{userInfo.nickname}}</view>
           <view class="name2">成为会员，尊享优惠好礼</view>
         </view>
       </view>
       <view class="usertip acea-row row-middle"> <image src="../../static/5.png"></image>会员可领大额优惠券</view>
    </view>
    
    <view class="priceList">
      <view class="priceItem" :class="item.id==cardId?'price-on':''" v-for="(item,index) in card" @click="changeItem(item)">
        <view class="font-weight">{{item.name}}</view>
        <view class="money"><i>¥</i>{{item.price}}</view>
        <view class="line_money">¥{{item.original_price}}</view>
      </view>
    </view>
    
    <view class="coupon">
      <u--text text="开通会员可得" :bold="true" color="#000000" size="18" align="center"></u--text>
      <u--text text="一张回本，多用多省，不用可退"  color="rgba(0,0,0,0.3)" size="12" align="center" margin="8rpx 0 0 0"></u--text>
      <view class="couponList">
        <view class="couponItem" v-for="(item,index) in coupon" :key="index">
          <view class="couponValue">
            <view class="money">{{item.jian_zhe}} <i>元</i></view>
            <view style="color: rgba(107,71,47,0.4);" class="font-size-tag">{{item.result}}</view>
          </view>
          <view class="couponName">{{item.type_text}} <text v-if="item.every_song">x{{item.every_song}}</text></view>
        </view>
      </view>
    </view>
    
    <view class="footer">
      <view class="btn" @click="buyVip()">
        <i>￥</i>{{price}} <text>限时开通会员</text>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        card: [{
          name: '月卡',
          price: '19'
        },{
          name: '季卡',
          price: '99'
        },{
          name: '年卡',
          price: '199'
        }],
        coupon: [],
        cardId: 0,
        price: 0,
        is_flag: false,   //按钮锁
        userInfo: ''
      }
    },
    onLoad() {
      if(uni.getStorageSync('userInfo')) this.userInfo = uni.getStorageSync('userInfo');
      this.getData()
    },
    methods: {
      changeItem(item) {
        this.cardId = item.id;
        this.price = item.price;
        this.coupon = item.coupons;
      },
      getData() {
        this.$api.sendRequest({
        	url: '/api/index.user/vipPrice',
        	data: {},
        	success: res => {
            let newArr = [];
        		if (res.code >= 1) {
        			newArr = res.data;
        		} else {
        			this.$util.showToast({
        				title: res.msg
        			});
        		}
        		//设置列表数据
        		this.card = newArr; //追加新数据
            this.cardId = this.card[0].id;
            this.price = this.card[0].price;
            this.coupon = this.card[0].coupons;
        	}
        });
      },
      //开通会员
      buyVip() {
        if(this.is_flag) return;
        uni.showLoading({
          title: '正在支付...'
        })
        this.$api.sendRequest({
          url: '/api/index.user/vipPay',
          data: {
            id: this.cardId
          },
          success: res => {
            if (res.code >= 1 && res.data) {
                this.is_flag = true;
            		this.pay(res.data);
            	} else {
                uni.hideLoading();
                this.is_flag = false;
            		this.$util.showToast({
            			title: '未获取到支付信息！'
            		});
            		setTimeout(() => {
            			this.$util.redirectTo('/pages/index/index', {}, 'reLaunch');
            		}, 1000);
            	}
            }
        })
      },
      pay(payData) {
        uni.hideLoading();
        uni.requestPayment({
          provider: 'wxpay',
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success: res => {
            uni.navigateBack({
              delta: 1
            })
          },
          fail: res => {
            if (res.errMsg == 'requestPayment:fail cancel') {
              this.$util.showToast({ title: '您已取消支付' });
            } else {
              uni.showModal({ content: '支付失败,失败原因: ' + res.errMsg, showCancel: false });
            }
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              })
            }, 1000);
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.topbg {
  width: 100%;
  height: 200rpx;
  background-color: #2A2B2F;
}
.vipuser {
  position: relative;
  height: 250rpx;
  background: linear-gradient(180deg, #F6EACC 0%, #E3C485 100%);
  box-shadow: 0px 16rpx 24rpx 0px rgba(176,150,100,0.24);
  border-radius: 20rpx;
  margin: -170rpx 28rpx 0;
  padding: 40rpx 0 0 40rpx;
  box-sizing: border-box;
  .bg {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 202rpx;
    height: 222rpx;
  }
  .userHead {
    display: flex;
    align-items: center;
    .avatar {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      margin-right: 16rpx;
    }
    .name1 {
      color: #351D00;
    }
    .name2 {
      font-size: $font-size-tag;
      color: rgba(53,29,0,0.4);
    }
  }
  .usertip {
    color: rgba(53,29,0,0.7);
    margin-top: 40rpx;
    font-size: $font-size-tag;
    image {
      width: 28rpx;
      height: 24rpx;
      margin-right: 20rpx;
    }
  }
}
.priceList {
  display: flex;
  flex-wrap: wrap;
  padding: 40rpx 28rpx;
  background-color: #fff;
  .priceItem {
    width: 216rpx;
    height: 230rpx;
    padding: 32rpx;
    border-radius: 16rpx;
    border: 2rpx solid rgba(230,193,119,0.2);
    text-align: center;
    box-sizing: border-box;
    margin-right: 22rpx;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .money {
      display: flex;
      justify-content: center;
      align-items: baseline;
      color: #000000;
      font-size: 44rpx;
      i {
        font-style: normal;
        font-size: $font-size-tag;
      }
    }
    .line_money {
      font-size: $font-size-tag;
      color: rgba(0,0,0,0.3);
      text-decoration: line-through;
    }
  }
  .price-on {
    background: rgba(244,222,177,0.25);
    border: 2rpx solid #E6C177;
    .money {
      color: #F0483D;
      i {
        color: #F0483D;
      }
    }
  }
}
.coupon {
  background-color: #fff;
  margin-top: 24rpx;
  padding: 32rpx 28rpx;
  margin-bottom: 200rpx;
  .couponList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 46rpx;
    .couponItem {
      width: 336rpx;
      height: 214rpx;
      margin-right: 22rpx;
      margin-bottom: 22rpx;
      background-image: url('../../static/7.png');
      background-size: cover;
      text-align: center;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .money {
        display: flex;
        justify-content: center;
        align-items: baseline;
        font-size: 56rpx;
        font-weight: 600;
        color: #6B472F;
        line-height: 1.4;
        i {
          font-style: normal;
          font-size: 28rpx;
          color: #6B472F;
        }
      }
      .couponName {
        font-weight: 500;
        color: #FEE2BC;
        margin-top: 32rpx;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 92%;
  padding: 32rpx 28rpx;
  background-color: #fff;
  box-sizing: border-box;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #FEE2BC;
    width: 692rpx;
    height: 80rpx;
    background: #2A2B2F;
    border-radius: 10rpx;
    font-size: $font-size-toolbar;
    i {
      font-style: normal;
      color: #FEE2BC;
      font-size: $font-size-tag;
    }
    text {margin-left: 10rpx;}
  }
 
}
</style>
