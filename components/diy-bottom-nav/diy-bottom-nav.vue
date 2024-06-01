<template>
	<view v-if="list">
		<view class="tab-bar" :style="{ backgroundColor: backgroundColor }">
			<view class="tabbar-border"></view>
			<view class="item" v-for="(item, index) in list" :key="index" :class="{ bulge: isBulge && index == 2 }" @click="redirectTo(item.link)">
				<view class="bd" :class="item.link.name == 'scan'?'bd_on':''">
					<view class="icon" v-if="bottomType == 1">
						<image :src="verify(item.link) ? item.selectedIconPath : item.iconPath" />
					</view>
					<view class="label" v-if="bottomType == 1&&item.link.name !== 'scan'" :style="{ color: verify(item.link) ? textHoverColor : textColor }">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<!-- 解决fixed定位后底部导航栏塌陷问题 -->
		<view class="tab-bar-placeholder"></view>
	
	</view>
</template>

<script>
export default {
	name: 'diy-bottom-nav',
	props: {
		value: {
			type: Object
		},
		type: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			currentRoute: '', //当前页面路径
			//特殊页面处理悬浮
			special: ['pages/goods/cart/cart'],
			specialPage: '',
			isIphoneX: false, //判断手机是否是iphoneX以上
			jumpFlag: true, //是否可以跳转，防止重复点击

			bottomNav: {},
			textHoverColor: '',
			textColor: '',
			backgroundColor: '',
			list: {},
			bottomType: 1
		};
	},
	mounted() {
		let currentPage = getCurrentPages()[getCurrentPages().length - 1];
		this.currentRoute = currentPage.route;
		this.getBottomNav();
	},
	computed: {
		isBulge() {
			// 暂时去掉悬浮功能
			return false;
			if (this.bottomNav.list) {
				return this.bottomNav.list.length == 5 && this.special.indexOf(this.currentRoute) == -1 && this.bottomNav.bulge;
			} else {
				return false;
			}
		}
	},
  watch: {
    '$store.state.siteState': {
      handler() {
        this.getBottomNav()
      },
    },
  },
	methods: {
		redirectTo(link) {
			this.$emit('callback');
      //判断是不是拉起了扫码
      if(link.name == 'scan') {
        this.openScanCode()
        return
      }
			if (link.wap_url.indexOf('http') != -1 || link.wap_url.indexOf('https') != -1) {
				// #ifdef MP-WEIXIN
				this.redirectTo('/otherpages/web/web?src=' + link.wap_url);
				// #endif
				// #ifdef H5
				location.href = link.wap_url;
				// #endif
			}else if (link.appid) {
				uni.navigateToMiniProgram({
					appId: link.appid,
					path: link.page
				})
			}
			if (!this.jumpFlag) return;
			this.jumpFlag = false;
			setTimeout(() => {
				this.jumpFlag = true;
			}, 300);
			if (link == null || link == '' || !link.wap_url) return false;
			
			if(this.name){
				var url = this.currentRoute + '?name=' + this.name;
			}else{
				var url = this.currentRoute
			}
			
			if (link.wap_url.indexOf(url) != -1) return false;

			let jump = true;
			let arr = getCurrentPages().reverse();
			
			for (let i = 0; i < arr.length; i++) {
				
				if(this.name){
					var route = arr[i].route + '?name=' + this.name;
				}else{
					var route = arr[i].route;
				}
				if (link.wap_url.indexOf(route) != -1) {
					jump = false;
					uni.navigateBack({
						delta: i
					});
					break;
				}
			}
			if (jump) {
				this.$util.redirectTo(link.wap_url);
			}
		},
    openScanCode() {
      var that = this;
      // 只允许通过相机扫码
      uni.scanCode({
      	onlyFromCamera: true,
      	success: function (res) {
      		console.log('条码类型：' + res.scanType);
      		console.log('条码内容：' + res.result);
          if(res.errMsg == 'scanCode:ok') {
            try {
              var sceneParams = decodeURIComponent(res.result);
              // var sceneParams = 'pages/index/index?scene=id=12'
              sceneParams = sceneParams.split('=');
              if (sceneParams.length) {
              	that.$util.redirectTo('/employee/orderDetail/orderDetail?id='+sceneParams[1])
              }
            }catch(e) {
              that.$util.showToast({title: e.message})
            }
          }else {
            that.$util.showToast({title: res.errorMsg})
          }
      	}
      });
    },
		verify(link) {
			if (link == null || link == '' || !link.wap_url) return false;
			if(this.name){
				var url = this.currentRoute + '?name=' + this.name;
			}else{
				var url = this.currentRoute
			}
			if (link.wap_url.indexOf(url) != -1) {
				return true;
			}
			return false;
		},
		getBottomNav() {
      if(this.$store.state.siteState == 1) {
        var value = {
          backgroundColor: "#ffffff",
          bulge: false,
          list: [
            {
              iconPath: "../../static/tabbar/1-1.png",
              id: "0",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "INDEX",
                selected: false,
                title: "首页",
                type: 0,
                wap_url: "/pages/index/index",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/1-2.png",
              text: "首页",
            },{
              iconPath: "../../static/tabbar/2-1.png",
              id: "1",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "BRAND",
                selected: false,
                title: "车型",
                type: 1,
                wap_url: "/pages/category/category",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/2-2.png",
              text: "车型",
            },{
              iconPath: "../../static/tabbar/3-1.png",
              id: "2",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "DRESS",
                selected: false,
                title: "订单",
                type: 2,
                wap_url: "/pages/order/order",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/3-2.png",
              text: "订单",
            },{
              iconPath: "../../static/tabbar/4-1.png",
              id: "3",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "MINE",
                selected: false,
                title: "我的",
                type: 3,
                wap_url: "/pages/my/my",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/4-2.png",
              text: "我的",
            }
          ],
          textColor: "#B3B3B3",
          textHoverColor: "#00BC7E",
          type: 1
        }
      }else {
        var value = {
          backgroundColor: "#ffffff",
          bulge: false,
          list: [
            {
              iconPath: "../../static/tabbar/11-1.png",
              id: "0",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "INDEX",
                selected: false,
                title: "首页",
                type: 0,
                wap_url: "/pages/user/index/index",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/11-2.png",
              text: "首页",
            },{
              iconPath: "../../static/tabbar/22-1.png",
              id: "1",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "scan",
                selected: false,
                title: "扫码",
                type: 1,
                wap_url: "",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/22-1.png",
              text: "扫码",
            },{
              iconPath: "../../static/tabbar/33-1.png",
              id: "3",
              imgHeight: "56",
              imgWidth: "56",
              link: {
                addon_icon: null,
                addon_name: "",
                addon_title: null,
                icon: "",
                name: "MINE",
                selected: false,
                title: "我的",
                type: 3,
                wap_url: "/pages/user/member/member",
                web_url: ""
              },
              selectedIconPath: "../../static/tabbar/33-2.png",
              text: "我的",
            }
          ],
          textColor: "#B3B3B3",
          textHoverColor: "#000000",
          type: 1
        }
      }
		  
      this.bottomNav = value;
      this.textColor = value.textColor;
      this.textHoverColor = value.textHoverColor;
      this.backgroundColor = value.backgroundColor;
      this.bottomType = value.type;
      this.list = value.list;
      this.$store.commit('setTabbarList', value);
      this.$forceUpdate();
			
		}
	}
};
</script>

