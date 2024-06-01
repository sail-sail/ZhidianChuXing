<template>
  <view class="container">
    <view class="main">
      <u--text :text="detail.title" :bold="true" size="32rpx" align="center"></u--text>
      <u--text :text="detail.createtime"  size="24rpx" align="center" color="#999999" margin="20rpx 0 20rpx 0"></u--text>
      <view class="goods-details">
      	<rich-text :nodes="content" @click="showImg($event)" :data-nodes="content"></rich-text>
      </view>
    </view>
  </view>
</template>

<script>
  import htmlParser from '@/common/js/html-parser';
  export default {
    data() {
      return {
        content: '',
        id: '',
        detail: ''
      }
    },
    onLoad(option) {
      this.id = option.id;
      this.getDetail();
    },
    methods: {
      // 获取商品详情
       getDetail() {
      	this.$api.sendRequest({
      		url: '/api/index.index/noticeDetail',
      		data: {
      			id: this.id,
      		},
          success: res => {
            if(res.code == 1) {
              let data = res.data;
              this.detail = res.data;
              if (data.content) this.content = htmlParser(data.content);
            }
          }
      	});
      	
      },
    }
  }
</script>

<style lang="scss">
.main {
  background-color: #fff;
  margin: 20rpx;
  border-radius: 10rpx;
  padding: 30rpx 20rpx;
}
</style>
