<template>
  <view class="content">
        <view class="row acea-row row-between row-middle" >
          <view>姓名</view>
         <view class="acea-row row-right">
            <text>{{memberInfoformData.realName?memberInfoformData.realName:'待认证'}}</text>
            <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
         </view>
        </view>
        <button class="row acea-row row-between row-middle" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" style="margin: 0;padding: 0;background-color: #fff;">
          <view>头像：</view>
          <view class="acea-row row-right">
            <image :src="$util.img(memberInfoformData.userHeadImg)" mode="aspectFill" class="avatar"></image>
            <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
          </view>
        </button>
        <view class="row acea-row row-between row-middle" @click="modifyInfo('name')">
          <view>昵称：</view>
          <view class="acea-row row-right">
            <text>{{memberInfoformData.nickName}}</text>
            <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
          </view>
        </view>
        <view class="row acea-row row-between row-middle">
          <view>手机号：</view>
          <view class="acea-row row-right">
             <text>{{memberInfoformData.mobile | filterMobile}}</text>
          </view>
        </view>
        <!-- <loading-cover ref="loadingCover"></loading-cover> -->
  </view>
</template>

<script>
  import info from '../js/info.js';
  export default {
    data() {
      return {
        
      }
    },
    mixins: [info],
  }
</script>

<style lang="scss" scoped>
.content {
    margin: 20rpx 24rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 0 32rpx;

    .row {
      height: 116rpx;
      border-bottom: 1px solid #F2F2F2;

      &:last-child {
        border-bottom: none;
      }

      .inputs {
        text-align: right;
      }
    }
    .avatar {
      width: 102rpx;
      height: 102rpx;
      border-radius: 50%;
    }
  }
</style>
