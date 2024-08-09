<template>
<tm-app>
  <view
    un-flex="~ [1_0_0] col"
    un-overflow-hidden
    un-h="full"
    un-w="full"
    un-box-border
  >
    
    <view
      un-flex="~ [1_0_0] col"
      un-overflow="y-auto x-hidden"
      un-box-border
      un-p="y-4 x-2"
      un-bg="gray-200"
      un-gap="4"
    >
      
      <view
        v-for="model in car_models"
        :key="model.id"
        un-box-border
        un-rounded="4"
        un-p="x-2 y-4"
        un-bg="white"
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
        
        <tm-divider
          :margin="[0, 0]"
        ></tm-divider>
        
        <view
          un-flex="~ col"
          un-box-border
          un-p="y-2"
          un-gap="2"
        >
          
          <view
            un-flex="~"
            un-justify="between"
            un-items="center"
          >
            <view
              un-flex="~"
              un-items="center"
            >
              <tm-tag
                v-for="(tag, t) in model.tags"
                :key="model.id + tag"
                size="xs"
                :label="tag"
                :border="1"
                :text="t > 0"
              ></tm-tag>
            </view>
            <view
              un-flex="~"
              un-items="center"
              un-gap="1"
            >
              <view
                un-text="3.5"
              >
                日租金
              </view>
              <view
                un-text="red 5"
                un-font="bold"
              >
                ¥{{ model.price }}
              </view>
              <view
                un-text="3.5"
              >
                起
              </view>
            </view>
          </view>
          
        </view>
      </view>
      
      <!-- 规格参数 -->
      <view
        un-box-border
        un-rounded="4"
        un-p="x-2 y-4"
        un-bg="white"
      >
        <view
          un-text="3.5 black"
          un-font-bold
          un-p="l-2"
          un-box-border
        >
          规格参数
        </view>
        
        <view
          un-p="2"
          un-box-border
        >
          
          <!-- 第一行 -->
          <view
            un-flex="~"
            un-m="t-4"
          >
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-car"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                车辆级别
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                中大型MPV
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-charger"
                  un-text="gray-600"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                能源类型
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                插电式混合动力
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-seat"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                座位数量
              </view>
              <view
                un-text="3 gray-600 center"
                un-m="t-1"
              >
                -
              </view>
            </view>
            
          </view>
          
          <!-- 第二行 -->
          <view
            un-flex="~"
            un-m="t-4"
          >
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-car"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                天窗类型
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                电动天窗
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-video_recorder"
                  un-text="gray-600"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                辅助影像
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                360度全景影像
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-car"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                行车记录仪
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                -
              </view>
            </view>
            
          </view>
          
          <!-- 第三行 -->
          <view
            un-flex="~"
            un-m="t-4"
          >
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-charge"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                充电类型
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                支持
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-range"
                  un-text="gray-600"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                续航里程
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                -
              </view>
            </view>
            
            <view
              un-flex="[1_0_0]"
              un-overflow="hidden"
            >
              <view
                un-flex="~"
                un-justify="center"
                un-items="center"
                un-text="5.5"
              >
                <view
                  un-i="iconfont-charge"
                ></view>
              </view>
              <view
                un-text="2.75 gray-400 center"
                un-m="t-1"
              >
                充电时间
              </view>
              <view
                un-text="2.75 gray-600 center"
                un-m="t-1"
              >
                -
              </view>
            </view>
            
          </view>
          
        </view>
      </view>
      
      <!-- 服务详情 -->
      <view
        un-flex="~"
      >
        <view
          un-box-border
          un-p=".25"
          un-bg="white"
          un-rounded="full"
        >
          <view
            un-rounded="full"
            un-p="x-4 y-2"
            un-box-border
            un-text="3.5 black"
            un-font-bold
            un-bg="gray-200"
          >
            服务详情
          </view>
        </view>
      </view>
      
      <view
        un-box-border
        un-rounded="4"
        un-p="x-2 y-4"
        un-bg="white"
      >
        
        <view
          un-p="6"
          un-box-border
          un-border="0 b-1 gray-200 solid"
          un-flex="~"
        >
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                送车上门
              </view>
              <view
                un-text="2.75 gray-500"
              >
                在线预订送车上门
              </view>
            </view>
          </view>
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                押金双免
              </view>
              <view
                un-text="2.75 gray-500"
              >
                租车、违章押金双免
              </view>
            </view>
          </view>
        </view>
        
        <view
          un-p="6"
          un-box-border
          un-border="0 b-1 gray-200 solid"
          un-flex="~"
        >
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                车辆免费升级
              </view>
              <view
                un-text="2.75 gray-500"
              >
                到店无车，免费升级
              </view>
            </view>
          </view>
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                全车消毒
              </view>
              <view
                un-text="2.75 gray-500"
              >
                全车消毒，安全出行
              </view>
            </view>
          </view>
        </view>
        
        <view
          un-p="6"
          un-box-border
          un-border="0 gray-200 solid"
          un-flex="~"
        >
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                专业服务
              </view>
              <view
                un-text="2.75 gray-500"
              >
                免费道路救援
              </view>
            </view>
          </view>
          <view
            un-flex="~ [1_0_0]"
            un-overflow="hidden"
          >
            <view
              un-min="w-5 h-5"
            >
              
            </view>
            <view>
              <view
                un-text="3.25 black"
                un-font-bold
              >
                洗车交付
              </view>
              <view
                un-text="2.75 gray-500"
              >
                一车一洗，干净卫生
              </view>
            </view>
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
      un-bg="gray-200"
    >
      <view
        un-flex="~ col"
        un-justify-center
        un-items-center
        un-bg="white"
        un-rounded="full"
        un-h="12"
        un-w="12"
        un-shadow-lg
      >
        <view
          un-text="4 gray-200"
          un-box-border
        >
          <view
            un-i="iconfont-collect"
          ></view>
        </view>
        <view
          un-text="2.5 gray-600 center"
          un-box-border
        >
          收藏
        </view>
      </view>
      
      <view
        un-m="l-4"
        un-flex="~ [1_0_0]"
        un-justify-center
        un-overflow-hidden
      >
        <tm-button
          un-w="full"
          :block="true"
          :round="25"
          :fontSize="34"
          :height="100"
          label="立即下单"
          size="large"
          @click="onOrder"
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

async function onOrder() {
  await uni.navigateTo({
    url: "/pages/order/index",
  });
}
</script>
