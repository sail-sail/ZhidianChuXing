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
      :item-width="300"
      :width="750"
      default-name="1"
      align="center"
      :showTabsLine="false"
    ></tm-tabs>
    
    <view
      un-p="y-4 x-4"
      un-box-border
      un-bg="white"
    >
      <tm-input
        search
        prefix="tmicon-search"
        placeholder="请输入车牌号查询"
      ></tm-input>
    </view>
    
    <view
      un-flex="~ [1_0_0] col"
      un-overflow-hidden
      un-justify="center"
      un-items="center"
    >
      <text un-text="4 gray-500">(没有车辆)</text>
    </view>
    
    <view
      un-fixed
      un-right="4"
      un-bottom="8"
    >
      <tm-button
        icon="tmicon-plus"
        :width="86"
        :round="10"
        :height="86"
        :fontSize="40"
        :margin="[10]"
        :shadow="0"
        size="normal"
      ></tm-button>
    </view>
    
  </view>
</tm-app>
</template>

<script lang="ts" setup>

let tabsTitle = $ref([
  {
    title: "已上线",
    key: "1"
  },
  {
    title: "已下线",
    key: "2"
  },
]);

let tabKey = $ref("1");

function tabschange(key: string) {
  tabKey = key;
}
</script>
