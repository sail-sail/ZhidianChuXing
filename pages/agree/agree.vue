<template>
  <view class="container">
    <view class="goods-details">
    	<rich-text :nodes="detail" @click="showImg($event)" :data-nodes="detail"></rich-text>
    </view>
  </view>
</template>

<script>
  import htmlParser from '@/common/js/html-parser';
  export default {
    data() {
      return {
        detail: '',
		    type: 1,  //1隐私声明，2服务协议，3用户协议，4用户充值协议 5规则说明 6限行政策
      }
    },
    onLoad(e) {
	   var title = '';
	   if(e.type == 1) title = "隐私协议";
	   else if(e.type == 2) title = "服务协议";
	   else if(e.type == 3) title = "用户协议"
     else if(e.type == 4) title = "用户充值协议";
     else if(e.type == 5) title = "规则说明";
     else title = "限行政策";
	   this.type = e.type;
	   uni.setNavigationBarTitle({
	   	title: title
	   })
     this.getDetail();
    },
    methods: {
      // 获取商品详情
       getDetail() {
      	this.$api.sendRequest({
      		url: '/api/index.index/agreementDetail',
      		data: {
      			type: this.type,
      		},
          success: res => {
            if(res.code == 1) {
              let data = res.data;
              if (data.content) this.detail = htmlParser(data.content);
            }
          }
      	});
      	
      },
    }
  }
</script>

<style lang="scss" scoped>

.goods-details {
	font-size: 26rpx;
	color: #333;
	padding: 30rpx;
	 background-color: #fff;
}
</style>
