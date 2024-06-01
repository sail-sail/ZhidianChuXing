export default {
	data() {
		return {
			authInfo: {
        code: '',
        nickName: '',
        avatarUrl: '',
      }
		}
	},
	methods: {
		/**
		 * 获取用户登录凭证code
		 */
		getCode(callback) {
			this.getUserInfo();
			// 微信小程序
			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				timeout: 3000,
				success: res => {
					if (res.code) {
            this.authInfo.code = res.code;
            typeof callback == 'function' && callback(this.authInfo);
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
		/**
		 * 获取第三方用户基础信息
		 */
		getUserInfo() {
			// #ifdef MP-WEIXIN
			if (!wx.getUserProfile){
				uni.getUserInfo({
					success: res => {
						if (res.errMsg == 'getUserInfo:ok') {
              this.authInfo.avatarUrl = res.userInfo.avatarUrl;
              this.authInfo.nickName = res.userInfo.nickName;
						}
					}
				});
			}
			// #endif
		},
		/**
		 * 获取到openid之后的操作
		 */
		handleAuthInfo() {
			try {
				// 检测openid是否绑定
				this.checkOpenidIsExits();
			} catch (e) {}
		}
	},
	onLoad(option) {
		if (option.code && this.$util.isWeiXin()) {
			this.$api.sendRequest({
				url: '/wechat/api/wechat/authcodetoopenid',
				data: {
					code: option.code
				},
				success: res => {
					if (res.code == 1) {
						if (res.data.openid) this.authInfo.wx_openid = res.data.openid;
						if (res.data.unionid) this.authInfo.wx_unionid = res.data.unionid;
						Object.assign(this.authInfo, res.data.userinfo);

						this.handleAuthInfo();
					}
				}
			})
		}
	}

}
