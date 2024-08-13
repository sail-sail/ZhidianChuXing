<template>
<tm-app>
  <view
    un-flex="~ [1_0_0] col"
    un-overflow-hidden
    un-h="full"
    un-w="full"
    un-box-border
    un-bg="gray-200"
    un-text="4 gray-800"
  >
   
    <view
      un-p="t-2 x-4"
      un-box-border
      un-bg="white"
    >
      <tm-tabs
        :border="1"
        @change="tabschange"
        :list="tabsTitle"
        :item-width="340"
        :width="680"
        default-name="1"
        align="center"
        itemModel="card"
        activeFontColor="white"
        :itemRound="3"
        :round="3"
        :itemFontSize="24"
        :activeFontSize="24"
        :itemHeight="68"
      ></tm-tabs>
    </view>
    
    <tm-tabs
      @change="tabs2change"
      showTabsLineAni
      :list="tabs2Title"
      :item-width="140"
      :width="750"
      :default-name="tab2Key"
      align="center"
      :showTabsLine="false"
    ></tm-tabs>
    
    <view
      un-p="y-4 x-4"
      un-box-border
      un-bg="white"
      un-flex="~"
      un-items="center"
    >
      <tm-input
        un-flex="[1_0_0]"
        un-overflow-hidden
        prefix="tmicon-search"
        placeholder="输入车牌号/姓名/手机号查找订单"
      ></tm-input>
      <tm-button
        :margin="[0, 0]"
        :padding="[0, 0]"
        :shadow="0"
        label="筛选"
        text
        transprent
        :height="62"
        :width="100"
      ></tm-button>
    </view>
    
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
    title: "租车订单",
    key: "1"
  },
  {
    title: "免押订单",
    key: "2"
  },
]);

let tabKey = $ref("1");

function tabschange(key: string) {
  tabKey = key;
}

let tabs2Title = $ref([
  {
    title: "全部",
    key: "1"
  },
  {
    title: "预定",
    key: "2"
  },
  {
    title: "在租",
    key: "3"
  },
  {
    title: "结算",
    key: "4"
  },
  {
    title: "取消",
    key: "5"
  },
]);

let tab2Key = $ref("2");

function tabs2change(key: string) {
  tab2Key = key;
}
</script>
