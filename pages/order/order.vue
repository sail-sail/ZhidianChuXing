<template>
  <view class="container">
    
    <u-sticky bgColor="#fff">
      <view class="tabsCon">
        <u-tabs :list="tabs" :current="tabsIndex" @click="clickTab" 
        lineColor="#ffffff"
        :scrollable="true"
        :activeStyle="{
              color: '#00BC7E'
          }"
          :inactiveStyle="{
              color: 'rgba(0,0,0,0.4)'
          }"></u-tabs>
      </view>
    </u-sticky>
    
    <view class="order" v-for="(item,index) in list"  v-if="list.length">
      <view class="acea-row title title_2 row-between" v-if="item.status !== '候补中'">
        <block v-if="item.status == '租赁中'">
          <block v-if="item.is_xuzu == '是'">
            续租（{{item.xuzu.status}}）
          </block>
          <block v-else>
            {{item.status}}
          </block>
          <view class=""><i class="font-size-activity-tag">￥</i>{{item.is_xuzu=='是'?item.xuzu.money:item.saleamount}}</view>
        </block>
        <block v-else>
          {{item.status}} 
          <view class=""><i class="font-size-activity-tag">￥</i>{{item.saleamount}}</view>
        </block>
      </view>
      <view class="acea-row title  title_3 row-between" v-else>
        {{item.status}} 
        <view class="" v-if="item.status == '候补中'">未成功全额退款</view>
      </view>
      <view class="font-weight font-size-toolbar m-t-22" @click="goOrderDetail(item.id)">{{item.carMotorcycleInfo.motorcycle_name}}</view>
      <view class="orderCar" @click="goOrderDetail(item.id)">
        <view class="orderLine">
          <view class="lineItem">
            <i class="dot"></i>上海
            <text class="address" v-if="item.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
            <text class="address" v-else>{{item.address}}</text>
          </view>
          <view class="lineItem">
            <i class="dot dot2"></i>上海
           <text class="address" v-if="item.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
           <text class="address" v-else>{{item.address}}</text>
          </view>
        </view>
        <image :src="item.carMotorcycleInfo.image" mode="" class="carimg"></image>
      </view>
      <view class="orderTime">
        <text>{{item.start_time}}</text>
        <text style="text-align: center;"> —— {{item.day}}天 —— </text>
        <text style="text-align: right;">{{item.end_time}}</text>
      </view>
      <view class="operation" v-if="item.status == '待付款'">
        <view class="com-btn btn-border" @click.stop="cancelOrder(item.id)">取消订单</view>
        <view class="com-btn btn-main" @click.stop="goOrderDetail(item.id)">去付款</view>
      </view>
      <view class="operation" v-if="item.status == '候补中'">
        <view class="com-btn btn-border" @click.stop="cancelOrder(item.id)">取消订单</view>
        <view class="com-btn btn-main" @click.stop="openShow(item.id)">更换车辆</view>
      </view>
      <view class="operation" v-if="item.status == '待取车'">
        <view class="com-btn btn-border" @click.stop="cancelOrder(item.id)">取消订单</view>
        <view class="com-btn btn-main" @click.stop="goDestination(item)">取车地点</view>
      </view>
      <view class="operation" v-if="item.status == '租赁中'">
        <block v-if="item.is_xuzu == '是'">
          <view class="com-btn btn-main" @click.stop="payXuzu(item)" v-if="item.xuzu.status=='待支付'">待支付</view>
        </block>
        <block v-else>
          <view class="com-btn btn-main" @click.stop="openXuZu(item)" v-if="item.xuzu_status == '否'">续租</view>
        </block>
      </view>
      <view class="operation" v-if="item.status == '已完成'">
        <button class="com-btn btn-border" open-type="contact" style="padding: 0;margin: 0;">售后</button>
        <view class="com-btn btn-main" @click.stop="$util.redirectTo('/pages/category/category')">再次预定</view>
      </view>
    <!--  <view class="operation" v-if="i == 5">
        <view class="com-btn btn-main" @click.stop="$util.redirectTo('/pages/category/category')">再次预定</view>
      </view> -->
    </view>
    <!-- 空数据 -->
    <view class="" v-if="!list.length">
      <u-empty mode="order"></u-empty>
    </view>
    
    
    <!-- 底部tabBar -->
    <diy-bottom-nav type="shop"></diy-bottom-nav>
    
    <!-- 取消组件 -->
    <change-car :show="show" @close="close" @confirm="confirm"></change-car>
    <!-- 续租弹窗 -->
    <zu-pop :show="showZu" @close="closeZu" @confirm="confirmZu" :stock="stock" ></zu-pop>
    
    
  </view>
</template>

