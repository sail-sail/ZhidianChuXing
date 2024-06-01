<template>
  <view>
    <u-popup :show="show" @close="close"  mode="bottom" round="10" closeable>
      <view class="popDialog">
          <view class="pop_title">驾驶人</view>
          <scroll-view scroll-y="true" class="pop_card">
            <view class="pop_item" v-for="(item,index) in list" :key="index">
              <view style="flex: 1;align-items: baseline;" class="acea-row" @click="changeId(item)">
                  <image src="../../static/radio_on.png" mode="" class="radio" v-if="driverid == item.id"></image>
                  <image src="../../static/radio.png" mode="" class="radio" v-else></image>
                  <view style="text-align: left;">
                    <view class="font-weight">{{item.name}}</view>
                    <view class="color-sub">身份证 {{item.no}}</view>
                    <view class="color-sub">手机号 {{item.mobile}}</view>
                  </view>
              </view>
              <image src="../../static/edit.png" mode="" class="editImg" @click.stop="edit(item)"></image>
            </view>
          </scroll-view>
          <view class="pop_operation">
            <view class="btn btn_confirm" @click="confirm()">新增驾驶人</view>
          </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name:"choose-driver",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      list: [Object,Array],
      driverid: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      close() {
        this.$emit('changeDriver',{id: this.driverid})
      },
      confirm() {
        this.$util.redirectTo('/otherpages/addDriver/addDriver')
        // this.$emit('confirm',{pop: "showDriver"})
      },
      edit(item) {
        var param = {
          id: item.id,
          name: item.name,
          card: item.no,
          mobile: item.mobile
        }
        this.$util.redirectTo('/otherpages/addDriver/addDriver?param='+JSON.stringify(param))
      },
      changeId(item) {
        this.$emit('changeDriver',{id: item.id})
      },
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  padding: 28rpx 28rpx;
  text-align: center;
  .pop_title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333333;
    padding-bottom: 32rpx;
    border-bottom: 2rpx solid #F2F2F2;
  }
  .pop_card {
    height: 534rpx;
    margin: 38rpx 0;
    .pop_item {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      .editImg {
        width: 32rpx;
        height: 36rpx;
      }
      .radio {
        width: 32rpx;
        height: 32rpx;
        margin-right: 16rpx;
      }
    }
  }
  .pop_operation {
    display: flex;
    justify-content: space-between;
    margin-top: 25%;
    .btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 10rpx;
      font-size: $font-size-toolbar;
    }
    .btn_confirm {
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>