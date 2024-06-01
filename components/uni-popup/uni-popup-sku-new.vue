<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @click="close(true)" />
		<view
			:class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']"
			class="uni-popup__wrapper goodslist-uni-popup safe-area"
			@click="close(true)"
			v-if="isIphoneX"
		>
			<view class="uni-popup__wrapper-box goodslist-uni-popup-box" @click.stop="clear"><slot /></view>
		</view>
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper goodslist-uni-popup" @click="close(true)" v-else>
			<view class="uni-popup__wrapper-box goodslist-uni-popup-box" @click.stop="clear"><slot /></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UniPopup',
	props: {
		// 开启动画
		animation: {
			type: Boolean,
			default: true
		},
		// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
		type: {
			type: String,
			default: 'center'
		},
		// 是否开启自定义
		custom: {
			type: Boolean,
			default: false
		},
		// maskClick
		maskClick: {
			type: Boolean,
			default: true
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			ani: '',
			showPopup: false,
			callback: null,
			isIphoneX: false
		};
	},
	watch: {
		show(newValue) {
			if (newValue) {
				this.open();
			} else {
				this.close();
			}
		}
	},
	created() {
		this.isIphoneX = this.$util.uniappIsIPhoneX();
	},
	methods: {
		clear() {},
		open(callback) {
			if (callback) this.callback = callback;

			this.$emit('change', {
				show: true
			});
			this.showPopup = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.ani = 'uni-' + this.type;
				}, 30);
			});
		},
		close(type, callback) {
			if (!this.maskClick && type) return;
			this.$emit('change', {
				show: false
			});
			this.ani = '';
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPopup = false;
				}, 300);
			});

			if (callback) callback();

			if (this.callback) this.callback.call(this);
		}
	}
};
</script>
<style>
@charset "UTF-8";

.uni-popup {
	position: fixed;
	top: 0;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	overflow: hidden;
}

.uni-popup__mask {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 998;
	background: rgba(0, 0, 0, 0.4);
	opacity: 0;
}

.uni-popup__mask.ani {
	transition: all 0.3s;
}

.uni-popup__mask.uni-bottom,
.uni-popup__mask.uni-center,
.uni-popup__mask.uni-right,
.uni-popup__mask.uni-left,
.uni-popup__mask.uni-top {
	opacity: 1;
}

.uni-popup__wrapper {
	position: absolute;
	z-index: 999;
	box-sizing: border-box;
	//background: #ffffff;
}

.uni-popup__wrapper.ani {
	transition: all 0.3s;
}

.uni-popup__wrapper.top {
	top: 0;
	left: 0;
	width: 100%;
	transform: translateY(-100%);
}

.uni-popup__wrapper.bottom {
	bottom: 0;
	left: 0;
	width: 100%;
	transform: translateY(100%);
}

.uni-popup__wrapper.right {
	bottom: 0;
	left: 0;
	width: 100%;
	transform: translateX(100%);
}

.uni-popup__wrapper.left {
	bottom: 0;
	left: 0;
	width: 100%;
	transform: translateX(-100%);
}

.uni-popup__wrapper.center {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: scale(1.2);
	opacity: 0;
}

.uni-popup__wrapper-box {
	position: relative;
	box-sizing: border-box;
}

.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
	//background: #fff;
}
.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
	position: relative;
	max-width: 80%;
	max-height: 80%;
	overflow-y: scroll;
}

.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box,
.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box {
	width: 100%;
	max-height: 500px;
	overflow-y: scroll;
}

.uni-popup__wrapper.uni-bottom,
.uni-popup__wrapper.uni-top {
	transform: translateY(0);
}
.uni-popup__wrapper.uni-left,
.uni-popup__wrapper.uni-right {
	transform: translateX(0);
}

.uni-popup__wrapper.uni-center {
	transform: scale(1);
	opacity: 1;
}

/* isIphoneX系列手机底部安全距离 */
.bottom.safe-area {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
