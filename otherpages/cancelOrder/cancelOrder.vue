<template>
  <view class="container">
    <view class="tips">
      <view>温馨提示：</view>
      <view class="name">如超过免责取消时间，将收取违约金。如有疑问请联系平台客服</view>
    </view>
    
    <view class="font-weight font-size-toolbar m-b-24">请选择取消订单的原因：</view>
    
    <view class="result" v-for="(item,index) in resultList" :key="index" @click="changeResult(item)">
      <view class="font-weight">{{item.title}}</view>
       <u-icon name="checkmark-circle-fill" color="#00BC7E" size="20" v-if="result_id == item.id"></u-icon>
       <u-icon name="checkmark-circle" size="20" v-else></u-icon>
    </view>
    
    <view class="footer">
      <button type="primary" @click="submit()">提交</button>
    </view>
    
    <!-- 取消组件 -->
    <cancel-pop :show="show" @close="close" @confirm="confirm"></cancel-pop>
    
  </view>
</template>

<script>
  import cancelPop from '@/components/cancel-pop/cancel-pop.vue'
  export default {
    components: {
      cancelPop
    },
    data() {
      return {
        show: false,
        resultList: [],
        result_id: 0,
        id: 0,
        cancel_time: 0,
        charge_rate: 0,
        orderDetail: ''
      }
    },
    onLoad(option) {
      this.id = option.id;
      this.getOrderDetail()
      this.getCancelResult();
      this.getLimitTime();
      this.getHandleCharge();
    },
    methods: {
      close() {
        this.show = false;
      },
      confirm() {
        this.$api.sendRequest({
          url: '/api/car/Order/cancelDetails',
          data: {
            id: this.id,
            cancelreason_id: this.result_id
          },
          success: res => {
            if(res.code == 1) {
              this.show = false;
              this.$util.showToast({title: '订单已取消'});
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
      //获取取车前时间限制
      getLimitTime() {
        this.$api.sendRequest({
          url: '/api/car/Order/cancel_limitation',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.cancel_time = parseInt(res.data)
            }
          }
        })
      },
      //获取扣除手续费比例
      getHandleCharge() {
        this.$api.sendRequest({
          url: '/api/car/Order/cancel_sever',
          data: {},
          success: res => {
            if(res.code == 1 && res.data) {
              this.charge_rate = parseInt(res.data)
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
              //计算此订单是否可以免费取消
              // let startDate = res.data.
              
            }
          }
        })
      },
      submit() {
        if(!this.result_id) {
          this.$util.showToast({title: '请选择取消原因'});
          return
        }
        this.show = true;
      },
      //选择取消原因
      changeResult(item) {
        this.result_id = item.id;
      },
      //获取取消订单原因
      getCancelResult() {
        this.$api.sendRequest({
          url: '/api/car/Order/cancelreason',
          data: {},
          success: res => {
            if(res.code == 1 && res.data.length) {
              this.resultList = res.data;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin: 0 28rpx;
}
.tips {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  margin: 24rpx 0 36rpx;
  .name {
    font-size: $font-size-tag;
    color: #7F7F7F;
    margin-top: 16rpx;
  }
}
.result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}
.footer {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20%;
  button {
    margin: 0;
    width: 100%;
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
</style>
