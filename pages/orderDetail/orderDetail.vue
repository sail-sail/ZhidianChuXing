<template>
  <view class="container">
    <!-- <view class="bg"></view> -->
    <view class="content">
      <view class="status" v-if="status=='待付款'">
        <view class="status-name">待支付 ¥{{orderDetail.saleamount}}</view>
        <view class="font-size-tag acea-row">支付剩余时间：<u-count-down :time="orderDetail.cancel_time*1000" format="HH:mm:ss"></u-count-down></view>
      </view>
     <view class="status acea-row row-between row-middle" v-if="status=='待取车'">
        <view class="">
          <view class="status-name">待取车</view>
          <view class="font-size-tag">请在{{orderDetail.start_time}}前完成取车</view>
        </view>
        <view class="seatCar" @click="goVerification()">
          取车码 <image src="../../static/ma.png" mode="" class="maImg"></image>
        </view>
      </view>
      <view class="status acea-row row-between row-middle" v-if="status=='租赁中'">
        <block v-if="orderDetail.is_xuzu == '是'">
          <view class="">
            <view class="status-name">续租中（{{orderDetail.xuzu.status}}）</view>
          </view>
        </block>
        <block v-else>
          <view class="">
            <view class="status-name">租赁中</view>
            <view class="font-size-tag acea-row">剩余用车时间：
               <u-count-down
                 :time="orderDetail.end_time1*1000"
                 format="DD:HH:mm:ss"
                 @change="onChange"
                >
                 <view class="time">
                     <text class="time__item">{{ timeData.days }}&nbsp;天</text>
                     <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
                     <text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
                     <text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
                 </view>
             </u-count-down>
            </view>
          </view>
        </block>
         <view class="seatCar" @click="goVerification()">
           还车码 <image src="../../static/ma.png" mode="" class="maImg"></image>
         </view>
       </view>
     <view class="status acea-row row-between row-middle" v-if="status=='候补中'">
        <view class="">
          <view class="status-name">候补中</view>
          <view class="font-size-tag">候补截止时间：2023年9月15时</view>
        </view>
        <image src="../../static/bu.png" mode="" class="buImg"></image>
      </view>
      <view class="status acea-row row-between row-middle" v-if="status=='已完成'">
        <view class="">
          <view class="status-name">已完成</view>
          <view class="font-size-tag">{{ $util.timeStampTurnTime(orderDetail.returntime)}}</view>
        </view>
      </view>
      <view class="mainBox">
        <view class="acea-row goodsTop row-middle">
          <image :src="orderDetail.carMotorcycleInfo.image" mode="aspectFill" class="img"></image>
          <view class="info">
            <u--text :text="orderDetail.carMotorcycleInfo.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
            <view class="acea-row">
              <view v-for="(n,m) in orderDetail.carMotorcycleInfo.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==orderDetail.carMotorcycleInfo.home1_tags.length-1">｜</text></view>
            </view>
          </view>
        </view>
        <block v-if="status !== '租赁中'">
          <view class="journey">
            <text class="label">取车</text>
            <view class="journey_info">
              <view class="font-weight">{{orderDetail.start_time}}</view>
              <view class="font-size-tag">
                {{orderDetail.songhuan_type=="自助取还"?"自助取车":"商家上门取车"}}  
                <text class="color-sub m-l-24" v-if="orderDetail.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
                <text class="color-sub m-l-24" v-else>{{orderDetail.address}}</text>
              </view>
            </view>
            <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
          </view>
          <view class="journey m-b-40">
            <text class="label label2">还车</text>
            <view class="journey_info">
              <view class="font-weight">{{orderDetail.end_time}}</view>
             <view class="font-size-tag">
               {{orderDetail.songhuan_type=="自助取还"?"自助取车":"商家上门取车"}}  
               <text class="color-sub m-l-24" v-if="orderDetail.songhuan_type=='自助取还'">{{storeInfo.address}}</text>
               <text class="color-sub m-l-24" v-else>{{orderDetail.address}}</text>
             </view>
            </view>
            <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
          </view>
         <!-- <view class="edit_addr">
            修改取还点<u-icon name="arrow-right" size="12"></u-icon>
          </view> -->
        </block>
        <block v-else>
          <view class="routeItem acea-row row-middle">
            <text class="lableName">已取车</text>{{orderDetail.start_time}} 
          </view>
          <view class="routeItem acea-row row-middle row-between">
            取车地址：{{orderDetail.songhuan_type=='自助取还'?storeInfo.address:orderDetail.address}} <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
          </view>
          <view class="routeItem">
            <block v-if="orderDetail.is_xuzu == '是'">
              <view class="acea-row row-middle"><text class="lableName lableName2">待还车</text>{{orderDetail.xuzu.end_time_text}} </view>
              <view class="time m-t-20">原还车时间 {{orderDetail.end_time}} </view>
            </block>
            <block v-else>
              <view class="acea-row row-middle"><text class="lableName lableName2">待还车</text>{{orderDetail.end_time}} </view>
            </block>
          </view>
          <view class="routeItem acea-row row-middle row-between">
            <view>还车地址：{{orderDetail.songhuan_type=='自助取还'?storeInfo.address:orderDetail.address}} <text class="blue" style="display: none;">修改</text></view>
            <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
          </view>
        </block>
        
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">费用</view>
        <view class="row" style="border-bottom: 2rpx solid #F6F6F6;">
          <text class="color-sub">订单费用</text>
          <view class="acea-row row-middle" @click="flag = !flag">
            ¥{{orderDetail.saleamount}} <text class="color-title2 m-l-24 m-r-8">明细</text>
            <u-icon :name="!flag?'arrow-down':'arrow-up'" size="12"></u-icon>
          </view>
        </view>
        <view class="orderBg" v-if="flag">
          <view class="row">
            <text class="color-sub">基本费用</text>
            <view class="acea-row row-middle">
              ¥{{orderDetail.yuyuemoney}}
            </view>
          </view>
          <view class="row">
            <text class="color-sub">基础保障服务</text>
            <view class="acea-row row-middle">
              ¥{{orderDetail.insure}}
            </view>
          </view>
          <view class="row">
            <text class="color-sub">上门取车服务费</text>
            <view class="acea-row row-middle">
              ¥{{orderDetail.sevser_money}}
            </view>
          </view>
          <view class="row" style="color: #FF622D;">
            <text class="">优惠券抵扣</text>
            <view class="acea-row row-middle" style="color: #FF622D;">
              -¥{{orderDetail.coupon_money}}
            </view>
          </view>
        </view>
        <block v-if="status!=4">
          <view class="row m-t-22">
            <view class="color-sub acea-row row-middle">车辆押金 
               <text class="label">{{orderDetail.is_mianya=='是'?'线下支付':'线上支付'}}</text>
            </view>
            <view class="acea-row row-middle">
              ¥{{orderDetail.zuche_deposit}} 
            </view>
          </view>
          <view class="row" style="border-bottom: 2rpx solid #F6F6F6;">
            <view class="color-sub acea-row row-middle">违章押金
              <text class="label">{{orderDetail.is_mianya=='是'?'线下支付':'线上支付'}}</text>
            </view>
            <view class="acea-row row-middle">
              ¥{{orderDetail.weizhang_deposit}} 
            </view>
          </view>
          <view class="row m-t-20">
            <text class="">总计</text>
            <view class="acea-row row-middle money">
              ¥{{orderDetail.saleamount}}
            </view>
          </view>
        </block>
        <block v-else>
          <view class="row" style="border-bottom: 2rpx solid #F6F6F6;">
            <view class="color-sub acea-row row-middle">车辆押金+违章押金
              <text class="label">{{orderDetail.is_mianya=='是'?'线下支付':'线上支付'}}</text>
            </view>
            <view class="acea-row row-middle">
              ¥3000 
            </view>
          </view>
          <view class="tips">
            还车后30天内确认有无车损及违章，退回押金 <br>
            预计于2023-12-01 08:00前退回
          </view>
        </block>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">驾驶人相关信息</view>
        <view class="row">
          <text class="color-sub">驾驶人</text>
          <view class="">{{orderDetail.driver_username}}</view>
        </view>
        <view class="row">
          <text class="color-sub">身份证</text>
          <view class="">{{orderDetail.drive_no | filterIdCard}}</view>
        </view>
        <view class="row">
          <text class="color-sub">手机号</text>
          <view class="">{{orderDetail.drive_mobile | filterMobile}}</view>
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">取车材料</view>
        <view class="rowIcon">
          <image src="../../static/icon1.png" mode=""></image>
          <view class="">
            <view class="font-weight">驾驶员本人身份证原件或电子身份证</view>
            <view class="color-sub font-size-tag">有效期2个月以上</view>
          </view>
        </view>
        <view class="rowIcon">
          <image src="../../static/icon2.png" mode=""></image>
          <view class="">
            <view class="font-weight">驾驶员本人驾驶证原件或电子驾照</view>
            <view class="color-sub font-size-tag">距初次领证日期大于半年且在有效期内</view>
          </view>
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">已选租车保障及服务</view>
        <view class="m-t-20">尊享保障 <text class="bao">平台提供</text></view>
        <view class="color-sub font-size-tag">
          全额损（豁免）（含轮胎、轮毂）<br>
          三者保障增至30万（限额）<br>
          需要承担车辆停运损失费
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">租车必读</view>
        <view class="font-size-tag">取消规则</view>
        <view class="table">
          <view class="row-title">
              <view class="color-sub row-title-name">取消时间</view>
              <view class="color-sub row-title-name">扣费标准</view>
          </view>
          <view class="row-table">
            <view class="row-table_rows">
              <view class="row-table_rows-col">2023-05-22 15:15:15前</view>
              <view class="row-table_rows-col">取车时间之前，免责取消</view>
            </view>
            <view class="row-table_rows">
              <view class="row-table_rows-col">2023-05-22 15:15:15后</view>
              <view class="row-table_rows-col">过了取车时间，收取订单金额100%的违约金</view>
            </view>  
          </view>
        </view>
        <view class="font-size-tag m-b-16">用车区域</view>
        <view class="color-sub font-size-tag">
          车辆不允许输入西藏自治区，新疆维吾厄自治区；<br>
          车辆不允许驶出上海市；<br>
          若要驶出上海市，需要与门店沟通，同意后方可驶出，若违反上述规则，门店可拒绝提供车辆和强制收回车辆。<br>
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">订单信息</view>
        <view class="row">
          <text class="color-sub">订单号</text>
          <view class="acea-row row-middle">
            {{orderDetail.order_sn}} 
            <u-tag text="复制" bgColor="rgba(255,83,0,0.1)" color="#FF5300" plain size="mini" borderColor="rgba(255,83,0,0.1)" @click="copyText"> </u-tag>
          </view>
        </view>
        <view class="row">
          <text class="color-sub">实名状态</text>
          <view class="acea-row row-middle">
            {{is_auth}} 
          </view>
        </view>
        <view class="row">
          <text class="color-sub">下单时间</text>
          <view class="">{{orderDetail.createtime}}</view>
        </view>
      </view>
    </view>
    
    <view class="dianzi"> </view>
    
    <view class="footer">
      <block v-if="status=='待付款'">
        <view class="cancel btn" @click="cancelOrder()">取消</view>
        <view class="confirm btn" @click="goPay()">立即支付</view>
      </block>
      <block v-if="status=='待取车'">
        <button type="primary" @click="cancelOrder()">取消订单</button>
      </block>
      <block v-if="status=='候补中'">
        <view class="cancel btn" @click="cancelOrder()">取消订单</view>
        <view class="confirm btn" @click="openShow()">更换车辆</view>
      </block>
      <block v-if="status=='租赁中'">
        <block v-if="orderDetail.is_xuzu == '是'">
          <button type="primary" @click="payXuzu()">{{orderDetail.xuzu.status}}</button>
        </block>
        <block v-else>
          <button type="primary" @click="openXuZu()" v-if="item.xuzu_status == '否'">续租</button>
        </block>
      </block>
      <block v-if="status=='已完成'">
        <button class="cancel btn" open-type="contact" style="padding: 0;margin: 0;">售后</button>
        <view class="confirm btn" @click="$util.redirectTo('/pages/category/category')">再次预定</view>
      </block>
    </view>
    
    <!-- 取消组件 -->
    <change-car :show="show" @close="close" @confirm="confirm"></change-car>
    <!-- 续租弹窗 -->
    <zu-pop :show="showZu" @close="closeZu" @confirm="confirmZu" :stock="orderDetail.stock" ></zu-pop>
    <!-- 页面加载动画 -->
    <loading-cover ref="loadingCover"></loading-cover>
    
  </view>
