<template>
  <view class="container">
    <view class="bg">
      
    </view>
    <view class="box">
      <view class="font-size-toolbar font-weight">企业用车需求表 </view>
      <view class="desc">若您有企业用车需求，请登记您的车型，我们的服务专员将在24小时内与您联系。</view>
      <view class="desc">企业用车包含企业长租、企业测试车等用车场景。</view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 01 车型</view>
      <view class="form-input">
        <input type="text" placeholder="请输入" placeholder-class="placeholder" v-model="form.carmodel">
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 02 联系方式</view>
      <view class="form-input">
        <input type="number" placeholder="请输入" placeholder-class="placeholder" v-model="form.mobile">
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 03 用车城市</view>
      <view class="form-input">
        <input type="text" placeholder="请输入" placeholder-class="placeholder" v-model="form.provincecityarea">
      </view>
    </view>
    
    <view class="form">
      <view class="title"><text class="xing">*</text> 04 用车时间</view>
      <view class="form-input acea-row row-middle row-between" @click="show = true">
        <text class="font-size-tag">开始时间</text>
        <view class="acea-row row-middle">
          <input type="text" placeholder="年-月-日" placeholder-class="placeholder" style="text-align: right;margin-right: 10rpx;" v-model="form.start_time" :disabled="true">
          <u-icon name="arrow-down-fill" color="#CCCCCC" size="10"></u-icon>
        </view>
      </view>
      <view class="form-input acea-row row-middle row-between m-t-24" @click="show2 = true">
        <text class="font-size-tag">结束时间</text>
        <view class="acea-row row-middle">
          <input type="text" placeholder="年-月-日" placeholder-class="placeholder" style="text-align: right;margin-right: 10rpx;" v-model="form.end_time" :disabled="true">
          <u-icon name="arrow-down-fill" color="#CCCCCC" size="10"></u-icon>
        </view>
      </view>
    </view>
    
    <!-- <view class="" style="width: 100%;height: 100rpx;"></view> -->
    
    <view class="footer">
      <button type="primary" @click="submit()">提交</button>
    </view>
    
    <!-- 年 月 日选择器 -->
    <u-datetime-picker ref="datetimePicker" :show="show" v-model="value1" mode="date" minDate="26640"
     	@confirm="comfirmDate" @cancel="cancelDate"></u-datetime-picker>
      
    <u-datetime-picker ref="datetimePicker" :show="show2" v-model="value2" mode="date" minDate="26640"
     	@confirm="comfirmDate2" @cancel="cancelDate2"></u-datetime-picker>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          carmodel: '',
          mobile: '',
          provincecityarea: '',
          start_time: '',
          end_time: ''
        },
        show: false,
        value1: Number(new Date()),
        show2: false,
        value2: Number(new Date()),
      }
    },
    methods: {
      cancelDate() {
        this.show = false;
      },
      comfirmDate(e) {
        const timeFormat = uni.$u.timeFormat;
        this.form.start_time = timeFormat(e.value, 'yyyy-mm-dd');
        this.show = false;
      },
      cancelDate2() {
        this.show2 = false;
      },
      comfirmDate2(e) {
        const timeFormat = uni.$u.timeFormat;
        this.form.end_time = timeFormat(e.value, 'yyyy-mm-dd');
        this.show2 = false;
      },
      submit() {
        if(!this.form.carmodel) {
          this.$util.showToast({title: '请输入车型'});
          return;
        }
        if(!this.form.mobile) {
          this.$util.showToast({title: '请输入联系方式'});
          return;
        }
        this.$api.sendRequest({
          url: '/api/car/Index/usercar',
          data: {
            carmodel: this.form.carmodel,
            mobile: this.form.mobile,
            provincecityarea: this.form.provincecityarea,
            start_time: this.form.start_time,
            end_time: this.form.end_time
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
