<template>
  <view class="container">
    
    <view class="header" id="headerCon">
      <view class="timeCon" >
        <view class="font-size-tag" @click="showTime = true">{{address}}</view>
        <view class="font-size-tag acea-row row-middle" @click="showTime = true"><text>{{pickupdate.startDate}} {{pickupdate.startTime}}</text> <text class="line"></text> <text>{{pickupdate.endDate}} {{pickupdate.endTime}}</text></view>
        <view class="timeTip" v-if="flagTips"><text class="m-r-10">点击修改取车时间和地点</text> <u-icon name="close" color="#fff" @click="flagTips = false"></u-icon></view>
      </view>
      <view class="screen m-t-20">
        <view class="screenItem" :class="type==1?'color-title2':''" @click="changeScreen(1)">
          <text>综合排序</text>
          <u-icon :name="type==1?'arrow-up':'arrow-down'" :color="type==1?'#00BC7E':'#333'" size="12"></u-icon>
        </view>
        <view class="screenItem" :class="type==2?'color-title2':''" @click="changeScreen(2)">
          <text>品牌</text>
          <u-icon :name="type==2?'arrow-up':'arrow-down'" :color="type==2?'#00BC7E':'#333'" size="12"></u-icon>
        </view>
        <view class="screenItem" :class="type==3?'color-title2':''" @click="changeScreen(3)">
          <text>价格</text>
          <u-icon :name="type==3?'arrow-up':'arrow-down'" :color="type==3?'#00BC7E':'#333'" size="12"></u-icon>
        </view>
        <view class="screenItem" :class="type==4?'color-title2':''" @click="changeScreen(4)">
          <text>类型</text>
          <u-icon :name="type==4?'arrow-up':'arrow-down'" :color="type==4?'#00BC7E':'#333'" size="12"></u-icon>
        </view>
        <!-- 引入筛选项组件 -->
        <screen-pop :show="showScreen" v-if="showScreen" :type="type" @confirm="confirm" @close="closePop"></screen-pop>
      </view>
      <view class="limit" @click="$util.redirectTo('/pages/agree/agree?type=6')">
        限行提示：上海市部分时段车辆尾号限行/徐汇区部分时段车辆尾号限行
        <u-icon name="arrow-right" color="#00BC7E" size="14"></u-icon>
      </view>
    </view>
    <view class="main" :style="categoryHeight">
      <scroll-view scroll-y="true" class="mainL">
        <view class="l-item" :class="l_id==item.id?'l-item-active':''" v-for="(item,index) in llist" :key="index" @click="changeLeft(item)">
          <view class="font-weight">{{item.power_name}}</view>
          <view class="color-sub font-size-activity-tag" v-if="item.starting_price">{{item.starting_price}}元/起</view>
        </view>
      </scroll-view>
      <scroll-view scroll-y="true" class="mainR" @scrolltolower="getMoreList()">
        <view class="r-item" v-for="(item,index) in rlist" :key="index">
          <view class="acea-row goodsTop">
            <!-- <view class="status">{{item.songhuan_type}}</view> -->
            <image :src="item.image" mode="aspectFit" class="img" @click="goDetail(item)"></image>
            <view class="info" @click="goOrderSubmit(item)">
              <view class="acea-row row-between row-middle">
                <u--text :text="item.motorcycle_name" size="16" color="#333" lines="2" :bold="true"></u--text>
                <!-- <u-tag text="候补" bgColor="rgba(255,83,0,0.1)" color="#FF5300" plain size="mini" borderColor="rgba(255,83,0,0.1)" v-if="item.stock==0"> </u-tag> -->
              </view>
              <view class="acea-row">
                <view v-for="(n,m) in item.home1_tags" class="color-sub font-size-tag">{{n}}<text v-if="m!==item.home1_tags.length-1">｜</text></view>
              </view>
            </view>
          </view>
          <view class="acea-row m-t-14 m-b-26">
             <text class="label" v-for="(n,m) in item.home2_tags">{{n}}</text>
          </view>
          <view class="goodsBot acea-row row-between row-middle" @click="goDetail(item)">
            <view class="font-size-tag color-sub acea-row row-middle font-weight"> 车辆详情
               <u-icon name="arrow-right" color="#D8D8D8" size="12"></u-icon>
            </view>
            <view class="price font-weight"><text class="font-size-activity-tag">¥</text>{{item.price}} <text class="color-sub">/天</text></view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    
    <!-- 选择时间和地点弹窗 -->
    <choose-time :show="showTime" @close="closeTime" @confirm="confirmTime" :pickupdate="pickupdate"></choose-time>
    
    <!-- 实名认证提醒 -->
    <realname-pop :show="show" @close="closeRealname" @confirm="confirmRealname"></realname-pop> 
    
   <!-- 底部tabBar -->
   <diy-bottom-nav type="shop"></diy-bottom-nav>
    
  </view>
</template>

