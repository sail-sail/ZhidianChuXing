<template>
<tm-app>
  <view
    un-h="full"
    un-w="full"
    un-box-border
    un-bg="black"
    un-relative
  >
    
    <view
      un-flex="~"
      un-opacity="20"
    >
      <image
        un-w="full"
        src="https://car.zhidianchuxing.com.cn/uploads/20240203/0c6c00a5336a15262b199367560a58ed.jpg"
        mode="widthFix"
      ></image>
    </view>
    
    <view
      un-absolute
      un-top="10"
      un-w="full"
      un-flex="~ col"
      un-items="center"
    >
      <view
        un-text="white 6"
        un-font-bold
      >
        特惠长租 定制服务
      </view>
      <view
        un-text="white 4"
        un-m="t-2"
      >
        专业解决方案 全面保障 品质服务 优惠价格
      </view>
    </view>
    
    <view
      un-flex="~ col"
      un-overflow="hidden"
      un-bg="white"
      un-m="x-2"
      un-z="2"
      un-p="2"
      un-box-border
      un-rounded="4"
      un-absolute
      un-top="40"
      un-left="2"
      un-right="2"
      un-bottom="2"
    >
      <tm-tabs
        @change="tabschange"
        showTabsLineAni
        :list="tabsTitle"
        :item-width="300"
        :width="636"
        default-name="1"
        align="center"
        :showTabsLine="false"
      ></tm-tabs>
      <view
        un-flex="~ [1_0_0] col"
        un-overflow="hidden"
      >
        <view
          un-flex="~ [1_0_0] col"
          un-overflow="x-hidden y-auto"
        >
          <tm-form
            ref="formRef"
            @submit="onConfirm"
            v-model="model"
            :label-width="190"
            :margin="[0, 0]"
          >
            
            <tm-form-item
              v-if="tabKey == '2'"
              label="公司名称"
              field="model.companyName"
            >
              <tm-input
                :inputPadding="[0, 0]"
                v-model.lazy="model.companyName"
                :transprent="true"
                :showBottomBotder="false"
                placeholder="请输入公司名称"
              ></tm-input>
            </tm-form-item>
            
            <tm-form-item
              label="联系人"
              field="model.companyName"
            >
              <tm-input
                :inputPadding="[0, 0]"
                v-model.lazy="model.contact"
                :transprent="true"
                :showBottomBotder="false"
                placeholder="请输入联系人"
              ></tm-input>
            </tm-form-item>
            
            <!-- 联系电话 -->
            <tm-form-item
              label="联系电话"
              field="model.phone"
            >
              <tm-input
                :inputPadding="[0, 0]"
                v-model.lazy="model.phone"
                :transprent="true"
                :showBottomBotder="false"
                placeholder="请输入联系电话"
              ></tm-input>
            </tm-form-item>
            
            <!-- 车辆类型 -->
            <tm-form-item
              label="车辆类型"
              field="model.carType"
            >
              <view
                @click="showPickerCarType = !showPickerCarType"
                class="flex flex-row flex-row-center-between"
              >
                <text
                  v-if="pickerIndexCarType[0] == null"
                  un-text="3.75 gray-500"
                >
                  请选择车辆类型
                </text>
                <text
                  v-else
                >
                  {{ pickerlistCarType[pickerIndexCarType[0]].text }}
                </text>
              </view>
            </tm-form-item>
            
            <!-- 租车周期 -->
            <tm-form-item
              label="租车周期"
              field="model.rentalPeriod"
            >
              <view
                @click="showPickerRentalPeriod = !showPickerRentalPeriod"
                class="flex flex-row flex-row-center-between"
              >
                <text
                  v-if="pickerIndexRentalPeriod[0] == null"
                  un-text="3.75 gray-500"
                >
                  请选择租车周期
                </text>
                <text
                  v-else
                >
                  {{ pickerlistRentalPeriod[pickerIndexRentalPeriod[0]].text }}
                </text>
              </view>
            </tm-form-item>
            
            <!-- 其它要求 -->
            <tm-form-item
              label="其它要求"
              field="model.otherRequirements"
            >
              <tm-input
                type="textarea"
                :inputPadding="[0, 0]"
                v-model.lazy="model.otherRequirements"
                :transprent="true"
                :showBottomBotder="false"
                placeholder="如果您有其它要求，请告诉我们"
                :height="250"
                showCharNumber
                :maxlength="100"
              ></tm-input>
            </tm-form-item>
            
          </tm-form>
        
          <view
            un-m="t-4"
            un-text="3.25 gray-400"
          >
            <view>
              提交后客户经理会与您联系
            </view>
            <view>
              为您定制长租解决方案，提供最优质的服务和最优惠的价格
            </view>
          </view>
          
        </view>
        
        <view
          un-flex="~"
          un-justify-center
          un-items-center
        >
          <tm-button
            un-w="90%"
            :height="90"
            :fontSize="38"
            un-text="5"
            :round="25"
            label="提交"
            size="large"
            block
          ></tm-button>
        </view>
      </view>
    </view>
    
  </view>
  
  <!-- 车辆类型 -->
  <tm-picker
    :columns="pickerlistCarType"
    v-model:show="showPickerCarType"
    :default-value="pickerIndexCarType"
    v-model="pickerIndexCarType"
  ></tm-picker>
  
  <!-- 租车周期 -->
  <tm-picker
    :columns="pickerlistRentalPeriod"
    v-model:show="showPickerRentalPeriod"
    :default-value="pickerIndexRentalPeriod"
    v-model="pickerIndexRentalPeriod"
  ></tm-picker>
  
</tm-app>
</template>

<script lang="ts" setup>

let model = $ref<any>({ });

let formRef = $ref<InstanceType<typeof TmForm>>();

async function onConfirm() {
  if (!formRef) {
    return;
  }
  
  const {
    isPass,
  } = formRef.validate();
  
  if (!isPass) {
    return;
  }
}

let tabsTitle = $ref([
  {
    title: "个人长租",
    key: "1"
  },
  {
    title: "企业长租",
    key: "2"
  },
]);

let tabKey = $ref("1");

function tabschange(key: string) {
  tabKey = key;
}

// 车辆类型
let showPickerCarType = $ref(false);
let pickerlistCarType = $ref([
  {
    text: "SUV",
    index: 0,
  },
  {
    text: "小轿车",
    index: 1,
  },
  {
    text: "商务车",
    index: 2,
  },
  {
    text: "其它",
    index: 3,
  },
]);
let pickerIndexCarType = $ref([ ]);

// 租车周期
let showPickerRentalPeriod = $ref(false);
let pickerlistRentalPeriod = $ref([
  {
    text: "1个月",
    index: 0,
  },
  {
    text: "2个月",
    index: 1,
  },
  {
    text: "3个月",
    index: 2,
  },
  {
    text: "半年",
    index: 3,
  },
  {
    text: "1年",
    index: 4,
  },
]);
let pickerIndexRentalPeriod = $ref([ ]);
</script>
