<template>
  <view class="container">
    
   <view class="tongzhi" v-for="(item,index) in notice" :key="index" @click="goDetail(item.id)">
      <view class="font-size-toolbar font-weight">{{item.title}}</view>
      <view class="color-sub font-size-sub">{{item.createtime}}</view>
   </view>
     
  </view>
</template>

<script>
  export default {
    data() {
      return {
        notice: [],
      }
    },
    onLoad() {
      this.getBanner()
    },
    methods: {
      // 获取轮播图
      getBanner() {
        this.$api.sendRequest({
          url: '/api/index.index/bannerList',
          data: {},
          success: res => {
            if (res.code == 1) {
              this.notice = res.data.notice;
            }
          }
        })
      },
      goDetail(id) {
        this.$util.redirectTo('/otherpages/noticeDetail/noticeDetail?id='+id)
      },
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20rpx;
}
.tongzhi {
  margin: 0 20rpx 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
}
</style>
