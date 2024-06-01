export default {
	data() {
		return {
			showTop: false,
			scrollTop: 0,
			oldLocation: 0
		}
	},
	methods: {
		scrollToTopNative() {
			uni.pageScrollTo({
				duration: 200,
				scrollTop: 0
			});
		}
	},
	onReachBottom() {
		if(this.$refs.goodrecommend) this.$refs.goodrecommend.getLikeList(10)
	},
	onPageScroll(e) {
		this.oldLocation = e.scrollTop;
		if (e.scrollTop > 400) {
			this.showTop = true;
		} else {
			this.showTop = false;
		}
	}
}
