<template>
  <view class="container">
    <!-- 搜索 -->
    <view class="search">
      <u-icon name="search" color="rgba(0,0,0,0.1)" size="20"></u-icon>
      <input type="text" placeholder="输入姓名、手机号" v-model="keyword" @confirm="confirmInput" placeholder-class="placeholder">
    </view>
    
    <!-- 两列 -->
    <view class="options acea-row row-between">
      <view class="options-item item1" @click="goTo('/employee/order/order')">
        <view class="item-scan">
           全部订单 
           <u-icon name="arrow-right" color="#fff" size="14"></u-icon>
        </view>
        <view class="num">{{dataCount.allorder}}</view>
      </view>
      <view class="options-item item2" @click="goTo('/employee/transferCar/transferCar')">
       <view class="item-scan">
          外调车辆 
          <u-icon name="arrow-right" color="#fff" size="14"></u-icon>
       </view>
       <view class="num">{{dataCount.allcars}}</view>
      </view>
    </view>
    
    <!-- tabs -->
    <view class="tabs">
      <u-tabs :list="tablist" @click="clickTabs" lineColor="#F5F6F9" :activeStyle="{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '36rpx'
        }" :scrollable="true" ></u-tabs>
    </view>
    
    <!-- 列表 -->
    <view class="main">
      <car-list v-for="(item,index) in list" :item="item"></car-list>
    </view>
    
    <!-- 底部tabBar -->
    <diy-bottom-nav type="shop"></diy-bottom-nav>
        
  </view>
</template>

<script>
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  import carList from '@/components/car-list/car-list.vue'
  export default {
    components: {
      carList,diyBottomNav
    },
    data() {
      return {
        keyword: '',
        tabsIndex: 0,
        tablist: [{
          name: '全部',
        },{
          name: '今日'
        }],
        dataCount: {
          allcars: 0,
          allorder: 0
        },
        list: [],
        page: 1,
        pageSize: 15,
        total: 1,
        today: ''
      }
    },
    onLoad() {
      uni.hideTabBar();
      let str = Number(new Date());
      this.today = uni.$u.timeFormat(str, 'yyyy-mm-dd');
      
      this.getOrderList();
      this.getDataCount();
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getOrderList();
    },
    onUnload() {
       this.$store.state.siteState = 1;
    },
    methods: {
      //搜索事件
      confirmInput(e) {
        this.keyword = e.detail.value;
        this.getOrderList(true)
      },
      //获取订单/外调车辆统计数据
      getDataCount() {
        this.$api.sendRequest({
          url: '/api/sale/Index/statistics',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.dataCount = Object.assign(this.dataCount,res.data);
              uni.setStorageSync('dataCount',this.dataCount)
            }
          }
        })
      },
      goTo(url) {
        this.$util.redirectTo(url)
      },
      //切换tabs
      clickTabs(e) {
        console.log(e)
        this.tabsIndex = e.index;
        this.getOrderList(true)
      },
      //获取订单列表
      getOrderList(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/sale/Index/myOrderList',
          data: {
            page: this.page,
            limit: this.pageSize,
            status: '',
            time: this.tabsIndex==0?'':this.today,
            keywords: this.keyword
          },
          success: res => {
            if(res.code == 1) {
              if(this.page == 1) this.list = res.data.data;
              else this.list = this.list.concat(res.data.data);
              this.total = res.data.last_page;
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
.options {
  margin: 0 32rpx 20rpx;
  .options-item {
    padding: 28rpx 20rpx;
    width: 328rpx;
    height: 174rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
  }
  .item-scan {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }
  .num {
    font-size: 48rpx;
    font-weight: 600;
    color: #FFFFFF;
  }
  .item1 {
    background: #1964FD;
  }
  .item2 {
    background: $color-title2;
  }
}
.tabs {
  margin: 0 32rpx 24rpx;
}
</style>