<script>
  import chooseTime from '@/components/choose-time/choose-time.vue'
  import diyBottomNav from '@/components/diy-bottom-nav/diy-bottom-nav.vue';
  import screenPop from '@/components/screen-pop/screen-pop.vue'
  import realnamePop from '@/components/realname-pop/realname-pop.vue'
  export default {
    components: {
      realnamePop,screenPop,diyBottomNav,chooseTime
    },
    data() {
      return {
        flagTips: true,
        show: false,
        type: 1, 
        showScreen: false,
        categoryHeight: 0,
        l_id: 0,
        llist: [{
          name: '全部',
        },{
          name: '油车',
        }],
        showTime: false,
        address: '',
        pickupdate: {
          startDate: '',
          endDate: '',
          startDate1: '',
          endDate1: '',
          startTime: '14:00',
          endTime: '14:00',
          dayNum: 2
        },
        rlist: [],
        page: 1,
        pageSize: 15,
        total: 1,
        params: {
          order_price: '',
          brand_id: '',
          series_id: [],
          price: '',
          priceIndex: '',
          zizhu_id: '',
        },
        is_auth: 0, //实名状态
      }
    },
    onLoad() {
      uni.hideTabBar();
      this.getDateTime();
      this.getCarDong();
      this.getCarList()
    },
    async onShow() {
      //检测是否实名
      // if(uni.getStorageSync('token')) {
      //   if(uni.getStorageSync('userInfo')) this.is_auth = uni.getStorageSync('userInfo').is_auth;
      //   if(!this.is_auth) this.show = true;
      // }
      
      this.address = uni.getStorageSync('location').address;
      //获取选择日期的参数
      if(uni.getStorageSync('pickupdate')) this.pickupdate = uni.getStorageSync('pickupdate');
      await this.getCateHeight()
    },
    methods: {
      async getCateHeight() {
        var cateHeight = 0;
        var res = await uni.getSystemInfo({
        	async: false
        });
        console.log('555',res)
        var headHeight = 0;
        this.$nextTick(() => {
        	const query = uni.createSelectorQuery().in(this);
        	query
        		.select('#headerCon')
        		.boundingClientRect(data => {
              console.log('666',data);
        			headHeight = data.height;
        			
        			// 底部导航高度
        			cateHeight = res[1].windowHeight - headHeight - 55;
        			if (this.$util.uniappIsIPhoneX()) {
                console.log('777')
        				// #ifdef MP-WEIXIN
        				cateHeight -= 31;
        				// #endif
        			}
        			this.categoryHeight = 'height:' + cateHeight + 'px';
        		})
        		.exec();
        });
      },
      //获取左侧分类
      getCarDong() {
        this.$api.sendRequest({
          url: '/api/car/Index/powertype',
          data: {},
          success: res => {
            if(res.code >=1&&res.data.length) {
              this.llist = res.data;
              this.llist.unshift({
                id: 0,
                power_name: '全部',
                starting_price: 0,
              })
            }
          }
        })
      },
      changeLeft(item) {
        this.l_id = item.id;
        this.getCarList(true);
      },
      //获取特价车辆
      getCarList(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/car/Index/motorcycle',
          data: {
            page: this.page,
            limit: this.pageSize,
            brand_id: this.params.brand_id,
            series_id: this.params.series_id.join(','),
            price: this.params.price,  //价格区间 最小价格- 最大价格
            car_powertype_id: this.l_id,
            order_price: this.params.order_price, //desc 从高到低 asc 从低到高
            songhuan_type: this.params.zizhu_id == 0?'':this.params.zizhu_id == 1?'自助取还':'上门送取', 
          },
          success: res => {
            if (res.code == 1) {
              //设置列表数据
              if (this.page == 1) this.rlist = res.data.data; //如果是第一页需手动制空列表
              else this.rlist = this.rlist.concat(res.data.data); //追加新数据
              this.total = res.data.last_page;
            }
          }
        })
      },
      goDetail(item) {
        this.$util.redirectTo('/pages/detail/detail?id='+item.id)
      },
      //跳转订单确认页面
      goOrderSubmit(item) {
        if(!uni.getStorageSync('token')) this.$util.redirectTo('/pages/login/login');
        else {
          // if(uni.getStorageSync('userInfo').is_auth == 0) this.show = true;
          // else 
          this.$util.redirectTo('/pages/submitOrder/submitOrder?id='+item.id)
        }
      },
      getMoreList() {
        if(this.page >= this.total) return;
        this.page++;
        this.getCarList()
      },
      //点击切换筛选项
      changeScreen(type) {
        this.type = type;
        this.showScreen = !this.showScreen;
      },
      confirm(e) {
        let type = e.type;
        //赋值
        this.params = uni.getStorageSync('params');
        this.getCarList(true);
        this.showScreen = false;
      },
      closePop() {
        this.params = uni.getStorageSync('params');
        this.showScreen = false;
        this.getCarList(true)
      },
      closeTime( ) {
        this.showTime = false;
      },
      confirmTime() {
        this.showTime = false;
      },
      closeRealname() {
        this.show = false;
      },
      confirmRealname() {
        this.show = false;
        this.$util.redirectTo('/otherpages/shiming/shiming?auth='+this.is_auth)
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
    }
  }
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.header {
  background-color: #fff;
}
.timeCon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F2F7F5;
  width: 694rpx;
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
.screen {
  position: relative;
  display: flex;
  padding: 20rpx 0;
  .screenItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    color: rgba(0,0,0,0.8);
    font-size: $font-size-tag;
    text {margin-right: 8rpx;}
  }
}
.limit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64rpx;
  background: rgba(0,188,126,0.15);
  font-size: $font-size-activity-tag;
  color: $color-title2;
  padding: 0 30rpx;
}
.main {
  display: flex;
  .mainL {
    width: 172rpx;
    .l-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 116rpx;
      text-align: center;
    }
    .l-item-active {
      background-color: #fff;
      &::before {
        content: '';
        position: absolute;
        width: 6rpx;
        height: 40rpx;
        background: #00BC7E;
      }
    }
  }
  .mainR {
    width: calc(100% - 127rpx);
    .r-item {
        padding: 20rpx 24rpx;
        margin-bottom: 20rpx;
        background-color: #fff;
        .goodsTop {
          position: relative;
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
          .status {
            position: absolute;
            top: 0;
            left: 24rpx;
            width: 112rpx;
            height: 30rpx;
            line-height: 30rpx;
            text-align: center;
            background: #314960;
            border-radius: 0px 0px 14rpx 14rpx;
            font-size: $font-size-activity-tag;
            color: #fff;
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
}
</style>
