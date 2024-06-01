<template>
  <view class="container">
    <view class="bg">
      
    </view>
    <view class="box">
      <view class="font-size-toolbar font-weight">成为车主，一起赚钱</view>
      <view class="desc">如果您有闲置车辆欢迎加入我们，一起赚钱 。</view>
      <view class="desc">填写车辆信息后，我们的服务专员将在24内联系您</view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 01 您的车型</view>
      <view class="form-input">
        <input type="text" placeholder="请输入" placeholder-class="placeholder" v-model="form.chexing">
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 02 您的联系方式</view>
      <view class="form-input">
        <input type="number" placeholder="请输入" placeholder-class="placeholder" v-model="form.mobile">
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 03 购车时间</view>
      <view class="form-input acea-row row-middle row-between" @click="show = true">
        <input type="text" placeholder="年-月-日" placeholder-class="placeholder" v-model="form.buycartime" :disabled="true">
        <u-icon name="arrow-down-fill" color="#CCCCCC" size="10"></u-icon>
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 04 推荐人工号</view>
      <view class="form-input">
        <input type="text" placeholder="请输入" placeholder-class="placeholder" v-model="form.recommond">
      </view>
    </view>
    
    <!-- <view class="" style="width: 100%;height: 120rpx;"></view> -->
    
    <view class="footer">
      <button type="primary" @click="submit()">提交</button>
    </view>
    
    <!-- 年 月 日选择器 -->
    <u-datetime-picker ref="datetimePicker" :show="show" v-model="value1" mode="date" minDate="26640"
     	@confirm="comfirmDate" @cancel="cancelDate"></u-datetime-picker>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          chexing: '',
          mobile: '',
          buycartime: '',
          recommond: '',
        },
        show: false,
        value1: Number(new Date()),
      }
    },
    methods: {
      cancelDate() {
        this.show = false;
      },
      comfirmDate(e) {
        const timeFormat = uni.$u.timeFormat;
        this.form.buycartime = timeFormat(e.value, 'yyyy-mm-dd');
        this.show = false;
      },
      submit() {
        if(!this.form.chexing) {
          this.$util.showToast({title: '请输入车型'});
          return;
        }
        if(!this.form.mobile) {
          this.$util.showToast({title: '请输入联系方式'});
          return;
        }
        this.$api.sendRequest({
          url: '/api/car/Index/carer',
          data: {
            chexing: this.form.chexing,
            mobile: this.form.mobile,
            buycartime: this.form.buycartime,
            recommond: this.form.recommond
          },
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: '提交成功，等待联系！'});
              setTimeout(function() {
                uni.navigateBack({
                  delta:1
                })
              },1000)
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 162rpx;
  background-color: $color-title2;
}
.box {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  margin: -130rpx 28rpx 0;
  .desc {
    color: #818181;
    font-size: $font-size-tag;
    margin-top: 24rpx;
  }
}
.form {
  background: #FFFFFF;
  border-radius: 20rpx;
  margin: 24rpx 28rpx 24rpx;
  padding: 24rpx;
  .title {
    display: flex;
    font-weight: bold;
    margin-bottom: 24rpx;
    text {
      color: #FF9531;
      margin-right: 10rpx;
    }
  }
  .form-input {
    border-radius: 10rpx;
    border: 2rpx solid #F3F3F3;
    padding: 24rpx;
    input {
      font-size: $font-size-tag;
    }
    .placeholder {
      color: #CBCBCB;
      font-size: $font-size-tag;
    }
  }
}
.footer {
  // position: fixed;
  // bottom: 30rpx;
  // width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  margin: 50rpx 0;
  button {
    width: 694rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #00BC7E;
    border-radius: 10rpx;
    color: #FFFFFF;
    font-size: $font-size-toolbar;
  }
}
</style>
