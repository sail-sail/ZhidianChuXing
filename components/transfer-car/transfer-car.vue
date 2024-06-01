<template>
  <view>
    <u-popup :show="show"  mode="top" round="0">
      <view class="popDialog">
         <view class="pop_row">
           <view class="font-weight m-b-20 color-sub">筛选条件</view>
           <view class="row">
             <view class="row_item" :class="item.id==brand_id?'row_item_on':''" v-for="(item,index) in brand" @click="changeBrand(item)">{{item.brand_name}}</view>
           </view>
         </view>
         <view class="pop_operation">
           <view class="btn btn_cancel" @click="cancel()">重置</view>
           <view class="btn btn_confirm" @click="confirm()">完成</view>
         </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"transfer-car",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        brand_id: 0,
        brand: ['奔驰','别克','本田','大众','丰田','日产'],
      };
    },
    created() {
      this.getCarBrand()
    },
    methods: {
      cancel() {
        this.brand_id = 0;
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm',{id: this.brand_id})
      },
      changeBrand(item) {
        this.brand_id = item.id;
      },
      //获取汽车品牌
      getCarBrand() {
        this.$api.sendRequest({
          url: '/api/car/Index/carBrand',
          data: {},
          success: res => {
            if(res.code >=1&&res.data.length) {
              this.brand = res.data;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  
  .pop_row {
    margin: 0 32rpx 20rpx;
    .row {
      display: flex;
      flex-wrap: wrap;
      .row_item {
        width: 160rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        background: #F4F4F4;
        border-radius: 10rpx;
        font-size: $font-size-tag;
        color: #323232;
        margin-right: 18rpx;
        margin-bottom: 20rpx;
      }
      .row_item_on {
        background-color: $color-title2!important;
        color: #fff!important;
      }
    }
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    margin: 140rpx 0 0;
    .btn {
      width: 50%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: $font-size-toolbar;
    }
    .btn_cancel {
      background: rgba(0,188,126,0.05);
      color: $color-title2;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}

</style>