<template>
  <view class="container">

    <view class="banner">
      <view class="swiper-box">
        <u-swiper :list="banner" keyName="image" :autoplay="false" circular height="194" radius="0" imgMode="scaleToFill"></u-swiper>
      </view>
    </view> 

    <view class="boxCon">
      <view class="timeCon" @click="goTo('/pages/category/category')">
        <view class="acea-row row-middle font-size-toolbar" ><text>{{pickupdate.startDate}} {{pickupdate.startTime}}</text> <text class="line"></text> <text>{{pickupdate.endDate}} {{pickupdate.endTime}}</text></view>
      </view>
      <view class="box-option acea-row">
        <view class="optionItem">
          <view class="color-sub font-size-tag m-b-10">送车城市</view>
          <view class="font-size-toolbar color-sub font-weight">上海</view>
        </view>
        <view class="optionItem" @click="goTo('/otherpages/chooseAddress/chooseAddress')">
          <view class="acea-row row-middle color-sub font-size-tag m-b-10">送车地点 <u-icon name="arrow-down-fill"
              color="#D8D8D8" size="12"></u-icon>
          </view>
          <view class="font-size-toolbar font-weight">{{address}}</view>
        </view>
      </view>
      <view class="xuan">
        <button type="primary" @click="goTo('/pages/category/category')">去选车</button>
      </view>
      <view class="font-size-tag color-sub m-t-24">上门送取 ¥{{serviceFee}}</view>
    </view>

    <!-- 当前行程 -->
    <view class="journeyCon" v-if="orderlist.length">
      <view class="font-size-toolbar font-weight m-b-24">您当前的行程</view>
      <view class="goods" v-for="(item,index) in orderlist" :key="index" v-if="index<1">
        <view class="acea-row"  @click="goOrderDetail(item)">
          <image :src="item.carMotorcycleInfo.image" mode="aspectFill" class="img"></image>
          <view class="info">
            <u--text :text="item.carMotorcycleInfo.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
            <view class="acea-row row-middle font-size-activity-tag font-weight">
              <text class="status">还车</text>
              {{item.end_time}}
            </view>
            <view class="color-sub font-size-tag">还车方式：自行前往门店还车</view>
            <view class="color-sub font-size-tag">还车地址：{{item.address}}</view>
          </view>
        </view>
        <view class="acea-row goodsBtn row-between m-t-20">
          <view class="navigator font-weight-5" @click.stop="goDestination(item)">
            <image src="../../static/navigator.png" class="icon"></image>导航
          </view>
          <view class="rent" @click.stop="goOrderDetail(item)">一键续租</view>
        </view>
      </view>
    </view>

    <!-- 公告通知 -->
    <view class="notice" @click="goTo('/otherpages/noticeList/noticeList')">
      <image src="../../static/notice.png" mode="" class="txt-img"></image>
      <view class="notice-con" style="flex: 1;">
        <view class="notice-right acea-row row-middle row-between">
          <view class="main-wrap">
            <view class="uni-swiper-msg">
              <swiper vertical="true" autoplay="true" circular="true" @change="change">
           			  <swiper-item v-for="(item, index) in notice" :key="index" @touchmove.stop v-if="index<4">
                  <text  class="beyond-hiding">
                    {{ item.title }}
            				  </text>
                </swiper-item>
              </swiper>
            </view>
          </view>
          <u-icon name="arrow-right" color="#D8D8D8"></u-icon>
        </view>
      </view>
    </view>

    <view class="advertiseCon">
      <image src="../../static/1.png" mode="" class="vip" @click="goToVip()"></image>
      <view class="options acea-row row-between">
        <view class="options-item item1" @click="goToForm('/otherpages/becomeCompany/becomeCompany')">
          <view class="font-weight font-size-toolbar color1">企业用车</view>
          <view class="font-size-tag">一分钟教你租还车</view>
          <view class="item-scan">查看详情 
             <u-icon name="arrow-right" color="#D8D8D8" size="12"></u-icon>
          </view>
          <image src="../../static/2.png" mode="" class="imgs"></image>
        </view>
        <view class="options-item item2" @click="goToForm('/otherpages/becomeCarOwner/becomeCarOwner')">
          <view class="font-weight font-size-toolbar color2">成为车主</view>
          <view class="font-size-tag">成为车主轻松赚钱</view>
          <view class="item-scan">查看详情 
              <u-icon name="arrow-right" color="#D8D8D8"  size="12"></u-icon>
          </view>
          <image src="../../static/3.png" mode="" class="imgs"></image>
        </view>
      </view>
    </view>
    
    <!-- 车型列表 -->
    <view class="goodsCon">
      <view class="goodsTitle acea-row row-between">
        <text class="font-weight font-size-toolbar">特价车辆</text>
        <view class="acea-row row-middle color-sub font-size-tag" @click="$util.redirectTo('/pages/category/category')">更多车型 <u-icon name="arrow-right" color="#D8D8D8"></u-icon></view>
      </view>
      <view class="goodsCard">
        <view class="goods" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
          <view class="acea-row goodsTop">
            <image :src="item.image" mode="aspectFit" class="img"></image>
            <view class="info">
              <u--text :text="item.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
              <view class="acea-row">
                <view v-for="(n,m) in item.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==item.home1_tags.length-1">｜</text></view>
              </view>
            </view>
          </view>
          <view class="acea-row m-t-14 m-b-26">
             <text class="label" v-for="(n,m) in item.home2_tags">{{n}}</text>
          </view>
          <view class="goodsBot acea-row row-between row-middle" >
            <view class="font-size-tag color-sub acea-row row-middle"> 车辆详情
               <u-icon name="arrow-right" color="#D8D8D8" size="12"></u-icon>
            </view>
            <view class="price font-weight"><text class="font-size-activity-tag">¥</text>{{item.price}} <text class="color-sub">/天</text></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 客服浮窗 可拖动-->
    <movable-area class="movableArea">
      <movable-view  direction="all"  class="movableView" x="600rpx" y="800rpx">
        <button class="kefu" open-type="contact">
          <image src="../../static/kefu.png" mode="" class=""></image>
          客服
        </button>
      </movable-view>
    </movable-area>
    
    
    <!-- 优惠券弹窗 -->
    <coupon-dialog :show="show" @close="close" :coupon="coupon" :total="totalMoney" @receive="receiveCoupon"></coupon-dialog>
    
    <!-- 底部tabBar -->
    <diy-bottom-nav type="shop"></diy-bottom-nav>

  </view>
