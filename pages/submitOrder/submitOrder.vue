<template>
  <view class="container">
    <view class="bg"></view>
    <view class="main">
      <view class="tips">
        <view class="tips_l" @click="$util.redirectTo('/pages/agree/agree?type=6')">
          <image src="../../static/tips.png" mode=""></image>
          阅读<i>上海限行规则</i>，规避违章问题
        </view>
        <u-icon name="arrow-right" color="rgba(0,0,0,0.3)"></u-icon>
      </view>
      
      <view class="mainBox">
        <view class="acea-row goodsTop row-middle">
          <image :src="detail.image" mode="aspectFill" class="img"></image>
          <view class="info">
            <u--text :text="detail.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
            <view class="acea-row">
              <view v-for="(n,m) in detail.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==detail.home1_tags.length-1">｜</text></view>
            </view>
          </view>
          <!-- <view class="right">
            <u-icon name="arrow-right" size="14"></u-icon>
          </view> -->
        </view>
        <view class="journey">
          <text class="label">取车</text>
          <view class="journey_info">
            <view class="font-weight">{{pickupdate.startDate1}}（{{pickupdate.startDate | getDateWeek}}）{{pickupdate.startTime}}</view>
            <view class="font-size-tag">{{songhuan_type=="自助取还"?"自助取车":"商家上门取车"}} 
               <text class="color-sub m-l-24" v-if="songhuan_type=='自助取还'">{{storeInfo.address}}</text>
               <text class="color-sub m-l-24" v-else>{{location.address}}</text>
            </view>
          </view>
          <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
        </view>
        <view class="journey m-b-40">
          <text class="label label2">还车</text>
          <view class="journey_info">
            <view class="font-weight">{{pickupdate.endDate1}}（{{pickupdate.endDate | getDateWeek}}）{{pickupdate.endTime}}</view>
            <view class="font-size-tag">{{songhuan_type=="自助取还"?"自助取车":"商家上门取车"}} 
                <text class="color-sub m-l-24" v-if="songhuan_type=='自助取还'">{{storeInfo.address}}</text>
                <text class="color-sub m-l-24" v-else>{{location.address}}</text>
            </view>
          </view>
          <image src="../../static/map.png" mode="" class="mapImg" @click="goDestination()"></image>
        </view>
        <view class="acea-row row-between" style="align-items: baseline">
          <text class="font-size-toolbar font-weight m-b-20">取车方式</text>
          <view class="">
            <u-radio-group v-model="songhuan_type" >
              <view class="m-r-20"><u-radio shape="circle" label="上门送取" name="上门送取" labelColor="#000000" labelSize="12"></u-radio></view>
              <view><u-radio shape="circle" label="自助取还" labelColor="#000000" name="自助取还" labelSize="12"></u-radio></view>
            </u-radio-group>
          </view>
        </view>
        <view class="acea-row row-between" v-if="songhuan_type!=='自助取还'" style="align-items: baseline">
          <text class="font-size-toolbar font-weight m-b-20">用户地址</text>
          <view class="acea-row row-middle" @click="chooseLocation()">
            <text>{{location.address}}</text>
            <u-icon name="arrow-right" size="16"></u-icon>
          </view>
        </view>
        <view class="cancelTip">
          <image src="../../static/dunpai.png" mode=""></image>取车前2小时可免费取消
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20" >驾驶人相关信息</view>
        <view class="acea-row row-between row-middle" style="border-bottom: 2rpx solid #F5F5F5;" v-for="(item,index) in driverList" :key="index" v-if="driverList.length>0&&item.id == driver_id" @click="showDriver = true;">
          <view class="" style="flex: 1;">
            <view class="driveRow">
              <text class="color-sub">驾驶人</text>
              <view class="">{{item.name}}</view>
            </view>
            <view class="driveRow">
              <text class="color-sub">身份证</text>
              <view class="">{{item.no}}</view>
            </view>
            <view class="driveRow">
              <text class="color-sub">手机号</text>
              <view class="">{{item.mobile}}</view>
            </view>
          </view>
          <u-icon name="arrow-right" size="20"></u-icon>
        </view>
        <view class="acea-row row-center-wrapper font-weight color-title2" v-else  @click="showDriver = true;">选择驾驶人</view>
        <view class="color-sub font-size-tag m-t-22">
          车行要求无驾龄限制，驾照有效期1个月以上，凭驾驶员本人身份证+驾照（支持12123电子驾照）取车
        </view>
        <view class="color-sub font-size-tag m-b-16">
          下单后不可变更驾驶人，车辆不可转借给他人使用。
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">押金方式</view>
        <view class="acea-row row-middle row-between yajin" @click="changePay(0)">
          <view class="">
            <view class="font-weight">线上支付押金</view>
            <view class="time">描述描述支付方式描述</view>
          </view>
          <image :src="payRadio==0?'../../static/radio_on.png':'../../static/radio.png'" mode="" class="radio"></image>
        </view>
        <view class="table">
          <view class="table_item">
            <view class="table_item1">租车押金</view>
            <view class="table_item2">¥{{detail.zuche_deposit}} <text>可退</text></view>
          </view>
          <view class="table_item">
            <view class="table_item1">违章押金</view>
            <view class="table_item2">¥{{detail.weizhang_deposit}} <text>可退</text></view>
          </view>
        </view>
        <view class="acea-row row-middle row-between yajin" @click="changePay(1)">
          <view class="">
            <view class="font-weight">到店支付押金或获取免押</view>
            <view class="time">描述描述支付方式描述</view>
          </view>
          <image :src="payRadio==1?'../../static/radio_on.png':'../../static/radio.png'" mode="" class="radio"></image>
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">备注</view>
        <textarea placeholder="请填写备注信息" class="textArea" v-model="remark"></textarea>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">更多优惠</view>
        <view class="row acea-row row-between" v-if="!coupon.num">
          <view class="acea-row row-middle">优惠折扣 <text class="tag">惠</text></view>
          <view class="money acea-row row-middle">暂无可用优惠券<u-icon name="arrow-right"></u-icon></view>
        </view>
        <view class="row acea-row row-between" v-else @click="goChooseCoupon()">
          <view class="acea-row row-middle">优惠折扣 <text class="tag">惠</text></view>
          <view class="money acea-row row-middle" v-if="!coupon.coupon_id">可用{{coupon.num}}张优惠券<u-icon name="arrow-right"></u-icon></view>
          <view class="money acea-row row-middle" v-else>减 ¥ {{coupon.jian_zhe}}<u-icon name="arrow-right"></u-icon></view>
        </view>
        <view class="row acea-row row-between" v-if="score_money>0">
          <view>积分抵扣</view>
          <view class="money acea-row row-middle">减 ¥ {{score_money}}<u-icon name="arrow-right"></u-icon></view>
        </view>
        <view class="row acea-row row-between" v-else>
          <view>积分抵扣</view>
          <view class="acea-row row-middle color-sub font-size-tag">不可用</view>
        </view>
        <view class="color-sub font-size-tag">
          使用积分抵扣需满足如下条件：1.订单费用（不含增值服务费）大于等于500元；2.当前账户积分大于等于300分
        </view>
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">租车保障｜安心出行</view>
        <scroll-view class="service" :scroll-x="true">
          <view class="serviceItem" :class="secure_id==item.id?'serviceItem_active':''" v-for="(item,index) in secureList" @click="changeSecure(index,item)">
            <view class="font-weight item_title">{{item.guarantee_name}}</view>
            <view class="item_price">￥{{item.money}}/天
               <image :src="secure_id==item.id?'../../static/radio_on2.png':'../../static/radio.png'" class="radio2"></image>
            </view>
           <view class="serviceTips" v-for="(m,n) in item.guarantee_content" :key="n">
              <u-icon name="checkbox-mark" color="#00BC7E"></u-icon>
              <view class="">
                <view v-for="(i,k) in m">{{i}}</view>
              </view>
            </view>
          </view>
        </scroll-view> 
      </view>
      
      <view class="mainBox">
        <view class="font-size-toolbar font-weight m-b-20">预约中修改/取消规则</view>
        <view class="table">
          <view class="table_item">
            <view class="table_item3">修改/取消时间</view>
            <view class="table_item3">扣费标准</view>
          </view>
          <view class="table_item" style="background: rgba(0,188,126,0.05);">
            <view class="table_item3">取车前</view>
            <view class="table_item3 color-title2">免费取消</view>
          </view>
        </view>
      </view>
      
      <view class="mainBox" style="background-color: transparent;">
        <view class="font-size-tag font-weight m-b-20">租赁中修改规则</view>
        <view class="font-size-tag color-sub">
          当前暂不支持租赁中修改还车城市至西藏地区，具体以实际页面显示为准。所有订单租赁中修改还车城市，将按订单实际产生的车辆租赁费及门店服务费哦的30%-100%收取改签费，改签费会根据实际情况实时变动，具体金额以实际页面显示为准。
        </view>
      </view>
      
      <view class="mainBox" style="background-color: transparent;">
        <view class="font-size-tag font-weight m-b-20">燃油政策</view>
        <view class="font-size-tag color-sub">
          等量取还；取车时多少油，还车时至少需同样油位还车
        </view>
      </view>
      
      <view class="mainBox" style="background-color: transparent;">
        <view class="font-size-tag font-weight m-b-20">用车区域</view>
        <view class="font-size-tag color-sub">
          车辆不允许输入西藏自治区，新疆维吾厄自治区；<br>
          车辆不允许驶出上海市；<br>
          若要驶出上海市，需要与门店沟通，同意后方可驶出，若违反上述规则，门店可拒绝提供车辆和强制收回车辆。<br>
        </view>
      </view>
      
      <view class="agree">
        提交订单则表示您同意并接受
        <text @click="goAgree(5)">《规则说明》、</text>
        <text @click="goAgree(3)">《用户协议》</text>
      </view>
    </view>
    
    <view class="dianzi"></view>
    
    <!-- 底部 -->
    <view class="footer">
      <view class="money">总价： <i>￥{{settlement.saleamount}}</i></view>
      <view class="acea-row row-middle">
        <text class="font-weight color-title2 m-r-24" @click="showExpense = true">费用明细</text>
        <view class="confirm" @click="submitOrder()">提交订单</view>
      </view>
    </view>
    
    <!-- 积分抵扣组件 -->
    <coin-pop :show="show" @confirm="confirm" @close="close" :score_money="score_money"></coin-pop>
    <!-- 选择驾驶人组件 -->
    <choose-driver :show="showDriver" @confirm="confirm" @close="close" :list="driverList" :driverid="driver_id" @changeDriver="changeDriver"></choose-driver>
    <!-- 费用明细组件 -->
    <expense-detail :show="showExpense" @confirm="confirm" @close="close" :settle="settlement"></expense-detail>
    
    <!-- 页面加载动画 -->
    <loading-cover ref="loadingCover"></loading-cover>
    
  </view>