<script>
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  import zuPop from '@/components/zu-pop/zu-pop.vue'
  import changeCar from '@/components/change-car/change-car.vue'
  export default {
    components: {
      changeCar,zuPop,diyBottomNav
    },
    data() {
      return {
        show: false,
        showZu: false,
        tabsIndex: 0,
        tabs: [{
          name: '全部'
        },{
          name: '待付款'
        },{
          name: '候补中'
        },{
          name: '待取车'
        },{
          name: '租赁中'
        },{
          name: '已完成'
        }],
        list: [],
        car_id: 0,
        stock: 0,
        page: 1,
        pageSize: 15,
        total: 1,
        storeInfo: ''
      }
    },
    onLoad(option) {
      this.tabsIndex = option.tabsIndex || 0;
      console.log('888',this.tabsIndex)
      if(uni.getStorageSync('storeInfo')) this.storeInfo = uni.getStorageSync('storeInfo');
      uni.hideTabBar();
    },
    onShow() {
      if(uni.getStorageSync('token')) {
        this.getOrderList(true)
      }
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getOrderList();
    },
    methods: {
      //切换tab
      clickTab(e) {
        this.tabsIndex = e.index;
        this.getOrderList(true)
      },
      //更换车辆方法  start
      openShow(id) {
        this.car_id = id;
        this.show = true;
      },
      close() {
        this.show = false;
        this.cancelOrder(this.car_id)
      },
      confirm() {
        this.show = false;
        this.$util.redirectTo('/pages/category/category')
      },
      //更换车辆方法  end
      
      //续租
      openXuZu(item) {
        this.car_id = item.id;
        this.stock = item.stock;
        this.showZu = true;
      },
      //续租
      payXuzu(item) {
        this.$util.redirectTo('/otherpages/payOrder/payOrder?money='+item.xuzu.money+'&order_sn='+item.xuzu.order_sn+'&is_xuzu=1');
      },
      //导航取车地点
      goDestination(item) {
       let latitude = '',longitude = '',address = '';
       if(item.songhuan_type == '自助取还') {
         latitude = this.storeInfo.latitude;
         longitude = this.storeInfo.longitude;
         address = this.storeInfo.address;
       }else {
         latitude = item.lat;
         longitude = item.long;
         address = item.address;
       }
       uni.openLocation({
         latitude: parseFloat(latitude),
         longitude: parseFloat(longitude),
         address: address,
         success() {
           console.log('导航成功')
         }
       })
      },
      closeZu() {
        this.showZu = false;
      },
      confirmZu() {
        this.showZu = false;
        if(this.stock==0) {
          this.$util.redirectTo('/pages/category/category');
        }else {
          this.$util.redirectTo('/otherpages/order_xuzu/order_xuzu?id='+this.car_id)
        }
      },
      //取消订单
      cancelOrder(id) {
        this.$util.redirectTo('/otherpages/cancelOrder/cancelOrder?id='+id)
        this.tabsIndex = 0;
      },
      //订单详情
      goOrderDetail(id) {
        this.$util.redirectTo('/pages/orderDetail/orderDetail?id='+id)
      },
      //获取订单列表
      getOrderList(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/car/Order/myorder',
          data: {
            page: this.page,
            limit: this.pageSize,
            status: this.tabs[this.tabsIndex].name=='全部'?'':this.tabs[this.tabsIndex].name
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
.tabsCon {
  background-color: #fff;
  margin-bottom: 32rpx;
}
.order {
  margin: 0 28rpx 24rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  .title {
    font-size: $font-size-tag;
    padding-bottom: 22rpx;
    border-bottom: 2rpx solid #F1F1F1;
    view {
      display: flex;
      align-items: baseline;
      color: #FF622D;
      i {font-style: normal;color: #FF622D;}
    }
  }
  .title_2 {
    color: #FF622D;
    view {
      color: #FF622D;
      i {color: #FF622D;}
    }
  }
  .title_3 {
    color: $color-title2;
    view {
      color: #B3B3B3;
    }
  }
  .orderCar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .carimg {
      width: 160rpx;
      height: 136rpx;
    }
    .orderLine {
      .lineItem {
        display: flex;
        align-items: center;
        font-size: $font-size-tag;
        .dot {
          font-style: normal;
          width: 10rpx;
          height: 10rpx;
          background: #2A6EF1;
          margin-right: 10rpx;
          border-radius: 50%;
        }
        .dot2 {
          background: #00BC3D!important;
        }
        .address {
          margin-left: 40rpx;
        }
      }
    }
  }
  .orderTime {
    display: flex;
    font-size: $font-size-tag;
    color: rgba(0,0,0,0.4);
    margin: 16rpx 0 24rpx;
    text {flex: 1;}
  }
  .operation {
    display: flex;
    justify-content: flex-end;
    // padding-bottom: 30rpx;
    .com-btn {
      width: 160rpx;
      height: 58rpx;
      line-height: 58rpx;
      border-radius: 6rpx;
      text-align: center;
      margin-left: 32rpx;
      font-size: $font-size-sub;
    }
    .btn-border {
      border: 1rpx solid $color-title2;
      color: $color-title2;
    }
    .btn-main {
      background-color: $color-title2;
      color: #fff;
    }
    .btn-border-on {
      border: 1rpx solid $color-title;
      color: $color-title;
    }
  }
  
}
</style>
