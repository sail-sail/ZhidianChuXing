<template>
  <view class="callDialog">
    <u-popup :show="show" mode="center" border-radius="14">
    		<view class="pop-dialog">
          <view class="title">平台电话</view>
          <view class="mobile">{{mobile}}</view>
          <view class="confirm" @click="callPhone()">立即拨打</view>
          <view class="cancel" @click="close()">取消</view>
        </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"my-call-mobile",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        mobile: '400-1234-1234'
      };
    },
    created() {
      this.getSetting()
    },
    methods: {
      close() {
        this.$emit('close')
      },
      callPhone() {
        uni.makePhoneCall({
          phoneNumber: this.mobile
        })
      },
      //获取系统配置
      getSetting() {
        this.$api.sendRequest({
          url: '/api/index.index/setting',
          data: {},
          success: res => {
            if(res.code == 1) {
              this.mobile = res.data.mobile;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.pop-dialog {
  width: 610rpx;
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 28rpx 0 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(0,0,0,0.8);
  }
  .mobile{
    font-size: 40rpx;
    font-weight: 500;
    color: rgba(0,0,0,0.8);
    margin: 56rpx 0 80rpx;
  }
  .confirm {
    width: 328rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: $color-title2;
    border-radius: 10rpx;
    color: #fff;
    font-size: $font-size-toolbar;
    margin-bottom: 24rpx;
  }
  .cancel {
    font-size: $font-size-toolbar;
    color: $color-title2;
  }
}
</style>