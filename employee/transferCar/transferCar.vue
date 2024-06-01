<template>
  <view class="container">
    <view class="title">
      <text class="font-size-toolbar font-weight">{{dataCount.allcars}}辆</text>
      <view class="acea-row row-middle" @click="show = true">筛选 <image src="../../static/user/screen.png" class="img"></image></view>
    </view>
    
    <view class="mainR">
      <view class="r-item" v-for="(item,index) in list" :key="index">
        <view class="acea-row goodsTop">
          <image :src="item.carMotorcycleInfo.image" mode="aspectFill" class="img"></image>
          <view class="info">
            <u--text :text="item.carMotorcycleInfo.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
            <view class="acea-row">
              <view v-for="(n,m) in item.carMotorcycleInfo.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==item.carMotorcycleInfo.home1_tags.length-1">｜</text></view>
            </view>
          </view>
        </view>
        <view class="acea-row m-t-14 m-b-26">
           <text class="label" v-for="(n,m) in item.carMotorcycleInfo.home2_tags">{{n}}</text>
        </view>
        <view class="goodsBot acea-row row-between row-middle" @click="goDetail(item)">
          <view class="font-size-tag color-sub acea-row row-middle"> 车辆详情
             <u-icon name="arrow-right" color="#D8D8D8" size="12"></u-icon>
          </view>
          <view class="price font-weight"><text class="font-size-activity-tag">¥</text>{{item.cost}} <text class="color-sub">/天</text></view>
        </view>
        <view class="person acea-row row-between">
          <text>销售员:{{item.username}}</text>
          <text class="color-sub">{{$util.timeStampTurnTime(item.createtime)}}</text>
        </view>
      </view>
    </view>
    
    <!-- 引入筛选组件 -->
    <transfer-car :show="show" @close="close" @confirm="confirm"></transfer-car>
    
  </view>
</template>

<script>
  import transferCar from '@/components/transfer-car/transfer-car.vue'
  export default {
    components: {
      transferCar
    },
    data() {
      return {
        show: false,
        list: [],
        brand_id: 0,
        page: 1,
        pageSize: 15,
        total: 1,
        dataCount: {
          allcars: 0,
          allorder: 0
        }
      }
    },
    onLoad() {
      if(uni.getStorageSync('dataCount')) this.dataCount = uni.getStorageSync('dataCount');
      this.getCarList()
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getCarList();
    },
    methods: {
      close() {
        this.show = false;
        this.brand_id = 0;
        this.getCarList(true);
      },
      confirm(e) {
        this.show = false;
        this.brand_id = e.id;
        this.getCarList(true);
      },
      //获取车辆列表
      getCarList(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/sale/Index/dispatch',
          data: {
            page: this.page,
            limit: this.pageSize,
            brand_id: this.brand_id
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
      goDetail(item) {
        this.$util.redirectTo('/pages/detail/detail?id='+item.id+'&user='+'sale')
      },
    }
  }
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28rpx 32rpx;
  .img {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }
}
 .mainR {
    margin: 0 32rpx;
    .r-item {
        padding: 20rpx 24rpx;
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;
        .goodsTop {
          position: relative;
          border-bottom: 2rpx solid #F5F5F5;
          padding-bottom: 24rpx;
          .img {
            width: 160rpx;
            height: 136rpx;
            border-radius: 10rpx;
            margin-right: 24rpx;
          }
          .info {
            flex: 1;
          }
        }
        .label {
          background: rgba(42,241,127,0.15);
          color: $color-title2;
          padding: 4rpx 8rpx;
          font-size: $font-size-activity-tag;
          margin-right: 16rpx;
        }
        .goodsBot {
          .price {
            color: #FF622D;
          }
        }
      .person {
        font-size: $font-size-sub;
        color: #323232;
        background: #F7F7F7;
        border-radius: 10rpx;
        padding: 18rpx 20rpx;
        margin-top: 20rpx;
      }
    }
  }
</style>