</template>

<script>
  import expenseDetail from '@/components/expense-detail/expense-detail.vue'
  import chooseDriver from '@/components/choose-driver/choose-driver.vue'
  import coinPop from '@/components/coin-pop/coin-pop.vue'
  export default {
    components: {
      coinPop,chooseDriver,expenseDetail
    },
    data() {
      return {
        show: false,
        showDriver: false,
        showExpense: false,
        payRadio: 0, //0线上支付 1线下支付
        secureIndex: '',
        secure_id: 0,
        insure: 0, //保障金额
        secureList: [],
        id: 0,
        detail: '',
        driverList: [],
        driver_id: 0,
        pickupdate: {
          startDate: '',
          endDate: '',
          startDate1: '',
          endDate1: '',
          startTime: '14:00',
          endTime: '14:00',
          dayNum: 1
        },
        location: '',
        storeInfo: '',  //门店信息
        score: 0,
        score_rate: 0,
        score_money: 0,
        remark: '',
        coupon: {
          num: 0,
          jian_zhe: 0,
          coupon_name: '',
          coupon_id: ''
        },
        settlement: {
          amount: 0,
          saleamount: 0,
          yuyuemoney: 0,
          zuche_deposit: 0,
          weizhang_deposit: 0,
          insure: 0,
          sever_money: 0,
          coupon_money: 0
        },
        songhuan_type: "自助取还", //可选 自助取还  上门送取
      }
    },
    filters: {
      getDateWeek(week) {
        const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const myDate = new Date(Date.parse(week))
        return weekDay[myDate.getDay()]
      }
    },
    onLoad(option) {
      this.id = option.id;
      if(uni.getStorageSync('pickupdate')) this.pickupdate = uni.getStorageSync('pickupdate');
      if(uni.getStorageSync('storeInfo')) this.storeInfo = uni.getStorageSync('storeInfo');
      if(uni.getStorageSync('coin_rate')) this.score_rate = uni.getStorageSync('coin_rate');
      this.getMemberInfo();
      this.getDetail()
      this.getCalacOrder()
      this.getAbleCoupon()
      this.getSecureService()
    },
    onShow() {
      if(uni.getStorageSync('coupon')) {
        let coupon = uni.getStorageSync('coupon');
        this.coupon = Object.assign(this.coupon,coupon);
        this.getCalacOrder()
      }
      if(uni.getStorageSync('location')) this.location = uni.getStorageSync('location');
      this.getDriverList()
    },
    onUnload() {
      uni.removeStorageSync('coupon');
    },
    methods: {
      chooseLocation() {
        this.$util.redirectTo('/otherpages/chooseAddress/chooseAddress');
      },
      //车辆详情
      getDetail() {
        this.$api.sendRequest({
          url: '/api/car/Index/cardateils',
          data: {id: this.id},
          success: res => {
            if(res.code >=1) {
              this.detail = res.data;
              if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
            }else {
              if (this.$refs.loadingCover) this.$refs.loadingCover.hide();
            }
          }
        })
      },
      //跳转协议
      goAgree(type) {
        this.$util.redirectTo('/pages/agree/agree?type='+type)
      },
      //获取用户信息
      getMemberInfo() {
      	this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
          data: {},
          success: res => {
            if(res.code >= 1) {
              this.score = res.data.score;
              uni.setStorageSync('userInfo', res.data);
              //计算可用积分数值
              let money = parseInt(this.score/this.score_rate);
              this.score_money = money;
            }
          }
      	});
      },
      //获取保障服务
      getSecureService() {
        this.$api.sendRequest({
          url: '/api/car/Index/guarantee',
          data: {},
          success: res => {
            if(res.code == 1 && res.data.length) {
              this.secureList = res.data;
            }
          }
        })
      },
      //选择优惠券
      goChooseCoupon() {
        let start_time = this.pickupdate.startDate + ' ' + this.pickupdate.startTime;
        let end_time = this.pickupdate.endDate + ' ' + this.pickupdate.endTime;
        var params = {
          start_time: start_time,
          end_time: end_time,
          motorcycle_id: this.id,
        }
        this.$util.redirectTo('/otherpages/useCoupon/useCoupon?params='+JSON.stringify(params))
      },
      //获取可用的优惠券
      getAbleCoupon() {
        let start_time = this.pickupdate.startDate + ' ' + this.pickupdate.startTime;
        let end_time = this.pickupdate.endDate + ' ' + this.pickupdate.endTime;
        this.$api.sendRequest({
          url: '/api/coupon/Index/chackCarcoupon',
          data: {
            start_time: start_time,
            end_time: end_time,
            motorcycle_id: this.id,
          },
          success: res => {
            if(res.code >=1) {
              if(res.data.length) {
               this.coupon.num = res.data.length;
               this.coupon.jian_zhe = res.data[0].jian_zhe;
               this.coupon.coupon_name = res.data[0].coupon_name;
               this.coupon.coupon_id = res.data[0].id;
               this.getCalacOrder();
              }else {
                this.initCoupon();
              }
            }
          }
        })
      },
      //初始化优惠券
      initCoupon() {
        this.coupon.num = 0;
        this.jian_zhe = 0;
        this.coupon_name = '';
        this.coupon_id = '';
      },
      //计算订单金额
      getCalacOrder() {
        let start_time = this.pickupdate.startDate + ' ' + this.pickupdate.startTime;
        let end_time = this.pickupdate.endDate + ' ' + this.pickupdate.endTime;
        this.$api.sendRequest({
          url: '/api/car/Order/settlement',
          data: {
            car_motorcycle_id: this.id,
            start_time: start_time,
            end_time: end_time,
            is_mianya: this.payRadio==0?"否":"是",
            coupon_users_id: this.coupon.coupon_id,
            score: 0,
            insure: this.secure_id?this.secureList[this.secureIndex].money:0,
            songhuan_type: this.songhuan_type
          },
          success: res => {
            if(res.code ==1) {
              this.settlement.amount = res.data.amount;
              this.settlement.yuyuemoney = res.data.yuyuemoney;
              this.settlement.zuche_deposit =  res.data.zuche_deposit;
              this.settlement.weizhang_deposit = res.data.weizhang_deposit;
              this.settlement.saleamount = res.data.saleamount;
              this.settlement.insure = res.data.insure;
              this.settlement.sever_money = res.data.sever_money;
              this.settlement.coupon_money = res.data.coupon_money;
            }else {
              this.$util.showToast({title: res.msg})
            }
          }
        })
      },
      //获取驾驶人列表
      getDriverList(id) {
        this.$api.sendRequest({
          url: '/api/index.user/driverList',
          data: {},
          success: res => {
            if(res.code >=1&&res.data.length) {
              this.driverList = res.data;
              if(id) this.driver_id = id;
              else this.driver_id = res.data[0].id;
            }
          }
        })
      },
      //改变驾驶人
      changeDriver(e) {
        this.getDriverList(e.id)
        this.showDriver = false;
      },
      confirm(e) {
        if(e.pop == "show"){
          this.show = false;
        }else {
          this.showExpense = false;
          this.submitOrder();
        }
      },
      close(e) {
       if(e.pop == "show"){
          this.show = false;
        }else {
          this.showExpense = false;
        }
      },
      changePay(index) {
        this.payRadio = index;
        this.getCalacOrder()
      },
      changeSecure(index,item) {
        if(item.id == this.secure_id) { //取消选择
          this.secureIndex = '';
          this.secure_id = 0;
          this.insure = 0;
        }else {
          this.secureIndex = index;
          this.secure_id = item.id;
          this.insure = this.secureList[this.secureIndex].money;
        }
        this.getCalacOrder()
      },
      //导航取车地点
      goDestination() {
        let latitude = '',longitude = '',address = '';
        if(this.songhuan_type == '自助取还') {
          latitude = this.storeInfo.latitude;
          longitude = this.storeInfo.longitude;
          address = this.storeInfo.address;
        }else {
          latitude = this.location.latitude;
          longitude = this.location.longitude;
          address = this.location.address;
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
      //提交订单
      submitOrder() {
        let start_time = this.pickupdate.startDate + ' ' + this.pickupdate.startTime;
        let end_time = this.pickupdate.endDate + ' ' + this.pickupdate.endTime;
        this.$api.sendRequest({
          url: '/api/car/Order/createOrder',
          data: {
            car_motorcycle_id: this.id,
            start_time: start_time,
            end_time: end_time,
            user_driver_id: this.driver_id,
            is_mianya: this.payRadio==0?"否":"是",
            coupon_users_id: this.coupon.num>0?this.coupon.coupon_id:0,
            score: this.score_money*100,
            long: this.location.longitude,
            lat: this.location.latitude,
            address: this.location.address,
            insure: this.secure_id?this.secureList[this.secureIndex].money:0,
            remark: this.remark,
            songhuan_type: this.songhuan_type
          },
          success: res => {
            if(res.code ==1 ) {
              let order_sn = res.data.order_sn;
              this.$util.redirectTo('/otherpages/payOrder/payOrder?money='+this.settlement.saleamount+'&order_sn='+order_sn);
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
.bg {
  width: 100%;
  height: 500rpx;
  background-color: $color-title2;
  border-radius: 0 0 50% 50%;
}
.main {
  margin-top: -460rpx;
}
.tips {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 12rpx;
  padding: 28rpx 20rpx;
  margin: 0 28rpx 24rpx;
  .tips_l {
    display: flex;
    align-items: center;
    color: rgba(0,0,0,0.5);
    font-size: $font-size-tag;
    image {
      width: 118rpx;
      height: 26rpx;
      margin-right: 32rpx;
    }
    i {
      font-style: normal;
      color: #FF0C12;
      font-size: $font-size-tag;
    }
  }
}
.mainBox {
  background: #FFFFFF;
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
  .textArea {
    height: 100rpx;
    background: #f5f5f5;
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
  }
}
.cancelTip {
  display: flex;
  align-items: center;
  color: $color-title2;
  font-size: $font-size-goods-tag;
  background: rgba(0,188,61,0.04);
  border-radius: 6rpx;
  padding: 16rpx 24rpx;
  image {
    width: 20rpx;
    height: 24rpx;
    margin-right: 16rpx;
  }
}
.row {
  margin-bottom: 20rpx;
  .tag {
    width: 28rpx;
    height: 28rpx;
    line-height: 28rpx;
    text-align: center;
    background: linear-gradient(180deg, #FF9F71 0%, #FF5300 100%);
    border-radius: 4rpx;
    font-size: $font-size-activity-tag;
    font-weight: 500;
    color: #FFFFFF;
    margin-left: 8rpx;
  }
  .money {
    color: #FF622D;
    font-weight: bold;
  }
}
.driveRow {
  display: flex;
  padding-bottom: 20rpx;
  text {
    margin-right: 64rpx;
  }
}
.time {
  font-size: $font-size-tag;
  color: #B2B2B2;
}
.yajin {
  margin-bottom: 20rpx;
  .radio {
    width: 36rpx;
    height: 36rpx;
  }
}
.table {
  border-radius: 16rpx;
  border: 2rpx solid rgba(0,0,0,0.07);
  margin-bottom: 48rpx;
  .table_item {
    display: flex;
    height: 88rpx;
    border-bottom: 2rpx solid rgba(0,0,0,0.07);
    &:last-child {
      border-bottom: none;
    }
    .table_item1 {
      width: 176rpx;
      text-align: center;
      line-height: 88rpx;
      border-right: 2rpx solid rgba(0,0,0,0.07);
      color: rgba(0,0,0,0.7);
    }
    .table_item2 {
      flex: 1;
      padding: 0 24rpx 0 38rpx;
      line-height: 88rpx;
      display: flex;
      justify-content: space-between;
      color: rgba(0,0,0,0.8);
      text{
        color: $color-title2;
        font-size: $font-size-tag;
      }
    }
    .table_item3 {
      width: 50%;
      line-height: 88rpx;
      box-sizing: border-box;
      text-align: center;
      border-right: 2rpx solid rgba(0,0,0,0.07);
      color: rgba(0,0,0,0.8);
      &:last-child {
        border-right: none;
      }
    }
  }
}
.service {
  display: flex;
  white-space: nowrap;
  .serviceItem {
    display: inline-table;
    width: 220rpx;
    height: 368rpx;
    background: rgba(42,204,241,0.05);
    border-radius: 10rpx;
    padding: 24rpx 0 20rpx;
    box-sizing: border-box;
    margin-right: 24rpx;
    .item_title {
      color: rgba(0,0,0,0.9);
      padding: 0 24rpx 10rpx;
    }
    .item_price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #FF622D;
      padding: 0 20rpx 10rpx 24rpx;
      .radio2 {
        width: 24rpx;
        height: 24rpx;
      }
    }
    .serviceTips {
      display: flex;
      align-items: baseline;
      padding: 0 12rpx;
      margin-bottom: 16rpx;
      view {
        font-size: $font-size-activity-tag;
        color: rgba(0,0,0,0.5);
        white-space: pre-line;
      }
      .red {
        color: #FF622D;
      }
    }
    
  }
  .serviceItem_active {
    background: rgba(0,188,126,0.05)!important;
    border: 2rpx solid #00BC7E;
  }
}
.agree {
  margin: 40rpx 28rpx 20rpx;
  font-size: $font-size-tag;
  color: rgba(0,0,0,0.8);
  text {
    color: #FF622D;
  }
}
.dianzi {
  width: 100%;
  height: 120rpx;
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 16rpx 28rpx;
  .money {
    display: flex;
    align-items: center;
    font-size: $font-size-tag;
    i {
      color: #FF622D;
      font-style: normal;
    }
  }
  .confirm {
    width: 220rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #00BC7E;
    border-radius: 40rpx;
    font-size: $font-size-toolbar;
    color: #FFFFFF;
  }
}
</style>
