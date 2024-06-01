<template>
	<view class="container">
		<view class="main">
      <image src="../../static/login.png" mode=""></image>
		</view>
    <!-- #ifdef MP-WEIXIN -->
    <button v-if="canIUseGetUserProfile" @click="login" class="login combtn">一键登录</button>
		<button v-else open-type="getUserInfo" @getuserinfo="login" class="login combtn">一键登录</button>
    <!-- #endif  -->
		<!-- <view class="agree acea-row row-center-wrapper">
			<image :src="checked?$util.img('upload/uniapp/user/3.png'):$util.img('upload/uniapp/user/2.png')" mode="" class="radioimg" @click="checked = !checked"></image>
      我已阅读并同意 
      <text @click="goAgreement(1)">《版权声明》</text>
      <text @click="goAgreement(2)">《隐私保护》</text>
		</view> -->
    
    <bind-mobile ref="bindMobile"></bind-mobile>
    
	</view>
</template>

<script>
  import bindMobile from '@/components/bind-mobile.vue'
	import auth from 'common/js/auth.js';
	export default {
    components: {
      bindMobile
    },
    mixins: [auth],
		data() {
			return {
        isPhone: false, //是否是手机号登陆页面
        canIUseGetUserProfile: false,
        checked: false,
			}
		},
		onLoad() {
      uni.login({
        success(res) {
          console.log('888',res.code)
        }
      })
			var _this = this;
      // #ifdef MP-WEIXIN
      if (wx.getUserProfile) this.canIUseGetUserProfile = true;
      // #endif
		},
		methods: {
			goAgreement(type) {
				uni.navigateTo({
					url: '/otherpages/agreement/agreement?type='+type
				})
			},
      login(e) {
          // #ifdef MP-WEIXIN
          if (this.canIUseGetUserProfile) {
          	wx.getUserProfile({
          		desc: '获取用户个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          		success: (res) => {
          			if (res.errMsg == 'getUserProfile:ok') {
                  this.authInfo.avatarUrl = res.userInfo.avatarUrl;
                  this.authInfo.nickName = res.userInfo.nickName;
          				uni.setStorageSync('authInfo', this.authInfo)
          				this.getCode(data => {
          					if (data) {
          						this.authLogin(data);
          					} 
          				});
          			}
          		}
          	})					
          } else if (e.detail.errMsg == 'getUserInfo:ok') {
          	this.getCode(data => {
          		if (data) {
          			this.authLogin(data);
          		} 
          	});
          }
          // #endif
        
      },
      /**
       * 授权登录
       */
      authLogin(data) {
      	uni.showLoading({ title: '登录中' });
      	uni.setStorage({
      		key: 'authInfo',
      		data: data
      	});
      	// if (uni.getStorageSync('suid')) data.suid = uni.getStorageSync('suid');
      
      	this.$api.sendRequest({
      		url: '/addons/shop/api.login/wxLogin',
      		data,
      		success: res => {
      			if (res.code == 1) {
              if(res.data.user) {
                uni.setStorage({
                	key: 'token',
                	data: res.data.user.token,
                	success: () => {
                		uni.removeStorageSync('authInfo');
                    uni.removeStorageSync('is_new');
                		this.$store.commit('setToken', res.data.token);
                    this.getMemberInfo()
                	}
                });
                setTimeout(() => {
                	uni.hideLoading();
                  uni.navigateBack({
                    delta:1
                  })
                }, 1000);
              }else {
                uni.hideLoading();
                //打开授权手机号弹窗
                this.$refs.bindMobile.open();
              }
      			} else {
      				uni.hideLoading();
              this.$util.showToast({ title: '登录失败' });
      			} 
      		},
      		fail: () => {
      			uni.hideLoading();
      			this.$util.showToast({ title: '登录失败' });
      		}
      	});
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
page {
  background-color: #fff;
}
.container {
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 176rpx;
		image {
      width: 630rpx;
      height: 365rpx;
    }
	}
  .combtn {
    width: 562rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    border-radius: 10rpx;
    font-size: 28rpx;
    margin-left: auto;
    margin-right: auto;
  }
	.login {
		background: $color-title2;
		margin-top: 100rpx;
	}
	.mobile {
		background: $color-title;
		margin-bottom: 40rpx;
    margin-top: 140rpx;
	}
	
	button:after {
		border: none;
	}
	.agree {
		position: fixed;
		width: 100%;
		bottom: 96rpx;
		font-size: $font-size-tag;
		text {
			color: $color-title!important;
		}
    .radioimg {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
	}
}
</style>
