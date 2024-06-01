<template>
	<view class="mescroll-downwarp">
		<view class="downwarp-content">
			<view class="downwarp-progress mescroll-rotate" style="transform" v-if="isRotate"></view>
			<view class="downwarp-tip">{{ downText }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ns-loading',
	props: {
		downText: {
			type: String,
			default: '加载中'
		},
		isRotate: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isShow: true
		};
	},
	methods: {
		show() {
			this.isShow = true;
		},
		hide() {
			this.isShow = false;
		}
	}
};
</script>

<style lang="scss">
/* 下拉刷新区域 */
.mescroll-downwarp {
	width: 100%;
	height: 100%;
	text-align: center;
}

/* 下拉刷新--内容区,定位于区域底部 */
.mescroll-downwarp .downwarp-content {
	width: 100%;
	min-height: 60rpx;
	padding: 20rpx 0;
	text-align: center;
}

/* 下拉刷新--提示文本 */
.mescroll-downwarp .downwarp-tip {
	display: inline-block;
	font-size: 28rpx;
	color: gray;
	vertical-align: middle;
	margin-left: 16rpx;
}

/* 下拉刷新--旋转进度条 */
.mescroll-downwarp .downwarp-progress {
	display: inline-block;
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	border: 2rpx solid gray;
	border-bottom-color: transparent;
	vertical-align: middle;
}

/* 旋转动画 */
.mescroll-downwarp .mescroll-rotate {
	animation: mescrollDownRotate 0.6s linear infinite;
}

@keyframes mescrollDownRotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
