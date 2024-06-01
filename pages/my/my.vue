<template>
  <view class="container">
    
  <view class="userbox acea-row row-middle" v-if="token">
      <image :src="$util.img(memberInfo.avatar)" mode="" class="avatar"></image>
      <view class="user">
        <view class="font-weight-5 font-32 acea-row row-middle">{{memberInfo.nickname}}<image src="../../static/edit.png" class="edit" @click="goTo('/pages/info/info')"></image></view>
        <view class="font-20 uservip uservip-1" v-if="memberInfo.is_vip == '0'"><image src="../../static/vip-1.png" class="level"></image>未开通 </view>
        <view class="acea-row row-middle" v-else>
          <view class="font-20 uservip"><image src="../../static/vip.png" class="level"></image>会员 </view>
          <text class="color-sub font-size-tag m-l-20">{{memberInfo.vip_date}}到期</text>
        </view>
      </view>
      <view class="coinCon" @click="goTo('/otherpages/integral/integral')"> <image src="../../static/coin.png" class="coin"></image>赚积分</view>
  </view>
 <view class="userbox acea-row row-middle"   @click="$util.redirectTo('/pages/login/login')" v-else>
      <image src="../../static/avatar.png" mode="" class="avatar"></image>
      <view class="user">
        <view class="font-weight-5 font-32 acea-row row-middle">请登录<image src="../../static/edit.png" class="edit" ></image></view>
        <view class="font-20 uservip uservip-1" v-if="memberInfo.is_vip == '0'"><image src="../../static/vip-1.png" class="level"></image>未开通 </view>
         <view class="font-20 uservip" v-else><image src="../../static/vip.png" class="level"></image>会员 </view>
      </view>
      <view class="coinCon"> <image src="../../static/coin.png" class="coin"></image>赚积分</view>
  </view>
  <view class="openVip" @click="goTo('/otherpages/openVip/openVip')">
    <image src="../../static/level.png" mode="" ></image>
    尊享会员
    <view class="xu">{{memberInfo.is_vip=='0'?'开通会员':'立即续费'}}</view>
  </view>
  
  <view class="sales" v-if="memberInfo.sale_name&&memberInfo.sale_mobile">
    <text class="name">我的销售</text>
    <view>
      {{memberInfo.sale_name}}
      <text class="m-l-10">{{memberInfo.sale_mobile | filterMobile}}</text>
    </view>
  </view>
  
  <view class="boxCon">
    <view class="font-weight">我的资产</view>
    <view class="num-box acea-row">
      <view class="num-item" @click="goTo('/otherpages/integral/integral')">
        <view class="num">{{memberInfo.score}}</view>
        <view class="name">积分</view>
        <view class="lines"></view>
      </view>
      <view class="num-item" @click="goTo('/otherpages/balance/balance')">
        <view class="num">{{memberInfo.money}}</view>
        <view class="name">余额</view>
        <view class="lines"></view>
      </view>
      <view class="num-item" @click="goTo('/otherpages/coupon/coupon')">
        <view class="num">{{memberInfo.coupon_count}}</view>
        <view class="name">优惠券</view>
      </view>
    </view>
  </view>
  
  <my-menu-list :userInfo="memberInfo"></my-menu-list>
  
  <!-- 底部tabBar -->
  <diy-bottom-nav type="shop"></diy-bottom-nav>
  
  </view>
</template>

