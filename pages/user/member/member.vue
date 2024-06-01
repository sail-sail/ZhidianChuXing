<template>
  <view class="container">
    
    <view class="userbox acea-row row-middle">
        <image :src="$util.img(memberInfo.avatar)" mode="" class="avatar"></image>
        <view class="user">
          <view class="font-weight-5 font-32 acea-row row-middle">{{memberInfo.nickname}}
              <image src="../....//static/edit.png" class="edit" ></image>
          </view>
        </view>
        <view class="acea-row row-middle color-sub font-size-tag" @click="goTo('/pages/info/info')">编辑资料 <u-icon name="arrow-right" ></u-icon></view>
    </view>
    
    <view class="module">
      <view class="module_item" @click="goTo('/employee/client/client')" v-if="memberInfo.group_id !== 4">
        <image src="../../../static/user/user1.png" mode=""></image>我的客户
      </view>
      <view class="module_item item2" @click="goTo('/employee/performance/performance')">
        <image src="../../../static/user/user2.png" mode=""></image>我的业绩
      </view>
    </view>
    
    <view class="row-list">
      <view class="title">其他服务</view>
      <view class="row-item"  @click="goRedirect('邀请用户','/employee/invite/invite')">
        <view class="acea-row row-middle">
          <image src="../../../static/user/icon1.png" mode="" class="menu-img"></image>
          邀请用户
        </view>
        <view class="acea-row row-middle">
          <u-icon name="arrow-right" size="15" color="#999999"></u-icon>
        </view>
      </view>
      <view class="row-item"  @click="goRedirect('对外切换','/pages/index/index')">
        <view class="acea-row row-middle">
          <image src="../../../static/user/icon2.png" mode="" class="menu-img"></image>
          对外切换
        </view>
        <view class="acea-row row-middle">
          <u-icon name="arrow-right" size="15" color="#999999"></u-icon>
        </view>
      </view>
    </view>
    
    <!-- 底部tabBar -->
    <diy-bottom-nav type="shop"></diy-bottom-nav>
    
  </view>
</template>

<script>
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  export default {
    components: {
      diyBottomNav
    },
    data() {
      return {
        menu: [{
          img: '../../../static/user/icon1.png',
          name: '邀请用户',
          sub: '',
          url: '/employee/invite/invite'
        },{
          img: '../../../static/user/icon2.png',
          name: '对外切换',
          sub: '',
          url: '/pages/index/index'
        }],
        memberInfo: ''
      }
    },
    onLoad() {
      uni.hideTabBar();
    },
    onShow() {
       this.getMemberInfo();
    },
    methods: {
      goTo(url) {
        this.$util.redirectTo(url)
      },
      goRedirect(name,url) {
        if(name == "对外切换") {
          this.$store.state.siteState = 1;
        }
        this.$util.redirectTo(url)
      },
      //获取用户信息
      getMemberInfo() {
      	this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
          data: {},
          success: res => {
            if(res.code >= 1) {
              this.memberInfo = res.data;
              uni.setStorageSync('userInfo', res.data);
            }
          }
      	});
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
 
}
.module {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 32rpx;
  .module_item {
    display: flex;
    align-items: center;
    width: 328rpx;
    background: #1964FD;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    color: #fff;
    image {
      width: 56rpx;
      height: 56rpx;
      margin-right: 32rpx;
    }
    
  }
  .item2 {
    background-color: $color-title2;
  }
}
.row-list {
  background-color: #fff;
  border-radius: 20rpx;
  margin: 32rpx;
  .title {
    font-size: $font-size-toolbar;
    color: #121836;
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #F5F5F5;
    margin: 0 24rpx;
    padding: 24rpx 0;
  }
  .row-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82rpx;
    padding: 0 24rpx;
  }
  .menu-img {
    width: 36rpx;
    height: 36rpx;
    margin-right: 12rpx;
  }
}
</style>
