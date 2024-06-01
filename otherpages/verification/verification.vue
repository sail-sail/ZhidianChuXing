<template>
  <view class="container">
    
    <view class="main">
      <view class="acea-row goodsTop row-middle">
        <image :src="orderDetail.carMotorcycleInfo.image" mode="aspectFill" class="img"></image>
        <view class="info">
          <u--text :text="orderDetail.carMotorcycleInfo.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
          <view class="acea-row">
            <view v-for="(n,m) in orderDetail.carMotorcycleInfo.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==orderDetail.carMotorcycleInfo.home1_tags.length-1">｜</text></view>
          </view>
        </view>
      </view>
      <view class="codeInfo">
        <image :src="code_img" mode="" class="code"></image>
        <view class="time">有效期限：{{orderDetail.end_time}}</view>
      </view>
      <view class="orderNo">
        订单号：{{orderDetail.order_sn}}
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        order_sn: 0,
        id: 0,
        status: 1, //1待付款 2待取车 3候补 4租赁中 5已完成
        orderDetail: '',
        code_img: '',
      }
    },
    onLoad(option) {
      this.order_sn = option.order_sn;
      this.id = option.id;
      this.getOrderDetail()
      this.getCode()
    },
    methods: {
      //获取取/还车码
      getCode() {
        this.$api.sendRequest({
          url: '/api/car/Order/get_unlimited',
          data: {
            id: this.id
          },
          success: res => {
            if(res.code == 1 && res.data) {
              this.code_img = res.data;
            }else {
              this.$util.showToast({title: res.msg})
            }
          }
        })
      },
      //订单详情
      getOrderDetail() {
        this.$api.sendRequest({
          url: '/api/car/Order/orderDetails',
          data: {id: this.id},
          success: res => {
            if(res.code == 1 && res.data) {
              this.orderDetail = res.data;
              this.status = res.data.status;
              //更改页面标题
              let title = '';
              if(this.status == '待取车') title = "取车码";
              if(this.status == '租赁中') title = "还车码";
              uni.setNavigationBarTitle({
                title: title
              })
            }
          }
        })
      },
    }
  }
</script>


<style lang="scss">
page {
  background-color: $color-title2;
}
.main {
  margin: 40rpx 28rpx;
  height: 876rpx;
  padding: 0 24rpx;
  background-image: url('@/static/bg.png');
  background-position: 100% 100%;
  background-size: contain;
  background-repeat: no-repeat;
  .goodsTop {
    border-bottom: 2rpx dashed #E4E4E4;
    padding: 50rpx 0 50rpx;
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
  .codeInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 38rpx 0 53rpx;
    border-bottom: 2rpx dashed #E4E4E4;
    .code {
      width: 336rpx;
      height: 336rpx;
    }
    .time {
      color: #B3B3B3;
      margin-top: 24rpx;
    }
  }
  .orderNo {
    font-size: $font-size-toolbar;
    color: #333333;
    padding-top: 40rpx;
    text-align: center;
  }
}
</style>
