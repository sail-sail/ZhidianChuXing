<template>
  <tm-app>
    <view class="container">
      <view class="userInfo" @click="baseInfo">
        <tm-avatar img="https://picsum.photos/200/300" :round="12" :size="150"></tm-avatar>
        <view class="userName">中国移动</view>
        <view class="userPhone">13800138000</view>
      </view>

      <tm-card title="我的订单">
        <template v-slot:content>
          <tm-grid :width="650" :col="4">
            <tm-grid-item @click="orderList">
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-obligation"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="待付款"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-pending_order"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="进行中"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-bill"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="已完成"></tm-text>
            </tm-grid-item>
            <tm-grid-item @click="orderList">
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-cancel"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="已取消"></tm-text>
            </tm-grid-item>
          </tm-grid>
        </template>
      </tm-card>

      <tm-card title="更多">
        <template v-slot:content>
          <tm-grid :width="650" :col="4">
            <tm-grid-item>
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-folder"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="收藏车辆"></tm-text>
            </tm-grid-item>
            <tm-grid-item
              @click="onCoupon"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-coupon"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="优惠卷"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-order"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="团购订单"></tm-text>
            </tm-grid-item>
            <tm-grid-item
              @click="callPhone"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-customer_service"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="客服"></tm-text>
            </tm-grid-item>
            <tm-grid-item>
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-comment"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="意见反馈"></tm-text>
            </tm-grid-item>
            <tm-grid-item
              @click="onAbout"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-about"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="关于我们"></tm-text>
            </tm-grid-item>
            <tm-grid-item
              @click="onMyMerchant"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-p="1"
                un-box-border
              >
                <view
                  un-i="iconfont-home"
                  un-text="4.5 gray-800"
                ></view>
              </view>
              <tm-text :font-size="22" label="我是商家"></tm-text>
            </tm-grid-item>
          </tm-grid>
        </template>
      </tm-card>

    </view>
  </tm-app>
</template>

<script setup lang="ts">

function baseInfo() {
  uni.navigateTo({
    url: '/pages/baseInfo/index'
  })
}

async function orderList() {
  await uni.navigateTo({
    url: '/pages/order/list'
  })
}

async function onMyMerchant() {
  await uni.navigateTo({
    url: "/pages/my_merchant/index",
  })
}

// 客服
async function callPhone() {
  try {
    await uni.makePhoneCall({
      phoneNumber: '400-1234-1234'
    });
  } catch(err) {
  }
}

// 关于我们
async function onAbout() {
  await uni.navigateTo({
    url: "/pages/about/index",
  })
}

// 优惠卷
async function onCoupon() {
  await uni.navigateTo({
    url: "/pages/coupon/index",
  })
}

onMounted(async () => {
});
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: calc(100vh - env(safe-area-inset-bottom) - 75rpx);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(247, 246, 250);
}

.userInfo {
  width: 100vw;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.userName {
  margin-top: 25rpx;
  font-size: 36rpx;
  font-weight: bold;
}

.userPhone {
  margin-top: 25rpx;
  color: gray;
  font-size: 30rpx;
}
</style>
