<template>
<tm-app
  un-bg="gray-200"
>
  
  <view
    un-p="4"
    un-box-border
    un-bg="white"
    un-flex="~"
    un-gap="2"
    un-items="center"
  >
    <tm-input
      search
      prefix="tmicon-search"
      placeholder="输入姓名/手机号查询"
      un-flex="[1_0_0]"
      un-overflow-hidden
    ></tm-input>
    <view
      un-text="gray-600"
    >
      添加会员
    </view>
  </view>
  
  <view
    un-p="x-4 y-2"
    un-box-border
    un-bg="white"
    un-gap="2"
    un-rounded="md"
    un-m="t-4 x-4"
  >
    
    <view
      un-flex="~"
      un-gap="2"
      un-items="center"
    >
      <view
        un-flex="~"
        un-text="4 gray-800"
      >
        待完善
      </view>
      <view
        un-flex="[1_0_0]"
        un-overflow-hidden
      ></view>
      <view
        un-flex="~"
        un-gap="0"
      >
        <tm-tag
          size="xs"
          label="未知风险"
          color="grey"
        ></tm-tag>
        <tm-tag
          size="xs"
          label="未认证"
          text
          :border="1"
          color="grey"
          :shadow="0"
          transprent
        ></tm-tag>
      </view>
    </view>
    
    <view
      un-flex="~"
      un-items="center"
      un-m="t-2"
    >
      
      <view>
        18122120953
      </view>
      
      <view
        un-m="l-1"
      >
        <view
          un-i="iconfont-phone"
          un-text="3.25 gray-600"
        ></view>
      </view>
      
      <view
        un-flex="[1_0_0]"
        un-overflow-hidden
      >
      </view>
      
      <view
        un-text="gray-600"
      >
        广东广州
      </view>
      
    </view>
  </view>
</tm-app>
</template>

<script lang="ts" setup>

</script>