</template>

<script>
  import zuPop from '@/components/zu-pop/zu-pop.vue'
  import changeCar from '@/components/change-car/change-car.vue'
  export default {
    components: {
      changeCar,zuPop
    },
    data() {
      return {
        flag: false,
        status: 1, //1待付款 2待取车 3候补 4租赁中 5已完成
        id: 0,
        orderDetail: '',
        type: 1,
        show: false,
        showZu: false,
        storeInfo: '',  //门店信息
        timeData: {},
        is_auth: '未实名',
      }
    },
    filters: {
    	filterMobile(mobile) { 
        if(mobile) return mobile.substring(0, 3) + '****' + mobile.substring(7);
    		else return "";
    	},
      filterIdCard(no) {
        if(no) return no.substring(0, 6) + '********' + no.substring(14);
        else return "";
      }
    },
    onLoad(option) {
      this.id = option.id;
      this.is_auth = uni.getStorageSync('userInfo').is_auth == 0?'未实名':'已实名';
      if(uni.getStorageSync('storeInfo')) this.storeInfo = uni.getStorageSync('storeInfo');
    },
    onShow() {
      if(this.id) this.getOrderDetail()
    },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      //复制订单编号
      copyText() {
        this.$util.copy(this.orderDetail.order_sn)
      },
      //更换车辆方法  start
      openShow() {
        this.show = true;
      },
      close() {
        this.show = false;
        this.cancelOrder()
      },
      confirm() {
        this.show = false;
        this.$util.redirectTo('/pages/category/category')
      },
      //续租
      payXuzu() {
        this.$util.redirectTo('/otherpages/payOrder/payOrder?money='+this.orderDetail.xuzu.money+'&order_sn='+this.orderDetail.xuzu.order_sn+'&is_xuzu=1');
      },
      openXuZu() {
        this.showZu = true;
      },
      closeZu() {
        this.showZu = false;
      },
      confirmZu() {
        this.showZu = false;
        if(this.orderDetail.stock==0) {
          this.$util.redirectTo('/pages/category/category');
        }else {
          this.$util.redirectTo('/otherpages/order_xuzu/order_xuzu?id='+this.car_id)
        }
      },
      //取车码
      goVerification() {
        this.$util.redirectTo('/otherpages/verification/verification?order_sn='+this.orderDetail.order_sn+'&id='+this.orderDetail.id)
      },
      //取消订单
      cancelOrder() {
        this.$util.redirectTo('/otherpages/cancelOrder/cancelOrder?id='+this.id)
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
              let send_start = this.orderDetail.start_time1;
              let send_end = this.orderDetail.end_time1;
              this.orderDetail.end_time1 = this.$util.timeTurnTimeStamp(send_end)-this.$util.timeTurnTimeStamp(send_start);
              if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
            }else {
              if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
            }
          }
        })
      },
      //导航取车地点
      goDestination() {
        let latitude = '',longitude = '',address = '';
        if(this.orderDetail.songhuan_type == '自助取还') {
          latitude = this.storeInfo.latitude;
          longitude = this.storeInfo.longitude;
          address = this.storeInfo.address;
        }else {
          latitude = this.orderDetail.lat;
          longitude = this.orderDetail.long;
          address = this.orderDetail.address;
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
      //去支付
      goPay() {
        this.$util.redirectTo('/otherpages/payOrder/payOrder?money='+this.orderDetail.saleamount+'&order_sn='+this.orderDetail.order_sn);
      },
    }
  }
