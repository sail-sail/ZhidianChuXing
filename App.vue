<script>
	export default {
    globalData: {
      title: "质电出行"
    },
		onLaunch: function() {
      console.log('8888')
      uni.setStorageSync('is_new',true)
      //存入小程序生命周期状态
			// #ifdef MP
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});
			
			updateManager.onUpdateReady(function(res) {
				uni.showModal({  
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
			// #endif
      
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "uview-ui/index.scss";
  @import './common/css/main.scss';
  @import './common/css/common.scss';
  .popDialog .u-popup__content {
    background-color: transparent!important;
  }
  .callDialog .u-popup__content {
    border-radius: 32rpx!important;
  }
</style>
