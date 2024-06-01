<template>
  <view class="container">
    <block v-if="indent == 'realName'">
      <view class="content">
        <view class="row acea-row row-between row-middle" v-if="indent == 'realName'">
          <view>真实姓名</view>
           <view class="acea-row row-right">
             <input type="text" class="inputs" maxlength="30" placeholder="请输入真实姓名" v-model="formData.realName">
           </view>
        </view>
      </view>
      <view class="save-con">
        <view class="save-btn" @click="save('realName')">保存</view>
      </view>
    </block>
    <block v-if="indent == 'name'">
      <view class="content">
        <view class="row acea-row row-between row-middle" v-if="indent == 'name'">
          <view>昵称</view>
           <view class="acea-row row-right">
             <input type="text" class="inputs" maxlength="30" placeholder="请输入昵称" v-model="formData.nickName">
           </view>
        </view>
      </view>
      <view class="save-con">
        <view class="save-btn" @click="save('name')">保存</view>
      </view>
    </block>
    
   
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
    filters: {
    	mobile(mobile) {
    		return mobile.substring(0, 4 - 1) + '****' + mobile.substring(6 + 1);
    	}
    },
    methods: {
    
    }
  }
</script>

<style lang="scss">
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
// 页面底部按钮
.save-con {
   width: 100%;
 
   .save-btn {
    width: 690rpx;
    height: 86rpx;
    background: $color-title2;
    border-radius: 48rpx;
    line-height: 86rpx;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
    margin: 80rpx auto 0;
   }
}
</style>