</script>

<style lang="scss" scoped>
/deep/ .u-count-down__text {
  color: #fff!important;
  font-size: 24rpx;
}
.time {
  @include flex;
  align-items: center;

  &__item {
       color: #fff;
       font-size: 12px;
       text-align: center;
   }
}
.content {
  width: 100%;
  min-height: 808rpx;
  background: linear-gradient(180deg, #00BC7E 0%, rgba(0,188,126,0) 100%);
}
.status {
  margin: 0 30rpx;
  padding: 20rpx 0;
  font-weight: 500;
  view {color: #fff;font-size: 40rpx;}
  .status-time {
    color: rgba(255,255,255,0.7);
    font-weight: normal;
  }
  .buImg {
    width: 60rpx;
    height: 60rpx;
  }
  .seatCar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 56rpx;
    font-weight: 500;
    color: #FFFFFF;
    background: rgba(0,0,0,0.1);
    border-radius: 10rpx;
    border: 1rpx solid;
    border-image: linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)) 1 1;
    font-size: $font-size-base;
    .maImg {
      width: 24rpx;
      height: 24rpx;
      margin-left: 12rpx;
    }
  }
}
.mainBox {
  background-color: #fff;
  border-radius: 20rpx;
  margin: 0 28rpx 24rpx;
  padding: 24rpx;
  .goodsTop {
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
      .right {
        margin-left: auto;
      }
    }
  }
  .mapImg {
    width: 32rpx;
    height: 32rpx;
  }
  .journey {
    display: flex;
    align-items: center;
    .label {
      width: 56rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      background: rgba(42,110,241,0.2);
      border-radius: 4rpx;
      font-size: $font-size-activity-tag;
      color: #2A6EF1;
    }
    .label2 {
      background: rgba(42,241,127,0.2);
      color: $color-title2;
    }
    .journey_info {
      flex: 1;
      margin-left: 24rpx;
      margin-top: 30rpx;
    }
  }
  .edit_addr {
    font-size: $font-size-tag;
    color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20rpx;
    border-top: 2rpx solid #F5F5F5;
  }
  .bao {
    font-size: $font-size-activity-tag;
    font-weight: 300;
    color: rgba(0,0,0,0.8);
    padding: 2rpx 8rpx;
    border-radius: 4rpx;
    border: 1px solid #D6D6D6;
    margin-left: 16rpx;
  }
}
.routeItem {
  padding: 34rpx 0;
  border-bottom: 2rpx solid #F6F6F6;
  font-weight: 500;
  color: rgba(0,0,0,0.8);
  &:last-child {
    border-bottom: none;
  }
  .lableName {
   width: 76rpx;
   height: 32rpx;
   line-height: 32rpx;
   text-align: center;
   background: rgba(0,0,0,0.06);
   border-radius: 4rpx;
   color: rgba(0,0,0,0.4);
   font-size: $font-size-activity-tag;
   margin-right: 20rpx;
  }
  .lableName2 {
    background: rgba(42,241,127,0.2)!important;
    color: $color-title2!important;
  }
  .time {
    font-size: $font-size-tag;
    color: #9A9A9A;
  }
  .blue {
    color: #2A6EF1;
    font-size: $font-size-tag;
    margin-left: 24rpx;
  }
}
.tips {
  background: #F6FAF9;
  border-radius: 20rpx;
  padding: 24rpx;
  color: rgba(0,0,0,0.4);
  font-size: $font-size-tag;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20rpx;
  .label {
    width: 96rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    background: rgba(42,241,127,0.2);
    border-radius: 4rpx;
    color: $color-title2;
    font-size: $font-size-activity-tag;
    margin-left: 20rpx;
  }
  .money {
    color: #FF622D;
  }
}
.orderBg {
  background: #F6FAF9;
  border-radius: 20rpx;
  padding: 10rpx 24rpx;
}
.rowIcon {
  display: flex;
  align-items: center;
  image {
    width: 40rpx;
    height: 40rpx;
    margin-right: 16rpx;
  }
}
.table {
  border-radius: 10rpx;
  border: 2rpx solid #E7E7E7;
  margin: 16rpx 0 32rpx;
  .row-title {
     display: flex;
      height: 80rpx;
      background: #F4F6F9;
      border-bottom: 1rpx solid #E7E7E7;
      color: rgba(0,0,0,0.4);
      font-size: $font-size-tag;
      .row-title-name {
        width: 50%;
        line-height: 80rpx;
        text-align: center;
        border-right: 1rpx solid #E7E7E7;
        &:last-child {
          border-right: none;
        }
    }
  }
  .row-table_rows {
    display: flex;
    height: 120rpx;
    border-bottom: 1rpx solid #E7E7E7;
    box-sizing: border-box;
    &:last-child {
      border-bottom: none;
      border-right: none;
    }
    .row-table_rows-col {
      padding: 12rpx 44rpx 12rpx 36rpx;
      width: 50%;
      text-align: center;
      color: rgba(0,0,0,0.8);
      font-size: $font-size-tag;
      border-right: 1rpx solid #E7E7E7;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.footer {
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 16rpx 28rpx;
  .btn {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 8rpx;
    font-size: $font-size-toolbar;
  }
  .cancel {
    width: 240rpx;
    background: #F0F2F6;
    color: rgba(0,0,0,0.5);
  }
  .confirm {
    width: 430rpx;
    background: #00BC7E;
    color: #fff;
  }
  button {
    width: 100%;
    background: rgba(0,188,126,0.15);
    border-radius: 8rpx;
    color: $color-title2;
  }
}
.dianzi {
  width: 100%;
  height: 120rpx;
}
</style>
