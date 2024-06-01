<template>
  <view class="container">
    
    <!-- 搜索 -->
    <view class="search">
      <u-icon name="search" color="rgba(0,0,0,0.1)" size="20"></u-icon>
      <input type="text" placeholder="输入姓名、手机号" v-model="keyword" @confirm="confirmInput" placeholder-class="placeholder">
    </view>
    
    <view class="client" v-for="(item,index) in clientList" :key="index">
      <view class="user acea-row row-between row-middle">
        <view class="acea-row row-middle">
          <image :src="item.avatar" mode="" class="avatar"></image>
          <view class="">
            <view class="acea-row row-middle">{{item.nickname}} 
                <image src="../../static/user/vip.png" class="vip" v-if="item.is_vip == '1'"></image>
            </view>
            <view class="color-sub font-size-tag">{{item.mobile | filterMobile}}</view>
          </view>
        </view>
        <view class="record">已租{{item.order_count}}次</view>
      </view>
      <view class="join">
        <view class="color-sub acea-row row-middle"><i class="dot"></i>{{item.createtime}} 加入</view>
        <view class="color-sub font-size-tag acea-row row-middle">
          <image src="../../static/user/mobile.png" mode="" class="mobile" @click="callPhone(item.mobile)"></image>打电话
        </view>
      </view>
    </view>
    
    <view class="footer">
      <button type="primary" @click="$util.redirectTo('/employee/invite/invite')">邀请客户</button>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        clientList: [],
        page: 1,
        pageSize: 15,
        total: 1,
      }
    },
    filters: {
    	filterMobile(mobile) { 
        if(mobile) return mobile.substring(0, 3) + '****' + mobile.substring(7);
    		else return "";
    	}
    },
    onLoad() {
      this.getClient()
    },
    onReachBottom() {
      if(this.page > this.total) return;
      this.page++;
      this.getClient();
    },
    methods: {
      //搜索事件
      confirmInput(e) {
        this.keyword = e.detail.value;
        this.getClient(true)
      },
      //拨打电话
      callPhone(number) {
        uni.makePhoneCall({
          phoneNumber: number
        })
      },
      //获取客户列表
      getClient(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/index.user/clientList',
          data: {
            search: this.keyword,
            page: this.page,
            limit: this.pageSize,
          },
          success: res => {
            if(res.code == 1) {
              if(this.page == 1) this.clientList = res.data.list;
              else this.clientList = this.clientList.concat(res.data.list);
              this.total = res.data.page_count;
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    align-items: center;
    margin: 32rpx;
    padding: 0 32rpx;
    height: 64rpx;
    background: #fff;
    border-radius: 36rpx;
    input {
      margin-left: 10rpx;
      font-size: $font-size-tag;
    }
    .placeholder {
      font-size: $font-size-tag;
      color: #B4B4B4;
    }
  }
.client {
  margin: 0 32rpx 24rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  .user {
    .avatar {
      width: 80rpx;
      height: 80rpx;
      margin-right: 16rpx;
      border-radius: 50%;
    }
    .vip {
      width: 44rpx;
      height: 28rpx;
      margin-left: 16rpx;
    }
    .record {
      width: 136rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      background: #F5F5F5;
      border-radius: 14rpx;
      font-size: $font-size-tag;
      color: #9A9A9A;
    }
  }
  .join {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
    .dot {
      width: 16rpx;
      height: 16rpx;
      border: 2rpx solid #B3B3B3;
      margin-right: 16rpx;
      border-radius: 50%;
    }
    .mobile {
      width: 40rpx;
      height: 40rpx;
      margin-right: 16rpx;
    }
  }
}
.footer {
  position: fixed;
  bottom: 30rpx;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 32rpx 0;
  button {
    margin: 0;
    width: 686rpx;
    background: $color-title2;
    border-radius: 16rpx;
    color: #fff;
  }
}
</style>
