<template>
  <view class="container">
    
    <view class="advertisement">
      <!-- 轮播图区域 -->
      <swiper :autoplay="false" :interval="3000" :duration="1000" :circular="true" style="height: 388rpx;">
        <!-- 循环渲染轮播图的 item 项 -->
        <swiper-item v-for="(item, index) in banner" :key="index">
          <image :src="item" mode=""></image>
        </swiper-item>
      </swiper>
      <view class="label">*图片仅供参考，已门店提供实物为准</view>
    </view>
    <view class="main">
      <view class="font-size-toolbar font-weight">{{detail.motorcycle_name}}</view>
      <view class="acea-row m-t-14 m-b-26">
         <text class="label" v-for="(n,m) in detail.home2_tags">{{n}}</text>
      </view>
    </view>
    
    <view class="main">
      <view class="font-size-toolbar font-weight m-b-32">车型配置</view>
      <view class="acea-row cate">
        <rich-text :nodes="detail.content" @click="showImg($event)" :data-nodes="detail.content"></rich-text>
      <!--  <text>变速箱：自动</text>
        <text>进气：涡轮增压</text>
        <text>油箱容量：40</text>
        <text>排量：自动</text>
        <text>座位数：5</text> -->
      </view>
    </view>
    
    <view class="footer" v-if="user !== 'sale'">
      <button type="primary" @click="goOrderSubmit()">立即预订</button>
    </view>
    
    <!-- 实名认证提醒 -->
    <realname-pop :show="show" @close="closeRealname" @confirm="confirmRealname"></realname-pop>
    
  </view>
</template>

<script>
  import realnamePop from '@/components/realname-pop/realname-pop.vue'
  import htmlParser from '@/common/js/html-parser'; 
  export default {
    components: {
      realnamePop
    },
    data() {
      return {
        banner: [],
        id: 0,
        detail: '',
        user: '', //sale 销售身份
        show: false,
      }
    },
    onLoad(option) {
      this.id = option.id;
      this.user = option.user || '';
      this.getDetail()
    },
    methods: {
      goOrderSubmit() {
        if(!uni.getStorageSync('token')) this.$util.redirectTo('/pages/login/login');
        else {
          // if(uni.getStorageSync('userInfo').is_auth==0) this.show = true;
          // else 
          this.$util.redirectTo('/pages/submitOrder/submitOrder?id='+this.id)
        }
      },
      getDetail() {
        this.$api.sendRequest({
          url: '/api/car/Index/cardateils',
          data: {id: this.id},
          success: res => {
            if(res.code >=1) {
              this.detail = res.data;
              if(res.data.image) this.banner.push(res.data.image);
              if (res.data.content) this.detail.content = htmlParser(res.data.content);
            }
          }
        })
      },
      closeRealname() {
        this.show = false
      },
      confirmRealname() {
        this.show = false;
        this.$util.redirectTo('/otherpages/shiming/shiming')
      },
    }
  }
</script>

<style lang="scss" scoped>
.advertisement {
  position: relative;
    margin-bottom: 0;
    width: 100%;
    height: 476rpx;
    background-color: #fff;

    image {
      width: 100%;
      height: 388rpx;
    }
    .label {
      position: absolute;
      bottom: 20rpx;
      left: 28rpx;
      background: rgba(0,0,0,0.41);
      border-radius: 20rpx;
      padding: 6rpx 8rpx;
      font-size: $font-size-activity-tag;
      color: #FFFFFF;
    }
}
.main {
  background-color: #fff;
  padding: 10rpx 28rpx 28rpx;
  margin-bottom: 20rpx;
  .label {
    background: rgba(42,241,127,0.15);
    color: $color-title2;
    padding: 4rpx 8rpx;
    font-size: $font-size-activity-tag;
    margin-right: 16rpx;
  }
  .cate {
    color: rgba(0,0,0,0.5);
    text {
      margin-right: 78rpx;margin-bottom: 28rpx;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 30rpx;
  bottom: calc(constant(safe-area-inset-bottom) + 30rpx);
  bottom: calc(env(safe-area-inset-bottom) + 30rpx);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    width: 100%;
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
</style>