<style lang="scss">
.color-base-bg2 {
	background-color: $color-bg;
}
.placeholder {
	height: 56px;
	&.bluge {
		height: 90px;
	}
}

.safe-area {
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar {
	background-color: #fff;
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 998;
	display: flex;
	border-top: 2rpx solid #f5f5f5;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);

	.tabbar-border {
		background-color: rgba(255, 255, 255, 0.329412);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 2rpx;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.item {
		display: flex;
		align-items: center;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex: 1;
		flex-direction: column;
		padding-bottom: 10rpx;
		box-sizing: border-box;

		.bd {
			position: relative;
			height: 100rpx;
			flex-direction: column;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.icon {
				position: relative;
				display: inline-block;
				margin-top: 10rpx;
				width: 64rpx;
				height: 64rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}

			.label {
				position: relative;
				text-align: center;
				font-size: 24rpx;
				line-height: 1;
				margin-top: 12rpx;
			}
		}
    
    .bd_on {
      margin-top: -40rpx!important;
      .icon {
        width: 88rpx!important;
        height: 88rpx!important;
      }
    }

		&.bulge {
			.bd {
				position: relative;
				height: 50px;
				flex-direction: column;
				text-align: center;

				.icon {
					margin-top: -30px;
					margin-bottom: 2px;
					border-radius: 50%;
					width: 50px;
					height: 51px;
					padding: 5px;
					border-top: 1px solid #f5f5f5;
					background-color: #fff;
					box-sizing: border-box;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.label {
					position: relative;
					text-align: center;
					font-size: 12px;
					line-height: 1.6;
					height: 20px;
					line-height: 20px;
				}
			}
		}

		.cartNumberBtn {
			position: absolute;
			top: -8rpx;
			right: -18rpx;
			width: 24rpx;
			height: 24rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			padding: 6rpx;
			border-radius: 50%;
			z-index: 99;
		}
	}
}
.tab-bar-placeholder{
	padding-bottom: calc(constant(safe-area-inset-bottom) + 112rpx);
	padding-bottom: calc(env(safe-area-inset-bottom) + 112rpx);
}
</style>
