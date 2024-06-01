<template>
  <view class="container">
    
    <view class="content">
      <view class="name">请上传本人身份证</view>
      <view class="font-size-tag color-sub">拍摄身份证正反照 确认身份证信息</view>
      <view class="uploadCon">
        <view class="uploadItem" @click="uploadImage(1)">
          <block v-if="form.auth_card_front_image">
            <image :src="form.auth_card_front_image" mode="aspectFill" class="" style="width: 336rpx;height: 172rpx;"></image>
          </block>
          <block v-else>
            <image src="../../static/10.png" mode="" class="photo"></image>
            <text>上传人像面</text>
          </block>
        </view>
        <view class="uploadItem" @click="uploadImage(2)">
          <block v-if="form.auth_card_back_image">
             <image :src="form.auth_card_back_image" mode="aspectFill" class="" style="width: 336rpx;height: 172rpx;"></image>
          </block>
          <block v-else>
            <image src="../../static/10.png" mode="" class="photo"></image>
            <text>上传国徽面</text>
          </block>
        </view>
      </view>
      <view class="name m-t-36">请上传本人驾驶证</view>
      <view class="font-size-tag color-sub">拍摄驾驶证正反照 确认驾驶证信息</view>
      <view class="uploadCon">
        <view class="uploadItem" @click="uploadImage(3)">
          <block v-if="form.driving_license_front_image">
            <image :src="form.driving_license_front_image" mode="aspectFill" class="" style="width: 336rpx;height: 172rpx;"></image>
          </block>
          <block v-else>
            <image src="../../static/10.png" mode="" class="photo"></image>
            <text>上传驾驶证主页</text>
          </block>
        </view>
        <view class="uploadItem" @click="uploadImage(4)">
          <block v-if="form.driving_license_back_image">
            <image :src="form.driving_license_back_image" mode="aspectFill" class="" style="width: 336rpx;height: 172rpx;"></image>
          </block>
          <block v-else>
            <image src="../../static/10.png" mode="" class="photo"></image>
            <text>上传驾驶证副页</text>
          </block>
        </view>
      </view>
      <view class="color-sub m-t-56">请确认你的身份信息</view>
      <view class="row acea-row  row-middle" >
       <text class="row-tit">姓名</text>
        <view class="rowRight">
           <input type="text" placeholder="请输入真实姓名"  v-model="form.auth_card_name" :disabled="disabled">
        </view>
      </view>
      <view class="row acea-row  row-middle" >
       <text class="row-tit">身份证</text>
        <view class="rowRight">
           <input type="text" placeholder="请输入身份证号"  v-model="form.auth_card_no" :disabled="disabled">
        </view>
      </view>
      <view class="row acea-row  row-middle" >
       <text class="row-tit">手机号</text>
        <view class="rowRight">
           <input type="number" placeholder="用于接收订单短信通知"  v-model="form.auth_mobile" maxlength="11" :disabled="disabled">
        </view>
      </view>
    </view>
    
    <view class="footerBtn" v-if="auth==0">
      <button type="primary" @click="submitInfo()">提交认证</button>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        auth: 0,  //1已实名
        form: {
          auth_card_name: '',
          auth_card_no: '',
          auth_mobile: '',
          auth_card_front_image: '',
          auth_card_back_image: '',
          driving_license_front_image: '',
          driving_license_back_image: '',
        },
        disabled: false,
      }
    },
    onLoad(option) {
      this.auth = option.auth;
      if(this.auth == 0) this.disabled = false;
      else this.disabled = true;
      
      if(this.auth == 1) this.getDetail();
    },
    methods: {
      //实名信息
      getDetail() {
        this.$api.sendRequest({
          url: '/api/index.user/userAuthDetail',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.form = res.data;
              
            }
          }
        })
      },
      submitInfo() {
        if(!this.form.auth_card_name) {
          this.$util.showToast({title: '请输入真实姓名'});
          return
        }
        if(!this.form.auth_card_no) {
          this.$util.showToast({title: '请输入身份证号'});
          return
        }
        if(!this.form.auth_mobile) {
          this.$util.showToast({title: '请输入手机号'});
          return
        }
        this.$api.sendRequest({
          url: '/api/index.user/userAuth',
          data: {
            auth_card_name: this.form.auth_card_name,
            auth_card_no: this.form.auth_card_no,
            auth_mobile: this.form.auth_mobile,
            auth_card_front_image: this.form.auth_card_front_image,
            auth_card_back_image: this.form.auth_card_back_image,
            driving_license_front_image: this.form.driving_license_front_image,
            driving_license_back_image: this.form.driving_license_back_image,
          },
          success: res => {
            if(res.code == 1) {
              this.getMemberInfo();
              this.$util.showToast({title: '提交成功'});
              setTimeout(function() {
                uni.navigateBack({
                  delta:1
                })
              },2000)
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      //上传图片
      uploadImage(type) {
        this.$util.upload(1,{}, res => {
          let imgArray = res;
          if(type== 1) this.form.auth_card_front_image = imgArray[0];
          else if(type==2) this.form.auth_card_back_image = imgArray[0];
          else if(type==3) this.form.driving_license_front_image = imgArray[0];
          else this.form.driving_license_back_image = imgArray[0];
        })
      },
      //获取用户信息
      getMemberInfo() {
      	this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
          data: {},
          success: res => {
            if(res.code >= 1) {
              uni.setStorageSync('userInfo', res.data);
            }
          }
      	});
      },
    }
  }
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 40rpx 28rpx 0;
  .name {
    font-size: 36rpx;
    font-weight: bold;
  }
  .uploadCon {
    display: flex;
    justify-content: space-between;
    margin-top: 36rpx;
    .uploadItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 336rpx;
      height: 172rpx;
      border-radius: 10rpx;
      border: 2rpx dashed #CCCCCC;
      font-size: $font-size-tag;
      color: #B1B1B1;
      .photo {
        width: 60rpx;
        height: 52rpx;
        margin-bottom: 20rpx;
      }
    }
  }
  .row {
    height: 94rpx;
    border-bottom: 2rpx solid #F2F2F2;
    &:last-child {
      border-bottom: none;
    }
    .row-tit {
      display: inline-block;
      width: 158rpx;
      color: #323232;
    }
    .rowRight {
      flex: 1;
      input {
        color: #333333;
         text-align: left;
      }
    }
  }
}
.footerBtn {
  margin: 100rpx 28rpx 20rpx;
  button {
    margin: 0;
    border-radius: 10rpx;
  }
}
</style>
