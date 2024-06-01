<template>
  <view class="container">
    <view class="search" style="display: none;">
      <view class="city">上海市</view>
      <view class="info acea-row row-middle">
        <u-icon name="search" color="rgba(0,0,0,0.3)" size="20"></u-icon>
        <input type="text" placeholder="输入详细地址" placeholder-class="placeholder">
      </view>
    </view>
    <view class="main">
      <view class="acea-row row-between row-middle">
        <view class="font-weight acea-row row-middle">
          <image src="../../static/map2.png" mode="" class="map"></image>当前位置
        </view>
        <view class="color-title2 font-size-tag acea-row row-middle" @click="chooseLocation()">
          <image src="../../static/refresh.png" mode="" class="refresh"></image>选择位置
        </view>
      </view>
      <view class="font-weight color-title2 font-size-toolbar m-t-36">{{location.address}}</view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        location: {
          latitude: '',
          longitude: '',
          city: '上海',
          address: ''
        }
      }
    },
    onLoad() {
      this.location.address = uni.getStorageSync('location').address;
    },
    methods: {
      //打开地图，选择位置
      chooseLocation() {
        uni.chooseLocation({
        	success: res => {
        		this.location.latitude = res.latitude;
        		this.location.longitude = res.longitude;
        		this.location.address = res.address;
            uni.setStorageSync('location',this.location)
        	},
        	fail(res) {
        		uni.getSetting({
        			success: function(res) {
        				var statu = res.authSetting;
        				if (!statu['scope.userLocation']) {
        					uni.showModal({
        						title: '是否授权当前位置',
        						content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
        						success(tip) {
        							if (tip.confirm) {
        								uni.openSetting({
        									success: function(data) {
        										if (data.authSetting['scope.userLocation'] === true) {
        											this.$util.showToast({
        												title: '授权成功'
        											});
        											//授权成功之后，再调用chooseLocation选择地方
        											setTimeout(function() {
        												uni.chooseLocation({
        													success: data => {
        														this.location.latitude = res.latitude;
        														this.location.longitude = res.longitude;
        														this.location.address = res.address;
                                    uni.setStorageSync('location',this.location)
        													}
        												});
        											}, 1000);
        										}
        									}
        								});
        							} else {
        								this.$util.showToast({
        									title: '授权失败'
        								});
        							}
        						}
        					});
        				}
        			}
        		});
        	}
        });
      },
    }
  }
</script>
<style>
  page {
    background-color: #fff;
  }
</style>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  margin: 0 28rpx;
  background: #F3F3F3;
  border-radius: 36rpx;
  height: 72rpx;
  .city {
    position: relative;
    width: 148rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-tag;
    color: rgba(0,0,0,0.8);
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 2rpx;
      height: 40rpx;
      background-color: #E5E5E5;
    }
  }
  .info {
    padding-left: 20rpx;
    input {
      font-size: $font-size-tag;
      margin-left: 10rpx;
    }
    .placeholder {
      font-size: $font-size-tag;
      color: #B3B3B3;
    }
  }
}
.main {
  margin: 28rpx;
  .map {
    width: 28rpx;
    height: 32rpx;
    margin-right: 8rpx;
  }
  .refresh {
    width: 24rpx;
    height: 24rpx;
    margin-right: 8rpx;
  }
}
</style>
