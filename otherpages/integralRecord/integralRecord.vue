<template>
  <view class="container">
    
    <view class="card acea-row row-middle row-between" v-for="(item,index) in list">
      <view class="user-info">
        <view class="">{{item.memo}}</view>
        <view class="color-sub font-size-tag">{{item.createtime}}</view>
      </view>
      <view class="money">{{item.money}}</view>
    </view>
    <loading-cover ref="loadingCover"></loading-cover>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        pageSize: 20,
        total: 1,
        list: [],
      }
    },
    onLoad() {
      this.getList()
    },
    onReachBottom() {
      if(this.page > this.total) return;
      this.page++;
      this.getList()
    },
    methods: {
      //获取商品列表
      getList(refresh) {
        if(refresh) this.page = 1;
      	this.$api.sendRequest({
      		url: '/api/index.user/userAccount',
      		data: {
      			type: 'score',
      			page: this.page,
      			number: this.pageSize
      		},
      		success: res => {
      			let newArr = [];
      			let msg = res.message;
      			if (res.code == 1 && res.data) {
      				newArr = res.data.list;
      			} else {
      				this.$util.showToast({
      					title: msg
      				});
      			}
      			//设置列表数据
      			if (this.page == 1) this.list = []; //如果是第一页需手动制空列表
      			this.list = this.list.concat(newArr); //追加新数据
            this.total = res.data.page_count;
      			if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
      		},
      		fail: res => {
      			if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
      		}
      	});
      },
    }
  }
</script>

<style lang="scss" scoped>
.card {
  padding: 24rpx 28rpx;
  background-color: #fff;
  margin-bottom: 16rpx;
  .money {
    font-size: $font-size-toolbar;
    color: #FF9531;
    font-weight: bold;
  }
}
</style>
