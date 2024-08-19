<template>
<tm-app>
  <view
    un-h="full"
    un-w="full"
    un-box-border
    un-bg="[#4aa1e4]"
    un-relative
    un-p="b-4"
  >
    
    <!-- 新手租车指南 -->
    <view
      un-m="t-10 l-8"
    >
      <view
        un-text="white 6"
        un-font-bold
      >
        新手租车指南
      </view>
      <view
        un-text="white 3.75"
        un-m="t-2"
      >
        在线租车 全流程高效服务
      </view>
    </view>
    
    <!-- 线上预定 -->
    <view
      un-rounded="4"
      un-bg="white"
      un-p="4"
      un-box-border
      un-m="x-2 t-4"
    >
      
      <view
        un-text="black 4 center"
        un-font-bold
      >
        线上预定
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
        un-m="t-4 l-4"
      >
        简单3步，线上预订车辆和服务
      </view>
      
      <scroll-view
        scroll-x
        enable-flex
        un-m="t-4"
        un-p="x-6"
        un-box-border
        un-w="full"
        un-flex="~"
        un-min="h-[720rpx] w-[380rpx]"
      >
        <view
          un-flex="~"
          un-gap="6"
        >
          <view
            un-min="h-[720rpx] w-[380rpx]"
          >
            <image
              src="https://img.yzcdn.cn/vant/apple-1.jpg"
              style="width: 100%; height: 100%;"
              un-rounded="4"
              mode="aspectFill"
            ></image>
          </view>
          <view
            un-min="h-[720rpx] w-[380rpx]"
          >
            <image
              src="https://img.yzcdn.cn/vant/apple-1.jpg"
              style="width: 100%; height: 100%;"
              un-rounded="4"
              mode="aspectFill"
            ></image>
          </view>
          <view
            un-min="h-[720rpx] w-[380rpx]"
          >
            <image
              src="https://img.yzcdn.cn/vant/apple-1.jpg"
              style="width: 100%; height: 100%;"
              un-rounded="4"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </scroll-view>
      
      <view>
      </view>
    </view>
    
    <!-- 如何取车 -->
    <view
      un-rounded="4"
      un-bg="white"
      un-p="4"
      un-box-border
      un-m="x-2 t-4"
    >
      
      <view
        un-text="black 4 center"
        un-font-bold
      >
        如何取车
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
      >
        取车服务
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        您可选到店/送车上门服务，请至约定地点取车
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        如您的<text un-text="[red]">行程变更</text>请及时与我们联系
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
        un-m="t-4"
      >
        取车流程
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
        un-flex="~ wrap"
        un-justify="start"
        un-gap="2"
      >
        <view
          un-whitespace="nowrap"
        >
          核验证件
        </view>
        <view
          un-whitespace="nowrap"
        >
          订单费用/押金确认
        </view>
        <view
          un-whitespace="nowrap"
        >
          验车并签署协议
        </view>
      </view>
      
    </view>
    
    <!-- 取车证件 -->
    <view
      un-rounded="4"
      un-bg="white"
      un-p="4"
      un-box-border
      un-m="x-2 t-4"
    >
      
      <view
        un-text="black 4 center"
        un-font-bold
      >
        取车证件
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
      >
        身份证原件
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
        un-flex="~ wrap"
        un-gap="2"
      >
        <view>二代身份证原件</view>
        <view>年满18周岁</view>
        <view>有效期<text un-text="[red]">2个月</text>以上</view>
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
        un-m="t-4"
      >
        驾驶证原件或电子驾照
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
        un-flex="~ wrap"
        un-justify="start"
        un-gap="2"
      >
        <view
          un-whitespace="nowrap"
        >
          原件正副本
        </view>
        <view
          un-whitespace="nowrap"
        >
          电子驾照提前申领
        </view>
        <view
          un-whitespace="nowrap"
        >
          有效期<text un-text="[red]">2个月</text>以上
        </view>
      </view>
      
    </view>
    
    <!-- 押金退还 -->
    <view
      un-rounded="4"
      un-bg="white"
      un-p="4"
      un-box-border
      un-m="x-2 t-4"
    >
      
      <view
        un-text="black 4 center"
        un-font-bold
      >
        押金退还
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
      >
        租车押金
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        取车时您需要支付租车押金，支持信用卡、现金等方式。如无异常情况，<text un-text="[red]">还车时全额退还</text>。
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
        un-m="t-4"
      >
        违章押金
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        还车时需要支付违章押金，支持信用卡、现金等方式。<text un-text="[red]">还车后30天</text>无违章记录退还。
      </view>
      
      <view
        un-text="white 3 center"
        un-bg="[#4aa1e4]"
        un-rounded="4"
        un-w="full"
        un-p="x-2 y-1"
        un-m="t-4"
        un-box-border
      >
        芝麻分550及以上可申请租车押金+违章押金双免
      </view>
      
    </view>
    
    <!-- 事故处理 -->
    <view
      un-rounded="4"
      un-bg="white"
      un-p="4"
      un-box-border
      un-m="x-2 t-4"
    >
      
      <view
        un-text="black 4 center"
        un-font-bold
      >
        事故处理
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
      >
        事故处理
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        车辆在途中发生事故，请注意人身安全，第一时间报警(122)并<text un-text="[red]">联系我们</text>。我们将全程为您提供专业的指导
      </view>
      
      <view
        un-text="black 4"
        un-font-bold
        un-m="t-4"
      >
        道路救援
      </view>
      
      <view
        un-text="gray-800 3.75"
        un-m="t-2 l-2"
      >
        我们联合保险公司为您提供全国范围内的车辆救援服务。如遇车辆故障需要道路救援。请安全停车后及时联系我们
      </view>
      
    </view>
    
    <view
      un-m="t-4"
      un-flex="~"
      un-justify="center"
    >
      <tm-button
        un-w="80%"
        :block="true"
        :round="25"
        :fontSize="32"
        :height="80"
        label="立即租车"
        size="large"
      >
      </tm-button>
    </view>
    
  </view>
</tm-app>
</template>

<script lang="ts" setup>

</script>
