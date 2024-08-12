<template>
<tm-app
  un-bg="gray-200"
>
  <view
    un-h="full"
    un-w="full"
    un-box-border
    un-flex="~ col"
  >
    
    <tm-tabs
      @change="tabschange"
      showTabsLineAni
      :list="tabsTitle"
      :item-width="220"
      :width="750"
      default-name="1"
      align="center"
      :showTabsLine="false"
    ></tm-tabs>
    
    <view
      un-flex="~ [1_0_0] col"
      un-overflow-hidden
      un-justify="center"
      un-items="center"
    >
      <text un-text="4 gray-500">(暂无相关数据信息)</text>
    </view>
    
  </view>
  
</tm-app>
</template>

<script lang="ts" setup>

let tabsTitle = $ref([
  {
    title: "车型价格",
    key: "1"
  },
  {
    title: "门店价格",
    key: "2"
  },
  {
    title: "节假日价格",
    key: "3"
  }
]);

let tabKey = $ref("1");

function tabschange(key: string) {
  tabKey = key;
}
</script>