<script>
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  import myMenuList from '@/components/my-menu-list/my-menu-list.vue'
  export default {
    components: {
      myMenuList,diyBottomNav
    },
    computed: {
      storeToken() {
      	return this.$store.state.token;
      },
    },
    watch: {
    	storeToken: async function(nVal, oVal) {
    		await this.getMemberInfo();
    	}
    },
    filters: {
    	filterMobile(mobile) {
    		return mobile.substring(0, 4 - 1) + '****' + mobile.substring(6 + 1);
    	}
    },
    data() {
      return {
        token: '',
        memberInfo: {
        	money: 0,
        	score: 0,
          coupon_count: 0,
          is_vip: '0',
          group_id: 1
        },
      }
    },
    onLoad() {
      uni.hideTabBar();
    },
    async onShow() {
      this.token = uni.getStorageSync('token');
       
       if (uni.getStorageSync('userInfo')) {
         this.memberInfo = uni.getStorageSync('userInfo');
       }
       
      if (this.token) {
        await this.getMemberInfo();
      } else {
        this.initInfo();
      }
      this.$forceUpdate();
    },
    methods: {
      initInfo() {
      	this.token = '';
      	this.memberInfo = {
      		money: '0.00',
      		score: 0,
          coupon_count: 0,
          is_vip: '0',
          group_id: 1
      	};
      	uni.stopPullDownRefresh();
      },
      goTo(url) {
        if(!this.token) return;
        this.$util.redirectTo(url);
      },
      // 获取会员基础信息
      async getMemberInfo() {
      	let res = await this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
      		async: false
      	});
      	if (res.code == 1 && res.data) {
         
      		this.memberInfo = res.data;
      		uni.setStorageSync('userInfo', this.memberInfo);
      	} else {
      		this.initInfo();
      		uni.removeStorageSync('token');
      		uni.removeStorageSync('userInfo');
      	}
      	uni.stopPullDownRefresh();
      },
      // 下拉刷新
      onPullDownRefresh() {
      	if (uni.getStorageSync('token')) this.getMemberInfo();
      	else this.initInfo();
      },
    }
  }
</script>

<style lang="scss" scoped>
.userbox {
  position: relative;
  padding: 40rpx 28rpx 0;
  background-color: #fff;
  .avatar {
    width: 116rpx;
    height: 116rpx;
    border-radius: 50%;
    margin-right: 28rpx;
  }
  .user {
    flex: 1;
    .edit {
      width: 28rpx;
      height: 28rpx;
      margin-left: 10rpx;
    }
    .level {
      width: 24rpx;
      height: 20rpx;
      margin-right: 6rpx;
    }
    .uservip {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120rpx;
      height: 40rpx;
      background: #FFCD6A;
      border-radius: 24rpx;
      font-size: $font-size-goods-tag;
      font-weight: 500;
      color: #452D00;
    }
    .uservip-1 {
      background-color: #E6E6E6!important;
      color: #B1B1B1!important;
    }
  }
  
  .coinCon {
    position: absolute;
    right: 0;
    top: 20%;
    padding: 6rpx 14rpx;
    background: linear-gradient(101deg, #F4BE44 0%, #ED8734 100%);
    border-radius: 200rpx 0px 0px 200rpx;
    font-size: $font-size-tag;
    color: #fff;
    .coin {
      width: 24rpx;
      height: 24rpx;
      margin-right: 10rpx;
    }
  }
}
.openVip {
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  margin: 40rpx 28rpx 24rpx;
  height: 96rpx;
  color: #fff;
  background-image: url('../../static/level_bg.png');
  background-position: 50% 50%;
  background-size: cover;
  image {
    width: 56rpx;
    height: 56rpx;
    margin-right: 16rpx;
  }
  .xu {
    width: 136rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background: #FFFFFF;
    border-radius: 24rpx;
    font-size: $font-size-tag;
    color: #303744;
    margin-left: auto;
  }
}
.sales {
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 0 28rpx;
  .name {
    color: #C8C8C8;
  }
  view {color: #343434;}
}
.boxCon {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 24rpx 28rpx;
  .num-box {
    margin-top: 40rpx;
    .num-item {
      position: relative;
      width: 33.33%;
      text-align: center;
    }
    .lines {
      position: absolute;
      top: 30rpx;
      right: 0;
      width: 1rpx;
      height: 60rpx;
      background-color: #F1F1F1;
    }
    .num {
      font-size: 36rpx;
      font-weight: 800;
      color: #343434;
    }
    .name {
      font-size: $font-size-tag;
      color: #7F7F7F;
    }
  }
}
</style>
