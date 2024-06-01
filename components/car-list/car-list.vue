<template>
  <view class="list" @click="goDetail()">
    <view class="acea-row row-between font-size-tag list_top">
      <text class="status">{{item.status}}｜{{item.is_mianya=='是'?'':'已付押金'}}｜ {{item.userInfo.is_auth==0?'未实名':'已实名'}}</text>
      <!-- <text class="status status2">待还车</text> -->
      <!-- <text class="status status3">已过期</text> -->
      <text class="time" v-if="item.carInfo">车牌号：{{item.carInfo.car_code}}</text>
    </view>
    <view class="user acea-row row-between row-middle m-t-20">
      <view class="acea-row row-middle">
        <image :src="$util.img(item.userInfo.avatar)" mode="" class="avatar"></image>
        <view class="">
          <view class="acea-row row-middle">{{item.userInfo.nickname}} <image src="../../static/user/vip.png" class="vip" v-if="item.userInfo.is_vip == '1'"></image></view>
          <view class="color-sub font-size-tag">{{item.userInfo.mobile | filterMobile}}</view>
        </view>
      </view>
      <image src="../../static/user/mobile.png" mode="" class="mobile" @click.stop="callPhone()"></image>
    </view>
    <view class="list_dis acea-row">
      <text class="m-r-24">{{item.carMotorcycleInfo.motorcycle_name}} </text>
      <view v-for="(n,m) in item.carMotorcycleInfo.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==item.carMotorcycleInfo.home1_tags.length-1">｜</text></view>
    </view>
    <view class="orderTime">
      <text>{{item.start_time}}</text>
      <text style="text-align: center;"> —— {{item.day}}天 —— </text>
      <text style="text-align: right;">{{item.end_time}}</text>
    </view>
    <view class="journey">
      <view class="acea-row row-middle">
        <text class="label">取车</text>
        <view class="font-size-tag">
          {{item.songhuan_type=="自助取还"?"自助取车":"商家上门取车"}} 
          <text class="color-sub m-l-24" v-if="item.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
          <text class="color-sub m-l-24" v-else>{{item.address?item.address:''}}</text>
        </view>
      </view>
      <image src="../../static/map.png" mode="" class="mapImg" @click.stop="goDestination(item)"></image>
    </view>
    <view class="journey">
      <view class="acea-row row-middle">
        <text class="label label2">还车</text>
        <view class="font-size-tag">
          {{item.songhuan_type=="自助取还"?"自助取车":"商家上门取车"}}  
          <text class="color-sub m-l-24" v-if="item.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
          <text class="color-sub m-l-24" v-else>{{item.address?item.address:''}}</text>
        </view>
      </view>
      <image src="../../static/map.png" mode="" class="mapImg" @click.stop="goDestination(item)"></image>
    </view>
    <view class="m-b-10">
      销售：{{item.saleInfo?item.saleInfo.nickname:'暂未绑定'}}
    </view>
    <view class="tips">
      备注：{{item.remark?item.remark:''}}
    </view>
  </view>
</template>

<script>
  export default {
    name:"car-list",
    props: {
      item: [Object,Array]
    },
    filters: {
    	filterMobile(mobile) {
    		return mobile.substring(0, 4 - 1) + '****' + mobile.substring(6 + 1);
    	}
    },
    data() {
      return {
        storeInfo: '',  //门店信息
      };
    },
    created() {
      if(uni.getStorageSync('storeInfo')) this.storeInfo = uni.getStorageSync('storeInfo');
    },
    methods: {
      callPhone() {
        uni.makePhoneCall({
          phoneNumber: this.item.userInfo.mobile
        })
      },
      //进入详情
      goDetail() {
        this.$util.redirectTo('/employee/orderDetail/orderDetail?id='+this.item.id)
      },
      //导航取车地点
      goDestination(item) {
        let latitude = '',longitude = '',address = '';
        if(item.songhuan_type == '自助取还') {
          latitude = this.storeInfo.latitude;
          longitude = this.storeInfo.longitude;
          address = this.storeInfo.address;
        }else {
          latitude = item.lat;
          longitude = item.long;
          address = item.address;
        }
        uni.openLocation({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          address: address,
          success() {
            console.log('导航成功')
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.list {
  background: #FFFFFF;
  border-radius: 20rpx;
  margin: 0 32rpx 24rpx;
  padding: 20rpx 20rpx 34rpx;
  .list_top {
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #F7F7F7;
    .status {
      color: #1964FD;
    }
    .status2 {
      color: $color-title2!important;
    }
    .status3 {
      color: #FF4B4B!important;
    }
  }
  .time {
    color: #B4B4B4;
  }
  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 16rpx;
  }
  .vip {
    width: 44rpx;
    height: 28rpx;
    margin-left: 16rpx;
  }
  .mobile {
    width: 48rpx;
    height: 48rpx;
    margin-left: auto;
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
  .orderTime {
    display: flex;
    font-size: $font-size-tag;
    color: rgba(0,0,0,0.4);
    margin: 16rpx 0 24rpx;
    text {flex: 1;}
  }
  .journey {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
    .label {
      width: 56rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      background: rgba(42,110,241,0.2);
      border-radius: 4rpx;
      font-size: $font-size-activity-tag;
      color: #2A6EF1;
      margin-right: 24rpx;
    }
    .label2 {
      background: rgba(42,241,127,0.2);
      color: $color-title2;
    }
    .mapImg {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .tips {
    display: flex;
    align-items: center;
    color: #323232;
    font-size: $font-size-tag;
    padding: 16rpx;
    border-radius: 16rpx;
    border: 2rpx solid #F2F2F2;
  }
}
</style>