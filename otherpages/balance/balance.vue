<template>
  <view class="container">
    
    <view class="content">
      
      <view class="balance" :style="{backgroundImage: 'url('+backgroundImage+')'}">
        <u--text text="我的余额" size="12" color="rgba(255,255,255,0.8)"></u--text>
        <view class="acea-row row-between row-middle m-t-16">
          <view class="money"> <i>￥</i>{{userInfo.money}}</view>
          <view class="acea-row record" @click="$util.redirectTo('/otherpages/balanceRecord/balanceRecord')">充值记录<u-icon name="arrow-right" size="15" color="rgba(255,255,255,0.6)"></u-icon></view>
        </view>   
      </view>
      
      <view class="box">
          <view class="font-weight font-size-toolbar m-b-20">余额充值</view>
          <view class="recharge acea-row m-t-30">
            <view class="item" :class="item.id==idx?'item_on':''" v-for="(item,index) in list" @click="changeItem(item)">
              <view class="font-36 font-weight-6"><text class="font-size-activity-tag font-weight-5">￥</text>{{item.buy_price}} </view>
              <view class="font-size-activity-tag color-sub">{{item.desc}}</view>
            </view>
          </view>
      </view>
      
      <!-- <view class="rechargeTips">
        <image src="../../static/9.png" mode=""></image>
        首充福利：首充200元送无门槛优惠券
      </view> -->
      
      <view class="rechargeDesc">
        <view class="font-size-tag acea-row row-middle row-center">
          <u-icon :name="checked?'checkmark-circle-fill':'checkmark-circle'" :color="checked?'#FF9531':''" @click="checked = !checked"></u-icon>
          <text class="m-l-10 ">我已阅读并同意</text> <text class="color" @click="goAgree(4)">《用户充值协议》</text>
        </view>
        <view class="font-size-activity-tag color-sub acea-row row-middle row-center">充值遇到问题？点击联系 <button class="color" open-type="contact">在线客服</button></view>
        <button type="primary" @click="addMoney()" class="chong">立即充值</button>
      </view>
    </view>
   
        
  </view>
</template>

<script>
  export default {
    data() {
      return {
        backgroundImage: require('../../static/8.png'),
        list: [{
            recharge_id: 1,
            buy_price: 100,
            recharge_desc: '赠送50元'
          },{
            recharge_id: 2,
            buy_price: 120,
            recharge_desc: '赠送50元'
          },{
            recharge_id: 3,
            buy_price: 120,
            recharge_desc: '赠送50元'
        }],
        idx: 1,
        checked: true,
        is_flag: false,   //按钮锁
        userInfo: {
          money: 0.00
        },
      }
    },
    onLoad() {
      this.userInfo = uni.getStorageSync('userInfo');
      this.getData()
    },
    methods: {
      goAgree(type) {
        this.$util.redirectTo('/pages/agree/agree?type='+type)
      },
      changeItem(item) {
        this.idx = item.id;
      },
      getData() {
        this.$api.sendRequest({
        	url: '/api/index.index/moneyOption',
        	data: {},
        	success: res => {
            let newArr = [];
        		if (res.code == 1) {
        			newArr = res.data;
        		} else {
        			this.$util.showToast({
        				title: res.msg
        			});
        		}
        		//设置列表数据
        		this.list = newArr; //追加新数据
            this.idx = this.list[0].id;
        	}
        });
      },
      //开通会员
      addMoney() {
        if(!this.checked) {
          this.$util.showToast({
            title: '请同意用户充值协议'
          })
          return
        }
        if(this.is_flag) return;
        uni.showLoading({
          title: '正在支付...'
        })
        this.$api.sendRequest({
          url: '/api/index.user/balanceRecharge',
          data: {
            id: this.idx
          },
          success: res => {
            if (res.code == 1 && res.data) {
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
.content {
  margin-top: 24rpx;
  background-color: #fff;
  padding: 24rpx 28rpx;
}
.balance {
  padding: 32rpx 32rpx 40rpx;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .money {
    display: flex;
    align-items: baseline;
    font-weight: bold;
    font-size: 56rpx;
    color: #fff;
    i{
      font-style: normal;
      font-size: $font-size-toolbar;
      color: #fff;
    }
  }
  .record {
    font-size: $font-size-tag;
    color: rgba(255,255,255,0.6);
  }
}
.box {
    margin: 48rpx 0 20rpx;
    .recharge {
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 220rpx;
        height: 156rpx;
        background: #F6F6F6;
        border-radius: 16rpx;
        color: #333;
        margin-right: 12rpx;
        margin-bottom: 20rpx;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      .item_on {
        background: rgba(238,138,53,0.15);
        border: 2rpx solid #EE9137;
      }
      
    }
}
.rechargeTips {
  display: flex;
  align-items: center;
  background: rgba(255,149,49,0.1);
  border-radius: 60rpx;
  font-size: $font-size-tag;
  font-weight: 500;
  color: #FF9531;
  padding: 24rpx;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20rpx;
  image {
    width: 36rpx;
    height: 32rpx;
    margin-right: 24rpx;
  }
}
.rechargeDesc {
  margin-top: 80rpx;
  text-align: center;
  .color {
    color: #FF9531;
    margin: 0;
    padding: 0;
    display: inline-block;
    font-size: 20rpx;
  }
  .chong {
    margin: 48rpx 0 0;
    border-radius: 10rpx;
    background: #FF9531;
  }
}
</style>
