<template>
  <view class="container">
    
    <u-sticky bgColor="#fff">
      <view class="tabsCon">
        <u-tabs :list="tabs" @click="clickTab" 
        lineColor="#00BC7E"
        :scrollable="false"
        :activeStyle="{
              color: '#00BC7E'
          }"
          :inactiveStyle="{
              color: '#4C4C4C'
          }"></u-tabs>
      </view>
    </u-sticky>
    
    <view class="coupon acea-row" :class="tabsIndex !== 0?'coupon_disable':''" :style="{backgroundImage: 'url('+ backgroundImage + ')'}"  v-for="(item,index) in list">
          <view class="left">
            <view class="money"><i>￥</i>{{item.jian_zhe}}</view>
          </view>
          <view class="right acea-row row-middle row-between">
            <view class="" style="width: 71%;">
              <view class="font-weight-6 name">{{item.coupon_name}}</view>
              <view class="color-sub font-20 m-t-14">有效期{{item.begin_time}}至{{item.expire_time}}</view>
            </view>
            <view class="receive" v-if="tabsIndex==0">立即使用</view>
            <view class="receive" v-else>已使用</view>
          </view>
        </view>
        
  </view>
</template>

<script>
  export default {
    data() {
      return {
        backgroundImage: require('../../static/11.png'),
        list: [{},{}],
        tabs: [{
            name: '未使用',
        }, {
            name: '已使用',
        }, {
            name: '已过期'
        }],
        tabsIndex: 0,
        page: 1,
        pageSize: 20,
        total: 1,
      }
    },
    onLoad() {
      this.getList()
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getList()
    },
    methods: {
      clickTab(e) {
        this.tabsIndex = e.index;
        this.getList(true);
      },
      getList(refresh) {
        if(refresh) this.page = 1;
      	this.$api.sendRequest({
      		url: '/api/coupon/Index/mycoupon',
      		data: {
            is_used: this.tabs[this.tabsIndex].name,
      			page: this.page,
      			limit: this.pageSize
      		},
      		success: res => {
      			let newArr = [];
      			let msg = res.msg;
      			if (res.code == 1) {
      				newArr = res.data.data;
      			} else {
      				this.$util.showToast({
      					title: msg
      				});
      			}
      			//设置列表数据
      			if (this.page == 1) this.list = []; //如果是第一页需手动制空列表
      			this.list = this.list.concat(newArr); //追加新数据
            this.total = res.data.last_page;
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
.tabsCon {
  background-color: #fff;
  margin-bottom: 32rpx;
}
.coupon {
    height: 176rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 28rpx 24rpx;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 180rpx;
      margin: 16rpx 0;
      .money {
        display: flex;
        align-items: baseline;
        color: #FF9531;
        font-weight: 600;
        font-size: 45rpx;
        i {
          font-style: normal;
          font-size: $font-size-tag;
          color: #FF9531;
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 30rpx;
      padding-right: 30rpx;
    }
    .receive {
      width: 128rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      font-size: $font-size-tag;
      color: #fff;
      background: $color-title2;
      border-radius: 10rpx;
    }
  }
.coupon_disable {
  .money {
    color: #CCCCCC!important;
    i{color: #CCCCCC!important;}
  }
  .name {
    color: #CCCCCC;
  }
  .receive {
    background: #D9D9D9!important;
  }
}
</style>
