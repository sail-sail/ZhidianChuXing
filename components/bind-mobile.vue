<template>
  <view>
  	<view @touchmove.prevent.stop>
  		<uni-popup ref="bindMobile" :custom="true" :mask-click="true">
  			<view class="bind-wrap">
  				<view class="bind-tip-icon"><image src="../static/login2.png" mode="widthFix"></image></view>
  				<view class="bind-tips">为了方便您接收订单等信息，需要绑定您的手机号码</view>
  				<button open-type="getPhoneNumber" class="auth-login ns-btn-default-all color-base-bg2" @getphonenumber="mobileAuthLogin"><text>点击绑定手机号码</text></button>
  			</view>
  		</uni-popup>
  	</view>
  </view>
</template>

<script>
  export default {
    name:"bind-mobile",
    data() {
      return {
        isSub: false
      };
    },
    methods: {
      open() {
      	this.$refs.bindMobile.open();
      },
      cancel() {
      	this.$refs.bindMobile.close();
      },
     mobileAuthLogin(e) {
     	if (e.detail.errMsg == 'getPhoneNumber:ok') {
     		this.getCode(code => {
          if(code) {
            this.nextLogin(code,e)
          }
        })
     	}
     },
     nextLogin(code,e) {
       var data = {
        code: code,
       	iv: e.detail.iv,
       	encryptedData: e.detail.encryptedData
       };
            	
       if (uni.getStorageSync('saleid')) data.invite_id = uni.getStorageSync('saleid');
            
       if (this.isSub) return;
       this.isSub = true;
            
       this.$api.sendRequest({
       	url: '/addons/shop/api.login/getWechatMobile',
       	data,
       	success: res => {
       		if (res.code == 1) {
       			uni.setStorage({
       				key: 'token',
       				data: res.data.token,
       				success: () => {
       					uni.removeStorageSync('authInfo');
                uni.removeStorageSync('is_new');
                this.getMemberInfo()
       				}
       			});
       			this.$store.commit('setToken', res.data.token);
       			this.$refs.bindMobile.close();
       		  uni.navigateBack({
       		    delta:1
       		  })
       		} else {
       			this.isSub = false;
       			this.$util.showToast({ title: res.message });
       		}
       	},
       	fail: res => {
       		this.isSub = false;
       		this.$util.showToast({ title: 'request:fail' });
       	}
       });
     },
     getCode(callback) {
     	// 微信小程序
     	// #ifdef MP-WEIXIN
     	uni.login({
     		provider: 'weixin',
     		timeout: 3000,
     		success: res => {
     			if (res.code) {
             typeof callback == 'function' && callback(res.code);
     			}
     		},
     		fail: () => {
     			this.$util.showToast({
     				title: '请求失败'
     			});
     		}
     	})
     	// #endif
     
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

<style lang="scss">
.color-base-bg2 {
  background-color: $color-title2!important;
}
.bind-wrap {
	width: 600rpx;
	background: #fff;
	box-sizing: border-box;
	border-radius: 20rpx;
	overflow: hidden;

	.head {
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: $font-size-tag;
	}

	.form-wrap {
		padding: 30rpx 40rpx;

		.label {
			color: #000;
			font-size: $font-size-base;
			line-height: 1.3;
		}

		.form-item {
			margin: 20rpx 0;
			display: flex;
			padding-bottom: 10rpx;
			border-bottom: 1px solid #eee;
			align-items: center;

			input {
				font-size: $font-size-tag;
				flex: 1;
			}

			.send {
				font-size: $font-size-tag;
				line-height: 1;
			}

			.captcha {
				margin: 4rpx;
				height: 52rpx;
				width: 140rpx;
			}
		}
	}

	.footer {
		border-top: 1px solid #eee;
		display: flex;

		view {
			flex: 1;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;

			&:first-child {
				font-size: 28rpx;
				border-right: 1px solid #eee;
			}
		}
	}

	.bind-tips {
		color: #aaa;
		font-size: $font-size-base;
		padding: 20rpx 50rpx;
		text-align: center;
	}

	.auth-login {
		width: 300rpx;
		margin: 20rpx auto 60rpx auto;
	}

	.bind-tip-icon {
		padding-top: 80rpx;
		width: 100%;
		text-align: center;

		image {
			width: 300rpx;
		}
	}
}
.ns-btn-default-all {
	width: 100%;
	height: 70rpx;
	border-radius: 70rpx;
	text-align: center;
	line-height: 70rpx;
	color: #ffffff;
	font-size: $font-size-base;
}
</style>
<style scoped>
/deep/ .reward-popup .uni-popup__wrapper-box {
	background: none !important;
	max-width: unset !important;
	max-height: unset !important;
	 overflow: unset!important;
}
</style>