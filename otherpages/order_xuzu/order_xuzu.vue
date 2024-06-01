<template>
  <view class="container">
    
    <view class="tips">
      <text class="name">请于{{orderDetail.end_time1}}前完成续租</text>
    </view>
    <view class="mainBox">
      <view class="acea-row row-between row-middle">
        <view @click="show = true">
          <view class="font-weight m-b-20">已选租车保障及服务</view>
          <block v-if="timeEnd">
            <view class="zuTime">{{timeEnd}}<i class="label">续租{{add_day}}天</i></view>
          </block>
          <block v-else>
            <view class="zuTime">请选择续租天数</view>
          </block>
        </view>
        <u-icon name="arrow-right" size="20"></u-icon>
      </view>
      <view class="time">原还车时间 {{orderDetail.end_time1}} </view>
    </view>
    
    <view class="mainBox" v-if="pay">
      <view class="row" style="border-bottom: 2rpx solid #F6F6F6;">
        <text class="font-weight">续租费用</text>
        <view class="acea-row row-middle">
          在线支付  <text class="m-l-24 money">￥800</text>
        </view>
      </view>
       <view class="row">
         <text class="color-sub">基本费用</text>
         <view class="acea-row row-middle">
           ¥28
         </view>
       </view>
       <view class="row">
         <text class="color-sub">基础保障服务</text>
         <view class="acea-row row-middle">
           ¥28
         </view>
       </view>
       <view class="row">
         <text class="color-sub">上门取车服务费</text>
         <view class="acea-row row-middle">
           ¥28
         </view>
       </view>
    </view>
    
    <view class="mainBox" v-if="pay">
      <view class="font-weight m-b-20">取消政策</view>
      <view class="table">
        <view class="row-title">
            <view class="color-sub row-title-name">取消时间</view>
            <view class="color-sub row-title-name">扣费标准</view>
        </view>
        <view class="row-table">
          <view class="row-table_rows">
            <view class="row-table_rows-col">{{orderDetail.end_time1}}前</view>
            <view class="row-table_rows-col">取车时间之前，免责取消</view>
          </view>
          <view class="row-table_rows">
            <view class="row-table_rows-col">{{orderDetail.end_time1}}后</view>
            <view class="row-table_rows-col">过了取车时间，收取订单金额50%的违约金</view>
          </view>  
        </view>
      </view>
    </view>
    
    <view class="footer">
      <button type="primary"  v-if="pay">去支付</button>
      <button type="primary" @click="submitOrder()" v-else>确认提交</button>
    </view>
    
    <!-- 选择完整年月日 -->
    <u-calendar :show="show" mode="single" @confirm="comfirmDate" color="#00BC7E" @close="close"></u-calendar>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        pay: 0, //是否是支付页面
        orderDetail: '',
        timeEnd: '',
        show: false,
        value1: Number(new Date()),
        add_day: 0,
        id: 24,
        second: 0
      }
    },
    filters: {
      formatDate(date) {
        const timeFormat = uni.$u.timeFormat;
        return timeFormat(date, 'yyyy-mm-dd');
      }
    },
    onLoad(option) {
      // this.id = option.id;
      this.getOrderDetail()
    },
    methods: {
      //订单详情
      getOrderDetail() {
        this.$api.sendRequest({
          url: '/api/car/Order/orderDetails',
          data: {id: this.id},
          success: res => {
            if(res.code == 1 && res.data) {
              this.orderDetail = res.data;
              let time = new Date(this.orderDetail.end_time1);
              this.second = this.timeFormat(time,'hh-mm');
            }
          }
        })
      },
      //确认续租
      submitOrder() {
        if(this.timeEnd==0) {
          this.$util.showToast({title: '请选择续租时间'});
          return
        }
        if(this.add_day==0) {
          this.$util.showToast({title: '结束日期和续租日期不能相同'});
          return
        }
        this.$api.sendRequest({
          url: '/api/car/Order/orderxuzu',
          data: {
            order_id: this.id,
            time: `${this.timeEnd} ${this.second}`
          },
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: '提交成功'});
              setTimeout(function() {
                uni.navigateBack({
                  delta:1
                })
              },1000)
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
      close() {
        this.show = false;
      },
      comfirmDate(e) {
        // console.log(e[0])   2023-07-18
        let timeEnd = e[0];
        this.show = false;
        
        //计算续租天数
        let timeStart = new Date(this.orderDetail.end_time1);
        timeStart = this.timeFormat(timeStart,'yyyy-mm-dd');
        
        this.add_day =  this.getDiffDay(timeEnd,timeStart)
        this.timeEnd = timeEnd;
      },
      //计算日期间隔天数
      getDiffDay(date_1, date_2) {
        // 计算两个日期之间的差值
        let totalDays, diffDate
        let myDate_1 = Date.parse(date_1)
        let myDate_2 = Date.parse(date_2)
        // 将两个日期都转换为毫秒格式，然后做差
        diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
        totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
        // console.log(totalDays)    
        return totalDays // 相差的天数
    },
      //时间转时间戳
      /**
       * 时间格式化
       * type: 格式化类型
       */
      timeFormat(time, type = "")  {
        const date = new Date(time);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        hh = hh < 10 ? "0" + hh : hh;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        let result = "";
        type = type.toLocaleLowerCase();
        switch (type) {
          case "yyyy-mm-dd":
            result = `${y}-${m}-${d}`;
            break;
          case "mm-dd":
            result = `${m}-${d}`;
            break;
          case "hh-mm":
            result = `${hh}:${mm}`;
            break;
          default:
            result = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            break;
        }
        return result;
      },
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 30rpx;
}
.tips {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 24rpx 28rpx;
  .name {
    font-size: $font-size-tag;
    color: #FF622D;
  }
}
.mainBox {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 0 28rpx 24rpx;
  .time {
    font-size: $font-size-activity-tag;
    color: #4B4B4B;
    margin-top: 14rpx;
  }
  .zuTime {
    display: flex;
    align-items: center;
    font-size: $font-size-toolbar;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #323232;
    margin-top: 20rpx;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #F4F4F4;
  }
  .label {
    width: 96rpx;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    background: rgba(42,241,127,0.15);
    font-size: $font-size-activity-tag;
    color: $color-title2;
    margin-left: 20rpx;
  }
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
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 20%;
  margin: 0 28rpx;
  button {
    margin: 0;
    width: 100%;
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
</style>
