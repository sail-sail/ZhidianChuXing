<template>
  <view class="container">
    
    <view class="yeji">
      <image src="../../static/user/pao.png" mode="" class="pao"></image>
      <view>今日预估提成¥</view>
      <view class="money">{{info.today_yugu}}</view>
      <view class="yeji_desc">
        <text>本月业绩 {{info.month_yeji}}</text>
        <text>本月提成 {{info.month_ticheng}}</text>
      </view>
    </view>
    
    <view class="calender">
      日期
      <view class="rilicon" @click="show = true">
        <image src="../../static/user/rili.png" mode="" class="rili"></image>{{value1 | formatDate}}
      </view>
    </view>
    
    <view class="list" v-for="(item,index) in list" :key="index">
      <view class="acea-row row-between font-size-tag list_top">
        <text class="time">已完成 {{item.updatetime}}</text>
        <text class="time">订单号：{{item.order_sn}}</text>
      </view>
      <view class="user acea-row row-between row-middle m-t-20">
        <view class="acea-row row-middle">
          <image :src="$util.img(item.userInfo.avatar)" mode="" class="avatar"></image>
          <view class="">
            <view class="acea-row row-middle">{{item.userInfo.nickname}} 
                <image src="../../static/user/vip.png" class="vip" v-if="item.is_vip == '1'"></image>
            </view>
            <view class="color-sub font-size-tag">{{item.userInfo.mobile | filterMobile}}</view>
          </view>
        </view>
      </view>
      <view class="list_dis acea-row">
        <text class="m-r-24">{{item.motorcycle.motorcycle_name}} </text>
        <view v-for="(n,m) in item.motorcycle.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==item.motorcycle.home1_tags.length-1">｜</text></view>
      </view>
      <view class="acea-row row-between ">
       <text class="time font-size-tag">订单金额：¥{{item.yuyuemoney}}</text>
       <text class="status3 font-weight">预估收益：¥{{item.money}}</text>
      </view>
    </view>
    
    <!-- 引入日期 -->
    <u-datetime-picker  :show="show"  v-model="value1"  mode="date"  @confirm="comfirmDate" @cancel="show = false"></u-datetime-picker>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        value1: Number(new Date()),
        list: [],
        page: 1,
        pageSize: 15,
        total: 1,
        info: {
          month_ticheng: 0,
          month_yeji: 0,
          today_yugu: 0
        }
      }
    },
    filters: {
      formatDate(date) {
        const timeFormat = uni.$u.timeFormat;
        return timeFormat(date, 'mm月dd日');
      },
      filterMobile(mobile) {
        if(mobile) return mobile.substring(0, 3) + '****' + mobile.substring(7);
      	else return "";
      }
    },
    onLoad() {
      this.getInfo()
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getInfo();
    },
    methods: {
      //获取记录信息
      getInfo(refresh) {
        if(refresh) this.page = 1;
        
        let time = uni.$u.timeFormat(this.value1,'yyyy-mm-dd');
        
        this.$api.sendRequest({
          url: '/api/sale/Index/myperformance',
          data: {
            page: this.page,
            limit: this.pageSize,
            time: time
          },
          success: res => {
            if(res.code == 1) {
              this.info.today_yugu = res.data.today_yugu;
              this.info.month_ticheng = res.data.month_ticheng;
              this.info.month_yeji = res.data.month_yeji;
              if(this.page == 1) this.list = res.data.myorderList.data;
              else this.list = this.list.concat(res.data.myorderList.data);
              this.total = res.data.myorderList.last_page;
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      comfirmDate(e) {
        this.value1 = e.value;
        this.show = false;
        this.getInfo(true);
      },
    }
  }
</script>

<style lang="scss" scoped>
.yeji {
  margin: 32rpx;
  height: 342rpx;
  padding: 28rpx;
  background: $color-title2;
  border-radius: 20rpx;
  box-sizing: border-box;
  view {color:#fff;}
  .pao {
    width: 28rpx;
    height: 28rpx;
  }
  .money {
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 40rpx;
  }
  .yeji_desc {
    display: flex;
    text {
      display: inline-block;
      width: 50%;
    }
  }
}
.calender {
  display: flex;
  align-items: center;
  margin: 0 32rpx 40rpx;
  color: #656565;
  .rilicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 326rpx;
    height: 64rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    font-size: $font-size-toolbar;
    font-weight: bold;
    margin-left: 100rpx;
    .rili {
      width: 32rpx;
      height: 32rpx;
      margin-right: 20rpx;
    }
  }
}
.list {
  background: #FFFFFF;
  border-radius: 20rpx;
  margin: 0 32rpx 24rpx;
  padding: 20rpx 20rpx 34rpx;
  .list_top {
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #F7F7F7;
  }
  .status {
    color: #1964FD;
  }
  .status2 {
    color: $color-title2!important;
  }
  .status3 {
    color: #FF4B4B!important;
  }
  .time {
    color: #B4B4B4;
  }
  .avatar {
    width: 80rpx;
    height: 80rpx;
    margin-right: 16rpx;
    border-radius: 50%;
  }
  .vip {
    width: 44rpx;
    height: 28rpx;
    margin-left: 16rpx;
  }
  .list_dis {
    display: flex;
    align-items: center;
    height: 80rpx;
    background: #F7F7F7;
    border-radius: 20rpx;
    padding: 0 20rpx;
    margin: 24rpx 0;
    box-sizing: border-box;
    view {
      font-size: $font-size-tag;
      color: rgba(0,0,0,0.3);
    }
  }
}
</style>
