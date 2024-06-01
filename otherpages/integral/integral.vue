<template>
  <view class="container">
    
    <view class="coin" :style="{backgroundImage: 'url('+backgroundImage+')'}">
      <view class="money">{{score}} <i>分</i></view>
      <view class="acea-row record" @click="$util.redirectTo('/otherpages/integralRecord/integralRecord')">积分明细
         <u-icon name="arrow-right" size="14" color="rgba(255,255,255,0.6)"></u-icon>
      </view>
    </view>
    
    <view class="sign">
      <view class="title">已连续签到  <text>{{signDetail.max_sign}}</text>天 </view>
      <!-- 一周签到记录 -->
      <view class="signList m-t-32 acea-row">
        <view class="signItem" v-for="(item,index) in sign" :key="index">
          <view class="signDay" :class="signDetail.is_sign==1&&index==0?'activebg':''">
            <text  class="color-red">+{{signDetail.score_number}}</text>
            <!-- <image src="../../static/13.png" mode="" v-if="item.status==0"></image> -->
            <image src="../../static/14.png" mode="" v-if="signDetail.is_sign==1&&index==0"></image>
            <image src="../../static/15.png" mode="" v-else></image>
          </view>
          <view class="signStatus">{{item.day}}</view>
        </view>
      </view>
      <view class="signbtn" @click="goSign()" v-if="!signDetail.is_sign">签到</view>
      <view class="signbtn" style="background-color: #999;"  v-else>已签到</view>
    </view>
    
    <view class="coinDesc">
      <view class="title"><image src="../../static/16.png"></image>积分用途</view>
      <view class="descItem">
        <view class="">
          <view>订单减免</view>
          <view class="color-sub font-size-tag">{{signDetail.score_money}}积分抵1元</view>
        </view>
        <view class="zu" @click="$util.redirectTo('/pages/category/category')">去租车</view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        backgroundImage: require('../../static/12.png'),
        sign: [],
        signDetail: {
          is_sign: 0,    //是否签到
          max_sign: 0,   //连续签到天数
          score_money: 100, 
          score_number: 0,
        },
        score: 0,
        timeList: []
      }
    },
    onLoad() {
      this.getMemberInfo();
      this.getScore()
      
      var nowdate = new Date();
      this.getTimeList(nowdate)
    },
    methods: {
      //获取签到信息
      getScore() {
        this.$api.sendRequest({
          url: '/api/index.user/signInfo',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.signDetail = Object.assign(res.data);
            }
          }
        })
      },
      //签到
      goSign() {
        this.$api.sendRequest({
          url: '/api/index.user/signIn',
          data: {},
          success: res => {
            if(res.code == 1) {
              this.signDetail.is_sign = 1;
              this.getMemberInfo()
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      //获取用户信息
      getMemberInfo() {
      	this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
          data: {},
          success: res => {
            if(res.code >= 1) {
              this.score = res.data.score;
              uni.setStorageSync('userInfo', res.data);
            }
          }
      	});
      },
      getTimeList(nowdate) {
        //默认取出当前日期后7天的日期
        let valueTime = 7;
        for(var i=0;i<valueTime;i++) {
          if(i>0) var aa = this.getago(nowdate,i);
          else var aa = this.getago(nowdate,i);
          this.sign.push({
            day: aa,
            is_day: i==0?true:false,
            number: 10,
          })
        }
        console.log(this.sign)
      },
      getago(startDate,valueTime){
        // vue 获取几天前的日期并展示在时间选择器上----第一个参数指定一个时间，第二个参数（正数是指定时间的未来几天，负数是指定时间的前几天）
        var date = new Date(startDate);
        var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+ +valueTime);
        var Y = newDate.getFullYear();
        var M = newDate.getMonth()+1;
        M = M<10?'0'+M:M;
        var D = newDate.getDate();
        D = D<10?'0'+D:D;
        return `${M}/${D}`;
      },
      //计算当前时间之后的一周日期
      getdate() {
        var currentTime = new Date();
        var nowDayOfWeek = currentTime.getDay(); //当前周的第几天  6
        console.log('当前周的第几天',nowDayOfWeek)
        var nowDay = currentTime.getDate() + 1; //获取明天  16
        console.log('获取明天',nowDay)
        var nowMonth = currentTime.getMonth(); //当前月
        var nowYear = currentTime.getFullYear(); //当前年
        currentTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1); //完整日期
        console.log('完整日期',currentTime)
        //定义一个数组
        var arr = [];
        for (var i = 0; i < 7; i++) {
          if (i == 0) {
            currentTime = currentTime.setDate(currentTime.getDate());
          } else {
            currentTime = currentTime.setDate(currentTime.getDate() + 1);
          }
          currentTime = new Date(currentTime);
          var currentYear = currentTime.getFullYear();
          var currentDays = currentTime.getDate();
          var currentMon = currentTime.getMonth() + 1;
          var dateDay = currentDays; //某一天
          var dates = {};
          dates.LaterDay = currentYear + "-" + currentMon + "-" + dateDay;
          //将一星期后的日期通过for循环存到数组当中去
          arr.push(dates);
        }
        console.log("打印数组里的日期", arr);
      },

    }
  }
</script>

<style lang="scss" scoped>
.coin {
  padding: 80rpx 32rpx 40rpx;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 378rpx;
  box-sizing: border-box;
  .money {
    display: flex;
    align-items: baseline;
    font-weight: bold;
    font-size: 80rpx;
    color: #fff;
    i{
      font-style: normal;
      font-weight: normal;
      margin-left: 10rpx;
      font-size: $font-size-base;
      color: #fff;
    }
  }
  .record {
    font-size: $font-size-tag;
    color: rgba(255,255,255,0.6);
  }
}
.sign {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 24rpx 24rpx 32rpx;
  margin: -100rpx 28rpx 24rpx;
  .title {
    font-weight: bold;
    text{color: #EE8A35;}
  }
  
  .signItem {
    width: 80rpx;
    margin-right: 15rpx;
    &:last-child {
      margin-right: 0;
    }
    .color-red {
      color: #FF5300;
    }
    .active {
      border: 2rpx solid #ED8934;
    }
    .activebg {
      background: rgba(243,187,67,0.16)!important;
    }
    .signDay {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80rpx;
      height: 128rpx;
      background: #F5F5F5;
      border-radius: 40rpx;
      font-size: $font-size-tag;
      color: rgba(0,0,0,0.3);
      image {
        width: 44rpx;
        height: 46rpx;
        margin-top: 10rpx;
      }
    }
    .signStatus {
      text-align: center;
      font-size: $font-size-tag;
      color: rgba(0,0,0,0.3);
      margin-top: 10rpx;
    }
  }
  .signbtn {
    width: 344rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #FF9531;
    border-radius: 40rpx;
    font-size: $font-size-toolbar;
    color: #fff;
    margin: 40rpx auto 0;
  }
}
.coinDesc {
  margin: 24rpx 28rpx;
  padding: 24rpx 24rpx 40rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
  .title {
    display: flex;
    align-items: center;
    font-size: $font-size-toolbar;
    margin-bottom: 40rpx;
    image {
      width: 28rpx;
      height: 28rpx;
      margin-right: 10rpx;
    }
  }
  .descItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .zu {
      width: 116rpx;
      height: 48rpx;
      line-height: 48rpx;
      text-align: center;
      background: #FF9531;
      border-radius: 24rpx;
      font-size: $font-size-tag;
      color: #fff;
    }
  }
}
</style>
