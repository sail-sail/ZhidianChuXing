<template>
<tm-app>
  <view
    un-flex="~ [1_0_0] col"
    un-overflow-hidden
    un-h="full"
    un-w="full"
    un-box-border
    un-bg="gray-200"
  >
    
    <view
      un-flex="~ [1_0_0] col"
      un-overflow="y-auto x-hidden"
      un-box-border
      un-p="y-4 x-2"
      un-gap="4"
    >
      
      <view
        v-for="model in car_models"
        :key="model.id"
        un-box-border
        un-rounded="tr-4 tl-md b-md"
        un-p="x-2 y-4"
        un-bg="white"
        un-shadow="md"
      >
        <view
          un-flex="~"
          un-min-h="20"
          un-box-border
          un-p="2"
          un-gap="2"
        >
          <view
            un-flex="~"
            un-w="20"
          >
            <image
              un-w="full"
              un-h="full"
              :src="model.img"
              mode="aspectFit"
            ></image>
          </view>
          
          <view
            un-flex="~ [1_0_0] col"
            un-overflow="hidden"
            un-justify="between"
            un-m="l-1"
          >
            <view
              un-text="black 4"
              un-font-bold
            >
              {{ model.name }}
            </view>
            <view
              un-flex="~"
            >
              <view>
                {{ model.transmission_type }}
              </view>
              <view> / </view>
              <view>
                {{ model.displacement }}
              </view>
              <view> / </view>
              <view>
                {{ model.car_type }}
              </view>
            </view>
            <view>
              {{ model.color }}
            </view>
          </view>
          
        </view>
      </view>
      
      <view
        un-box-border
        un-rounded="md"
        un-p="x-2 y-2"
        un-bg="white"
        un-m="t--2"
      >
        
        <view
          un-flex="~"
        >
          <view
            un-text="3.5 gray-400"
            un-flex="~"
            un-items-center
          >
            周五 10:00
          </view>
          <view
            un-flex="[1_0_0]"
            un-relative
          >
            <tm-divider
              color="#efefef"
              un-m="x-8"
            ></tm-divider>
            <view
              un-absolute
              un-right="50%"
              un-top="3.5"
              un-text="3.5 gray-600"
            >
              1天
            </view>
          </view>
          <view
            un-text="3.5 gray-400"
            un-flex="~"
            un-items-center
          >
            周六 10:30
          </view>
        </view>
        
        <view
          un-flex="~"
          un-m="t-2"
        >
          <view
            un-text="5"
            un-font-bold
          >
            08月09日
          </view>
          <view
            un-flex="[1_0_0]"
          ></view>
          <view
            un-text="5"
            un-font-bold
          >
            08月10日
          </view>
        </view>
        
        <view
          un-flex="~"
          un-gap="x-2"
          un-m="t-2"
          un-items-center
        >
          <tm-tag
            size="xs"
            label="到店取车"
            text
            :border="1"
            :shadow="0"
            color="red"
          ></tm-tag>
          
          <text
            un-text="3 gray-600"
          >
            质电出行(虹桥机场店)
          </text>
        </view>
        
      </view>
      
      <view
        un-box-border
        un-rounded="md"
        un-p="x-4 y-4"
        un-bg="white"
      >
        <tm-grid
          :width="638"
          :col="3"
        >
          <tm-grid-item
            v-for="item in [1, 2, 3, 4, 5, 6]"
            :height="120"
            dot
          >
            
            <tm-icon
              name="tmicon-user-fill"
              :font-size="42"
            ></tm-icon>
            
            <tm-text
              :font-size="22"
              label="宫格文本"
            ></tm-text>
            
          </tm-grid-item>
        </tm-grid>
      </view>
      
      <!-- 配驾司机 -->
      <view
        un-box-border
        un-rounded="md"
        un-p="x-4 y-4"
        un-bg="white"
      >
        <view
          un-text="4.5 black"
          un-font-bold
        >
          配驾司机
        </view>
        <view
          un-m="t-2"
          un-flex="~"
        >
          <view
            un-text="3.25 gray-600"
            un-flex="~ [1_0_0]"
            un-items-center
            un-overflow-hidden
          >
            专业司机 全程品质服务 (¥400/天)
          </view>
          <view
            un-flex="~"
            un-items-center
          >
            <tm-switch
              :margin="[12, 0]"
              barIcon=""
            ></tm-switch>
          </view>
        </view>
      </view>
      
      <view
        un-box-border
        un-rounded="md"
        un-p="x-4 y-4"
        un-bg="white"
      >
        
        <view
          un-text="4.5 black"
          un-font-bold
        >
          订单明细
        </view>
        
        <view
          un-m="t-4"
          un-flex="~"
          un-items-center
          un-text="3.5 gray-800"
        >
          <view>
            基本租金
          </view>
          <view
            un-flex="[1_0_0]"
          ></view>
          <view>
            ￥628
          </view>
        </view>
        
        <view
          un-m="t-2"
          un-flex="~"
          un-items-center
          un-text="3.5 gray-800"
        >
          <view>
            基本保障服务费 ¥100*1
          </view>
          <view
            un-flex="[1_0_0]"
          ></view>
          <view>
            ￥100
          </view>
        </view>
        
        <view
          un-m="t-2"
          un-flex="~"
          un-items-center
          un-text="3.5 gray-800"
        >
          <view>
            手续费
          </view>
          <view
            un-flex="[1_0_0]"
          ></view>
          <view>
            ￥30
          </view>
        </view>
        
        <view
          un-m="t-1"
        >
          <tm-divider
            color="#efefef"
            un-flex="[1_0_0]"
          ></tm-divider>
        </view>
        
        <view
          un-m="t-2"
          un-flex="~"
          un-items-center
          un-text="3.5 gray-800"
        >
          <view
            un-flex="[1_0_0]"
          ></view>
          <view
            un-m="r-4"
          >
            订单总价:
          </view>
          <view
            un-text="4 black"
            un-font-bold
          >
            ￥758
          </view>
        </view>
        
      </view>
      
    </view>
    
    <!-- 底部 -->
    <view
      un-flex="~"
      un-items-center
      un-box-border
      un-p="y-4 x-4"
      un-bg="white"
      un-rounded="t-4"
    >
      
      <view
        un-flex="~ [1_0_0]"
        un-overflow-hidden
        un-items-center
        un-gap="x-1"
      >
        <text
          un-text="5 [blue]"
          un-font="bold"
        >
          ￥1538
        </text>
        <tm-tag
          size="xs"
          label="押金: ￥20000"
          text
          :border="1"
          :shadow="0"
          border-color="black"
          color="black"
          fontColor="black"
          :round="1"
        ></tm-tag>
      </view>
      
      <view
        un-flex="~"
        un-justify-center
        un-items-center
      >
        <tm-button
          :width="250"
          :height="100"
          :fontSize="40"
          un-text="5"
          :round="25"
          label="立即下单"
          size="large"
        >
        </tm-button>
      </view>
      
    </view>
  </view>
</tm-app>
</template>

<script lang="ts" setup>

let car_models = $ref([
  {
    id: "1",
    img: "https://img.yzcdn.cn/vant/apple-1.jpg",
    name: "大众 帕拉特新能源",
    // 自动挡
    transmission_type: "自动",
    // 排量
    displacement: "1.4T",
    // 车型
    car_type: "三厢车",
    color: "金色",
    tags: ["芝麻免押", "可配司机"],
    price: 200,
    total: 806,
  },
]);
</script>
