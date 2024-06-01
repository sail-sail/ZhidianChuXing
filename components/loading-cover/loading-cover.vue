<template>
	<view class="loading-layer" v-show="isShow">
		<view class="loading-anim">
			<view class="box item"><view class="border out item color-base-border-top color-base-border-left"></view></view>
		</view>
	</view>
</template>

<script>
import nsLoading from '@/components/ns-loading/ns-loading.vue';
export default {
	name: 'loading-cover',
	data() {
		return {
			isShow: true
		};
	},
	components: {
		nsLoading
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
@keyframes spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
.loading-layer {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 997;
	background: #f8f8f8;
}

.loading-anim {
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translate(-50%, -50%);
}

.loading-anim > .item {
	position: relative;
	width: 35px;
	height: 35px;
	perspective: 800px;
	transform-style: preserve-3d;
	transition: all 0.2s ease-out;
}

.loading-anim .border {
	position: absolute;
	border-radius: 50%;
	border: 3px solid;
}

.loading-anim .out {
	top: 15%;
	left: 15%;
	width: 70%;
	height: 70%;
	// border-left-color: red !important;
	border-right-color: rgba($color: #000000, $alpha: 0) !important;
	// border-top-color: rgba($color: #000000, $alpha: 0) !important;
	border-bottom-color: rgba($color: #000000, $alpha: 0) !important;
	animation: spin 0.6s linear normal infinite;
}

.loading-anim .in {
	top: 25%;
	left: 25%;
	width: 50%;
	height: 50%;
	border-top-color: transparent !important;
	border-bottom-color: transparent !important;
	animation: spin 0.8s linear infinite;
}

.loading-anim .mid {
	top: 40%;
	left: 40%;
	width: 20%;
	height: 20%;
	border-left-color: transparent;
	border-right-color: transparent;
	animation: spin 0.6s linear infinite;
}
</style>
