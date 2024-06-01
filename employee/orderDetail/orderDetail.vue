<template>
  <view class="container">
    <!-- <view class="bg"></view> -->
    <view class="content">
      <view class="status" v-if="status=='待付款'">
        <view class="status-name">待支付 ¥{{orderDetail.saleamount}}</view>
        <view class="font-size-tag acea-row">支付剩余时间：
          <u-count-down :time="orderDetail.cancel_time*1000" format="HH:mm:ss"></u-count-down>
        </view>
      </view>
      <view class="status acea-row row-between row-middle" v-if="status=='待取车'">
        <view class="">
          <view class="status-name">待取车</view>
          <view class="font-size-tag">请在{{orderDetail.start_time}}前完成取车</view>
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
            <view>还车地址：{{orderDetail.songhuan_type=='自助取还'?storeInfo.address:orderDetail.address}}</view>
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
        <view class="row" style="justify-content: flex-start;">
          <text class="color-sub m-r-60">驾驶人</text>
          <view class="acea-row row-middle">{{orderDetail.driver_username}} <image src="../../static/user/vip.png" class="vip" v-if="orderDetail.userInfo.is_vip == '1'"></image></view>
        </view>
        <view class="row" style="justify-content: flex-start;">
          <text class="color-sub m-r-60">身份证</text>
          <view class="">{{orderDetail.drive_no | filterIdCard}}</view>
        </view>
        <view class="row" style="justify-content: flex-start;">
          <text class="color-sub m-r-60">手机号</text>
          <view class="acea-row row-middle">{{orderDetail.drive_mobile | filterMobile}} <image src="../../static/user/mobile.png" style="width: 32rpx;height: 32rpx;margin-left: 10rpx;" @click="callPhone()"></image></view>
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
            {{orderDetail.userInfo.is_auth == 0?'未实名':'已实名'}} 
          </view>
        </view>
        <view class="row">
          <text class="color-sub">下单时间</text>
          <view class="">{{orderDetail.createtime}}</view>
        </view>
        <view class="row">
          <text class="color-sub">合同编号</text>
          <view class="">{{orderDetail.hetong_code}}</view>
        </view>
      </view>
    
    
    <view class="mainBox" v-if="orderDetail.remark">
      <u--textarea v-model="orderDetail.remark" placeholder="添加备注" count maxlength="200" border="none"></u--textarea>
    </view>
    
    </view>
    <view class="dianzi"> </view>
    
    <view class="footer">
      <block v-if="status==1">
        <view class="cancel btn">取消续租</view>
        <view class="confirm btn">确认续租</view>
      </block>
      <block v-if="status=='待取车'">
        <view class="cancel btn" @click="checkCar('取车')">核验车辆</view>
        <view class="confirm btn" @click="openPop(1)">确认取车</view>
      </block>
      <block v-if="status=='租赁中'">
        <block v-if="orderDetail.is_xuzu == '是'">
          <view class="cancel btn" @click="confirmXuzu(4)">拒绝续租</view>
          <view class="confirm btn" @click="confirmXuzu(2)">确认续租</view>
        </block>
        <block v-else>
          <view class="cancel btn" @click="checkCar('还车')">核验车辆</view>
          <view class="confirm btn" @click="openPop(2)">确认收车</view>
        </block>
        
      </block>
    </view>
    
    <u-popup :show="show" @close="close"  mode="center" round="10">
      <view class="popDialog">
          <view class="pop_title">{{pop==1?'确定取车':'确定收车'}}</view>
          <view class="pop_content">
            <block v-if="pop == 1">
              请确认车辆送达客户预约地点，并确认客户身份<br>
            </block>
            <block v-else>
              请确认车辆无问题，仔细检查车辆状态
            </block>
          </view>
          <view class="pop_operation">
            <view class="btn btn_cancel" @click="cancel()">取消</view>
            <view class="btn btn_confirm" @click="confirm()">确认</view>
          </view>
      </view>
    </u-popup>
    
    <!-- 页面加载动画 -->
    <loading-cover ref="loadingCover"></loading-cover>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        flag: false,
        status: 2, //1待付款 2待取车 3候补 4租赁中 5已完成
        type: 1,
        show: false,
        pop: 1, //1确定送达 2确定收车
        orderDetail: '',
        storeInfo: '',  //门店信息
        timeData: {}
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
      this.id = option.id || 0;
      if(uni.getStorageSync('storeInfo')) this.storeInfo = uni.getStorageSync('storeInfo');
      //假如扫码进来,先判断有没有登录
      if(!uni.getStorageSync('token')) this.$util.redirectTo('/pages/login/login') 
      // 小程序扫码进入
      if (option.scene) {
        // let scene=id=1
      	var sceneParams = decodeURIComponent(option.scene);
      	sceneParams = sceneParams.split('=');
      	if (sceneParams.length) {
      		sceneParams.forEach(item => {
            //绑定待核销订单
      			if (item.indexOf('id') != -1) {
              this.$store.state.siteState = 2;
              this.id = sceneParams[1];
            }
      		});
      	}
      }
      
    },
    onShow() {
      if(this.id) this.getOrderDetail();
    },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      //复制订单编号
      copyText() {
        this.$util.copy(this.orderDetail.order_sn)
      },
      //续租操作--------------------
      //同意续租
      confirmXuzu(status) {
        this.$api.sendRequest({
          url: '/api/sale/Index/affirmOrder',
          data: {
            order_id: this.id,
            status: status
          },
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: '提交成功'});
              this.getOrderDetail()
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      //续租操作--------------------
      //核验车辆
      checkCar(type) {
        //判断身份权限
        var userInfo = uni.getStorageSync('userInfo') || '';
        if(this.orderDetail.return_id == userInfo.id || userInfo.group_id == 3) {
          if(this.orderDetail.order_checkaccept.length == 0) this.$util.redirectTo('/employee/examine/examine?id='+this.id+'&edit=' + 0 + '&type=' + type);
          else this.$util.redirectTo('/employee/examine/examine?id='+this.id+'&edit=' + 1 + '&type=' + type);
        }else {
          this.$util.showToast({title: '暂无权限'})
        }
      },
      openPop(index) {
        if(index == 2) {
          //判断身份权限
          var userInfo = uni.getStorageSync('userInfo') || '';
          if(this.orderDetail.return_id == userInfo.id || userInfo.group_id == 3) {
            this.show = true;
            this.pop = index;
          }else {
            this.$util.showToast({title: '暂无权限'})
          }
        }else {
          this.show = true;
          this.pop = index;
        }
      },
      cancel() {
        this.show = false;
      },
      confirm() {
        let url = '',tips = '';
        if(this.pop == 1) {
          url = "/api/sale/Index/submit_send";
          tips = "取车成功";
        }else {
          url = "/api/sale/Index/carReturn";
          tips = "还车成功";
        }
        this.$api.sendRequest({
          url: url,
          data: {id: this.id},
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: tips});
              this.show = false;
              this.getOrderDetail()
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      //订单详情
      getOrderDetail() {
        this.$api.sendRequest({
          url: '/api/sale/Index/orderDetails',
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
      callPhone() {
        uni.makePhoneCall({
          phoneNumber: this.orderDetail.drive_mobile
        })
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
  .vip {
    width: 44rpx;
    height: 28rpx;
    margin-left: 10rpx;
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
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
.dianzi {
  width: 100%;
  height: 120rpx;
}

// 弹窗
.popDialog {
  width: 638rpx;
  padding: 56rpx 40rpx 50rpx;
  text-align: center;
  box-sizing: border-box;
  .pop_title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
  }
  .pop_content {
    margin: 40rpx 66rpx;
    color: #656565;
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 264rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_cancel {
      border: 2rpx solid #E7E7E7;
      margin-right: 30rpx;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>
