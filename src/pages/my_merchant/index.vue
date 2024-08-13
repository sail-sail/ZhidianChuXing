<template>
<tm-app
  un-bg="gray-200"
>
  
  <view
    un-absolute
    un-top="0"
    un-w="full"
    un-h="80"
    style="background: linear-gradient(to bottom, #1c3eba 40%, #e5e7eb);"
  ></view>
  
  <swiper
    indicator-dots
    circular
    indicator-color="rgba(255, 255, 255, .4)"
    indicator-active-color="rgba(255, 255, 255, 1)"
    un-h="26"
    un-m="t-14"
  >
    
    <swiper-item>
      <view
        un-text="white"
        un-p="x-4 y-2"
        un-box-border
      >
        <view
          un-text="6"
          un-font-bold
        >
          老客户复购快速提升
        </view>
        <view
          un-text="3 gray-300"
          un-m="t-1"
        >
          搭建客户运营体系 提升消费频次与粘性
        </view>
      </view>
    </swiper-item>
    
    <swiper-item>
      <view
        un-text="white"
        un-p="x-4 y-2"
        un-box-border
      >
        <view
          un-text="6"
          un-font-bold
        >
          线上成交 高效触达
        </view>
        <view
          un-text="3 gray-300"
          un-m="t-1"
        >
          微信群 朋友圈 公众号 短视频 快速成交
        </view>
      </view>
    </swiper-item>
    
    <swiper-item>
      <view
        un-text="white"
        un-p="x-4 y-2"
        un-box-border
      >
        <view
          un-text="6"
          un-font-bold
        >
          租车业务数智化管理
        </view>
        <view
          un-text="3 gray-300"
          un-m="t-1"
        >
          免押 订单 库存 验车 电子签 全流程提效
        </view>
      </view>
    </swiper-item>
    
    <swiper-item>
      <view
        un-text="white"
        un-p="x-4 y-2"
        un-box-border
      >
        <view
          un-text="6"
          un-font-bold
        >
          打造线上品牌 客户更信赖
        </view>
        <view
          un-text="3 gray-300"
          un-m="t-1"
        >
          打造线上品牌 提升客户体验 增强客户认知
        </view>
      </view>
    </swiper-item>
    
  </swiper>
  
  <view
    un-bg="gray-200"
    un-m="x-4 t-6"
    un-p="2"
    un-box-border
    un-rounded="4"
    un-z="2"
    un-opacity="90"
    un-shadow="md"
  >
    
    <view
      un-flex="~"
      un-justify="between"
      un-p="x-2"
      un-box-border
    >
      <view
        un-text="3.5 gray-700"
      >
        剩余使用天数: 0天
      </view>
      <view
        un-text="3.5 gray-700"
      >
        了解套餐
      </view>
    </view>
    
    <view
      un-text="4 black"
      un-font-bold
      un-m="t-4"
      un-p="x-2"
      un-box-border
    >
      质电出行
    </view>
    
    <view
      un-flex="~"
      un-gap="4"
      un-p="x-2 y-4"
      un-box-border
    >
      
      <view
        un-flex="~"
      >
        <button
          un-flex="~"
          un-items="center"
          un-bg="white"
          un-rounded="full"
          un-gap="1"
          un-p="x-3 y-.5"
          un-box-border
          un-h="8"
          open-type="share"
        >
          <view
            un-text="4 green-500"
          >
            <view
              un-i="iconfont-wechart"
            ></view>
          </view>
          <view
            un-text="3.5 gray-700"
          >
            分享店铺
          </view>
        </button>
      </view>
      
    </view>
    
  </view>
  
  <!-- 数据看板 -->
  <view
    un-bg="white"
    un-m="x-4 t-6"
    un-p="4"
    un-box-border
    un-rounded="4"
    un-z="2"
    un-shadow="md"
  >
    
    <view
      un-text="4 black"
      un-font-bold
      un-p="x-2"
      un-box-border
    >
      数据看板
    </view>
    
    <view
      un-flex="~"
      un-m="y-4"
    >
      
      <view
        un-flex="~ [1_0_0] col"
        un-box-border
      >
        <view
          un-text="6 black"
          un-font-bold
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          0
        </view>
        <view
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          访问用户
        </view>
      </view>
      
      <view
        un-flex="~ [1_0_0] col"
        un-box-border
        @click="onMemList"
      >
        <view
          un-text="6 black"
          un-font-bold
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          1
        </view>
        <view
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          注册会员
        </view>
      </view>
      
      <view
        un-flex="~ [1_0_0] col"
        un-box-border
        @click="onOrderList"
      >
        <view
          un-text="6 black"
          un-font-bold
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          0
        </view>
        <view
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          订单数量
        </view>
      </view>
      
      <view
        un-flex="~ [1_0_0] col"
        un-box-border
      >
        <view
          un-text="6 black"
          un-font-bold
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          0
        </view>
        <view
          un-flex="~"
          un-justify="center"
          un-items="center"
        >
          交易金额
        </view>
      </view>
      
    </view>
    
  </view>
  
  <!-- 常用工具 -->
  <view
    un-bg="white"
    un-m="x-4 t-6"
    un-p="4"
    un-box-border
    un-rounded="4"
    un-z="2"
    un-shadow="md"
  >
    <tm-tabs
      @change="tabschange"
      :list="tabsTitle"
      align="center"
      :width="636"
      :itemWidth="150"
      :default-name="swiperCurrent"
      :round="2"
      activeFontColor="black"
      :activeFontSize="34"
      showTabsLineAni
      :showTabsLine="false"
    ></tm-tabs>
    <swiper
      :current="swiperCurrent"
    >
      
      <swiper-item>
        <view>
          
          <view
            un-flex="~"
            un-m="t-4"
          >
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
              @click="onCreateOrder"
            >
              <view
                un-flex="~ [1_0_0]"
                un-justify="center"
                un-items="center"
              >
                <view
                  un-i="iconfont-order"
                  un-text="5.5 gray-600"
                ></view>
              </view>
              <view
                un-text="3 gray-800"
                un-flex="~"
                un-justify="center"
                un-items="center"
              >
                创建订单
              </view>
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
              @click="onCarMgt"
            >
              <view
                un-flex="~ [1_0_0]"
                un-justify="center"
                un-items="center"
              >
                <view
                  un-i="iconfont-car"
                  un-text="6"
                ></view>
              </view>
              <view
                un-text="3 gray-800"
                un-flex="~"
                un-justify="center"
                un-items="center"
              >
                车辆管理
              </view>
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
            >
              <view
                un-flex="~ [1_0_0]"
                un-justify="center"
                un-items="center"
              >
                <view
                  un-i="iconfont-calendar"
                  un-text="6 gray-500"
                ></view>
              </view>
              <view
                un-text="3 gray-800"
                un-flex="~"
                un-justify="center"
                un-items="center"
              >
                库存日历
              </view>
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
              @click="onPriceSet"
            >
              <view
                un-flex="~ [1_0_0]"
                un-justify="center"
                un-items="center"
              >
                <view
                  un-i="iconfont-price"
                  un-text="5.5 gray-500"
                ></view>
              </view>
              <view
                un-text="3 gray-800"
                un-flex="~"
                un-justify="center"
                un-items="center"
              >
                价格管理
              </view>
            </view>
            
          </view>
          
          <view
            un-flex="~"
            un-m="t-4"
          >
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
            >
              <view
                un-flex="~ [1_0_0]"
                un-justify="center"
                un-items="center"
              >
                <view
                  un-i="iconfont-contract"
                  un-text="6 gray-500"
                ></view>
              </view>
              <view
                un-text="3 gray-800"
                un-flex="~"
                un-justify="center"
                un-items="center"
              >
                电子合同
              </view>
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
            >
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
            >
            </view>
            
            <view
              un-flex="~ [1_0_0] col"
              un-overflow-hidden
            >
            </view>
            
          </view>
          
        </view>
      </swiper-item>
      
    </swiper>
  </view>
  
  <view
    un-h="8"
  ></view>
  
</tm-app>
</template>

<script lang="ts" setup>

let tabsTitle = $ref([
  {
    key: 0,
    title: "常用工具",
  },
  {
    key: 1,
    title: "业务",
  },
  {
    key: 2,
    title: "运营",
  },
  {
    key: 3,
    title: "门店",
  },
]);

let swiperCurrent = $ref(0);

async function tabschange(key: number) {
  swiperCurrent = key;
}

// 创建订单
async function onCreateOrder() {
  await uni.navigateTo({
    url: "/pages/create_order/select_mem",
  });
}

// 车辆管理
async function onCarMgt() {
  await uni.navigateTo({
    url: "/pages/car_mgt/index",
  });
}

// 价格管理
async function onPriceSet() {
  await uni.navigateTo({
    url: "/pages/price_set/index",
  });
}

// 会员列表
async function onMemList() {
  await uni.navigateTo({
    url: "/pages/create_order/select_mem",
  });
}

// 订单列表
async function onOrderList() {
  await uni.navigateTo({
    url: "/pages/order/list",
  });
}
</script>