</template>

<script>
  import location from '@/common/js/getLocation.js'
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  import couponDialog from '@/components/coupon-dialog/coupon-dialog.vue'
  export default {
    components: {
      couponDialog,diyBottomNav
    },
    mixins: [location],
    data() {
      return {
        banner: [],
        notice: [],
        show: true,
        list: [],
        coupon: [],
        serviceFee: 0,
        totalMoney: 0,
        page: 1,
        pageSize: 15,
        total: 1,
        orderlist: [],
        pickupdate: {
          startDate: '',
          endDate: '',
          startDate1: '',
          endDate1: '',
          startTime: '14:00',
          endTime: '14:00',
          dayNum: 2
        },
        //拖动
        old: {
          x: 0,
          y: 0,
        }
      }
    },
    onLoad(data) {
      uni.hideTabBar();
      this.getBanner()
      this.getDateTime();
      // 分享进入
      if (data.saleid) uni.setStorageSync('saleid', data.saleid);
      
      // 小程序扫码进入
      if (data.scene) {
        // let scene=saleid=1
      	var sceneParams = decodeURIComponent(data.scene);
      	sceneParams = sceneParams.split('=');
      	if (sceneParams.length) {
      		sceneParams.forEach(item => {
            //绑定销售
      			if (item.indexOf('saleid') != -1) {
              uni.setStorageSync('saleid', sceneParams[1]);
              //判断是否登录
              if(uni.getStorageSync('token')) this.bindSale(sceneParams[1]);
            }
      		});
      	}
      }
     
      
      this.getNewCoupon()
      this.getCarList()
      this.getServiceFee()
      this.getCoinRate()
      this.getStore()
    },
    onShow() {
      if(uni.getStorageSync('saleid')) {
        this.bindSale(uni.getStorageSync('saleid'));
      }
      if(uni.getStorageSync('userInfo')) {
        this.getOrderList();
        if(uni.getStorageSync('userInfo').is_new == '否') this.show = false;
      }
      
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getCarList()
    },
    onShareAppMessage() {
      
    },
    methods: {
      goToForm(url) {
        if(!uni.getStorageSync('token')) {
        uni.showModal({
            title: '请登录',
            success(res) {
              if(res.confirm) {
                that.$util.redirectTo('/pages/login/login')
              }else {}
            }
          })
        }else {
          this.$util.redirectTo(url);
        }
      },
      onChange: function(e) {
          this.old.x = e.detail.x
          this.old.y = e.detail.y
      },
      //绑定销售
      bindSale(sale_id) {
        this.$api.sendRequest({
          url: '/api/index.user/bindSale',
          data: {
            id: sale_id
          },
          success: res => {
            if(res.code == 1) {
              console.log('绑定成功')
            }
          }
        })
      },
      //订单详情
      goOrderDetail(item) {
        this.$util.redirectTo('/pages/orderDetail/orderDetail?id='+item.id)
      },
      //导航取车地点
      goDestination(item) {
        uni.openLocation({
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.long),
          success() {
            console.log('导航成功')
          }
        })
      },
      // 获取轮播图
      getBanner() {
        this.$api.sendRequest({
          url: '/api/index.index/bannerList',
          data: {},
          success: res => {
            if (res.code == 1) {
              if(res.data.banner) {
                let banner = res.data.banner;
                banner.forEach((v,k) => {
                  v.image = this.$util.img(v.image);
                })
                this.banner = banner;
              }
              this.notice = res.data.notice;
            }
          }
        })
      },
      //获取商家门店信息
      getStore() {
        this.$api.sendRequest({
          url: '/api/index.index/storeList',
          data: {},
          success: res => {
            if (res.code == 1 && res.data) {
              uni.setStorageSync('storeInfo',res.data);
            }
          }
        })
      },
      //获取积分兑换比例
      getCoinRate() {
        this.$api.sendRequest({
          url: '/api/car/Order/score_money',
          data: {},
          success: res => {
            if(res.code >=1 && res.data) {
              uni.setStorageSync('coin_rate',res.data);
            }
          }
        })
      },
      //获取服务费
      getServiceFee() {
        this.$api.sendRequest({
          url: '/api/car/Index/sever_money',
          data: {},
          success: res => {
            if(res.code == 1) {
              this.serviceFee = res.data;
              uni.setStorageSync('serviceFee',res.data);
            }
          }
        })
      },
      //获取订单列表
      getOrderList() {
        this.$api.sendRequest({
          url: '/api/car/Order/myorder',
          data: {
            page: 1,
            limit: 3,
            status: '租赁中'
          },
          success: res => {
            if(res.code == 1) {
              this.orderlist = res.data.data;
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      //获取特价车辆
      getCarList() {
        this.$api.sendRequest({
          url: '/api/car/Index/motorcycle',
          data: {
            page: this.page,
            limit: this.pageSize,
            is_recommend: "是",
            songhuan_type: ''
          },
          success: res => {
            if (res.code == 1) {
              //设置列表数据
              if (this.page == 1) this.list = res.data.data; //如果是第一页需手动制空列表
              else this.list = this.list.concat(res.data.data); //追加新数据
              this.total = res.data.last_page;
            }
          }
        })
      },
      goDetail(item) {
        this.$util.redirectTo('/pages/detail/detail?id='+item.id)
      },
      //获取新人优惠券
      getNewCoupon() {
        this.$api.sendRequest({
          url: '/api/coupon/Index/newercoupon',
          data: {},
          success: res => {
            if(res.code >= 1) {
              this.totalMoney = res.data.amount;
              this.coupon = res.data.newercoupon;
            }
          }
        })
      },
      //领取优惠券
      receiveCoupon() {
        if(!uni.getStorageSync('token')) {
          this.show = false;
          this.$util.redirectTo('/pages/login/login')
        }else {
          this.$api.sendRequest({
            url: '/api/coupon/Index/newerReceiveCoupon',
            data: {},
            success: res => {
              if(res.code ==1) {
                this.show = false;
                this.getMemberInfo()
              }
            }
          })
        }
      },
      //获取用户信息
      getMemberInfo() {
      	this.$api.sendRequest({
      		url: '/api/index.user/userInfo',
          data: {},
          success: res => {
            if(res.code >= 1) {
              uni.setStorageSync('userInfo', res.data);
            }
          }
      	});
      },
      //-----------------------------默认日期显示--------------------------
      getDateTime() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month < 10 ? '0' + month : month
        // 计算开始日期
        day = day < 10 ? '0' + day : day;   //今天
        // 计算结束日期
        let day2 = this.getago(date,2);   //后天
        
        let startDate = `${year}-${month}-${day}`;
        let endDate = day2.date;
        
        this.pickupdate.startDate = startDate;
        this.pickupdate.endDate = endDate;
        this.pickupdate.startDate1 = `${month}月${day}日`;
        this.pickupdate.endDate1 = day2.date2;
        
        uni.setStorageSync('pickupdate',this.pickupdate)
        
      },
      getago(startDate,valueTime){
        // vue 获取几天前的日期并展示在时间选择器上----第一个参数指定一个时间，第二个参数（正数是指定时间的未来几天，负数是指定时间的前几天）
        var date = new Date(startDate);
        var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+ +valueTime);
        var Y = newDate.getFullYear();
        var M = newDate.getMonth()+1;
        M = M<10?'0'+M:M;
        var D = newDate.getDate();
        D = D<10?'0'+D:D;
        
        let obj = {
          date: `${Y}-${M}-${D}`,
          date2: `${M}月${D}日`
        };
        return obj;
      },
      //-----------------------------默认日期显示 end----------------------
      goTo(url) {
        this.$util.redirectTo(url);
      },
      goToVip() {
        if(!uni.getStorageSync('token')) {
          uni.showModal({
            title: '请登录',
            success(res) {
              if(res.confirm) {
                that.$util.redirectTo('/pages/login/login')
              }else {}
            }
          })
        }else {
          this.$util.redirectTo('/otherpages/openVip/openVip');
        }
      },
      close() {
        this.show = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    .swiper-box {
      height: 388rpx;
      overflow: hidden;
    }
  }

  .movableArea {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;//设置area元素不可点击，则事件便会下移至页面下层元素
      .movableView {
        width: 120rpx;
        height: 48rpx;
        pointer-events: auto;//可以点击
      }
  }
  .kefu {
    // position: fixed;
    // top: 28%;
    // right: 0;
    // margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    height: 48rpx;
    font-size: $font-size-tag;
    color: $color-title2;
    background: #FFFFFF;
    box-shadow: 0px 4rpx 8rpx 0px rgba(0,0,0,0.1);
    border-radius: 200rpx 0px 0px 200rpx;
    image {
      width: 32rpx;
      height: 28rpx;
      margin-right: 6rpx;
    }
  }

  .boxCon {
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 8rpx 16rpx 6rpx rgba(0, 0, 0, 0.03);
    border-radius: 20rpx;
    padding: 24rpx;
    margin: -32rpx 28rpx 32rpx;

    .box-option {
      border-bottom: 1px solid #F5F5F5;

      .optionItem {
        &:first-child {
          width: 30%;
        }

        &:last-child {
          width: 70%;
        }
      }
    }

    .xuan {
      margin-top: 40rpx;

      button {
        border-radius: 10rpx;
        margin: 0;
      }
    }
  }

  .journeyCon {
    margin: 0 28rpx;

    .goods {
      padding: 24rpx 24rpx 30rpx;
      background-color: #fff;
      border-radius: 20rpx;

      .img {
        width: 160rpx;
        height: 136rpx;
        border-radius: 10rpx;
        margin-right: 24rpx;
      }

      .info {
        flex: 1;
      }

      .status {
        background: rgba(42, 110, 241, 0.1);
        border-radius: 4rpx;
        color: #2A6EF1;
        width: 56rpx;
        height: 32rpx;
        line-height: 32rpx;
        text-align: center;
        margin-right: 16rpx;
        font-weight: normal;
      }

      .goodsBtn {
        .navigator {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 168rpx;
          height: 56rpx;
          border-radius: 10rpx;
          border: 2rpx solid #E7E7E7;
          color: #495161;
        }

        .icon {
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }

        .rent {
          width: 462rpx;
          height: 56rpx;
          line-height: 56rpx;
          text-align: center;
          border-radius: 10rpx;
          border: 2rpx solid #00BC7E;
          color: $color-title2;
        }
      }
    }
  }

  .notice {
    padding: 12rpx 16rpx;
    margin: 24rpx 28rpx;
    display: flex;
    align-items: center;
    background-color: #fff;

    .txt-img {
      width: 56rpx;
      height: 56rpx;
    }

    .main-wrap {
      display: inline-block;
      width: 500rpx;
      position: relative;
      margin-left: 40rpx;

      .uni-swiper-msg {
        padding: 0;
      }

      .uni-swiper-msg swiper {
        height: 36rpx;
        font-size: $font-size-tag;
        color: rgba(0, 0, 0, 0.8);
      }
    }

  }
  .advertiseCon {
    padding: 20rpx 16rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin: 0 28rpx;
    .vip {
      width: 662rpx;
      height: 144rpx;
      margin-bottom: 24rpx;
    }
    .options {
      .options-item {
        position: relative;
        padding: 28rpx 24rpx;
        width: 322rpx;
        height: 168rpx;
        border-radius: 20rpx;
        box-sizing: border-box;
        .imgs {
          position: absolute;
          left: 0;
          top: 0;
          width: 322rpx;
          height: 168rpx;
        }
      }
      .item-scan {
        display: flex;
        align-items: center;
        font-size: $font-size-activity-tag;
        color: rgba(0,0,0,0.4);
      }
      .item1 {
        .color1 {
          color: #00A26D;
        }
      }
      .item2 {
        .color2 {
          color: #1556D1;
        }
      }
    }
  }
  .goodsCon {
    margin: 40rpx 28rpx;
  }
  .goodsCard {
    margin-top: 24rpx;
    .goods {
      padding: 24rpx;
      border-radius: 20rpx;
      margin-bottom: 24rpx;
      background-color: #fff;
      .goodsTop {
        border-bottom: 2rpx solid #F5F5F5;
        padding-bottom: 24rpx;
        .img {
          width: 160rpx;
          height: 160rpx;
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
        margin-bottom: 10rpx;
      }
      .goodsBot {
        .price {
          color: #FF622D;
        }
      }
    }
  }
  .timeCon {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #F2F7F5;
    margin: 0 auto;
    padding: 8rpx 0;
    .line {
      display: inline-block;
      width: 20rpx;
      height: 4rpx;
      background-color: #000;
      margin: 0 20rpx;
    }
    
   
    .timeTip {
      position: absolute;
      bottom: -88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 466rpx;
      height: 64rpx;
      background-color: $color-title2;
      border-radius: 10rpx;
      color: #fff;
      font-size: 30rpx;
      z-index: 9;
      &:before {
        position: absolute;
        top: -20rpx;
        content: '';
        display: inline-block;
        height:0;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid $color-title2;
      }
    }
  }
</style>
