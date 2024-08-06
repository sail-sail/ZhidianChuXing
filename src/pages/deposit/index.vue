<template>
<tm-app>
  <view
    un-bg="[#233ff5]"
    style="background: linear-gradient(180deg, #233ff5 0%, #1e2f9e 100%);"
    un-min="h-100vh"
    un-text="white"
    un-relative
    un-p="2.5"
    un-box-border
  >
    
    <view
      un-absolute
      un-top="5"
      un-right="3"
    >
      <view
        un-text="20"
        un-opacity="10"
      >
        <view
          un-i="iconfont-zhima"
        ></view>
      </view>
    </view>
    
    <!-- 芝麻信用 -->
    <view
      un-flex="~"
      un-justify="center"
      un-items="center"
      un-m="2.5"
      un-gap="2.5"
    >
      <view
        un-flex="~"
      >
        <view
          un-flex="~"
          un-text="7"
        >
          <view
            un-i="iconfont-zhima"
          ></view>
        </view>
        <view
          un-flex="~ col"
        >
          <view
            un-text="3.75"
          >
            芝麻信用
          </view>
          <view
            un-text="2.25 center"
          >
            ZHIMA CREDIT
          </view>
        </view>
      </view>
      <view
        un-text="3.75"
      >
        X
      </view>
      <view
        un-text="4.75"
      >
        质电出行(虹桥机场店)
      </view>
    </view>
    
    <!-- 租车免押金 出行更省心 -->
    <view
      un-flex="~"
      un-justify="center"
      un-items="center"
      un-m="t-2.5"
      un-text="6"
      un-font="bold"
    >
      租车免押金 出行更省心
    </view>
    
    <!-- 什么是免押租车 -->
    <view
      un-m="t-11"
      un-flex="~ col"
      un-p="x-4 b-4"
      un-box-border
      un-bg="white"
      un-text="[#333]"
      un-rounded="3.25"
      un-relative
    >
      
      <view
        un-absolute
        un-top="0"
        un-right="4"
        un-text="7"
        un-opacity="10"
      >
        <view
          un-i="iconfont-zhima"
        ></view>
      </view>
      
      <view
        un-flex="~"
        un-justify="center"
        un-w="full"
      >
        
        <view
          un-w="[70%]"
          un-text="4.25 white"
          un-font="bold"
          un-flex="~"
          un-justify="center"
          un-items="center"
          un-bg="[#233ff5]"
          un-p="y-2.5"
          un-rounded="full"
          un-box-border
          un-m="t--4"
        >
          什么是免押租车
        </view>
      </view>
      
      <view
        un-m="t-2.25"
        un-flex="~ col"
        un-text="3.75"
      >
        <view
          un-flex="~"
        >
          <view
            un-flex="~"
          >
            <view
              un-h="5"
              un-flex="~"
              un-items="center"
              un-p="r-1.5"
              un-box-border
            >
              <view
                un-w="1"
                un-h="1"
                un-bg="[#233ff5]"
                un-rounded="full"
              ></view>
            </view>
          </view>
          <view>
            芝麻分550及以上有机会享受最高30000元租车押金+违章押金双免服务
          </view>
        </view>
      </view>
      
      <view
        un-m="t-2.25"
        un-flex="~ col"
        un-text="3.75"
      >
        <view
          un-flex="~"
        >
          <view
            un-flex="~"
          >
            <view
              un-h="5"
              un-flex="~"
              un-items="center"
              un-p="r-1.5"
              un-box-border
            >
              <view
                un-w="1"
                un-h="1"
                un-bg="[#233ff5]"
                un-rounded="full"
              ></view>
            </view>
          </view>
          <view>
            服务过程中租车公司可以发起对押金的扣款，如果产生逾期账单请您 <text un-text="[red]">及时处理</text>以免影响信用
          </view>
        </view>
      </view>
      
    </view>
    
    <!-- 免押额度怎么评估 -->
    <view
      un-m="t-8"
      un-flex="~ col"
      un-p="x-4 b-4"
      un-box-border
      un-bg="white"
      un-text="[#333]"
      un-rounded="3.25"
      un-relative
    >
      
      <view
        un-absolute
        un-top="0"
        un-right="4"
        un-text="7"
        un-opacity="10"
      >
        <view
          un-i="iconfont-zhima"
        ></view>
      </view>
      
      <view
        un-flex="~"
        un-justify="center"
        un-w="full"
      >
        
        <view
          un-w="[70%]"
          un-text="4.25 white"
          un-font="bold"
          un-flex="~"
          un-justify="center"
          un-items="center"
          un-bg="[#233ff5]"
          un-p="y-2.5"
          un-rounded="full"
          un-box-border
          un-m="t--4"
        >
          免押额度怎么评估
        </view>
      </view>
      
      <view
        un-m="t-2.25"
        un-flex="~ col"
        un-text="3.75"
      >
        
        <view
          un-flex="~"
        >
          <view
            un-flex="~"
          >
            <view
              un-h="5"
              un-flex="~"
              un-items="center"
              un-p="r-1.5"
              un-box-border
            >
              <view
                un-w="1"
                un-h="1"
                un-bg="[#233ff5]"
                un-rounded="full"
              ></view>
            </view>
          </view>
          <view>
            支付宝会根据用户芝麻信用授予免押额度，若您的芝麻信用免押额度低于车辆押金，您可以通过支付宝预授权支付剩余押金。
          </view>
        </view>
        
        <view
          un-m="t-4 l-2 r-2"
          un-flex="~ col"
          un-border="0 l-1 t-1 [#233ff5] solid"
          un-text="3.25"
        >
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              芝麻信用分
            </view>
            
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              芝麻信用免押额度
            </view>
            
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              550-600分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              1000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              600-650分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              2000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              650-700分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              5000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              700-750分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              8000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              750-800分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              10000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              800-850分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              15000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              850-900分
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              20000元
            </view>
          </view>
          
          <view
            un-flex="~"
            un-border="0 b-1 [#233ff5] solid"
          >
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              900分以上
            </view>
            <view
              un-flex="~ [1_0_0]"
              un-overflow-hidden
              un-justify="center"
              un-items="center"
              un-p="y-1"
              un-box-border
              un-border="0 r-1 [#233ff5] solid"
            >
              30000元
            </view>
          </view>
          
        </view>
        
        <view
          un-text="3 center"
          un-m="t-2.5"
        >
          以上免押额度仅供参考，具体以芝麻信用风控评估为准
        </view>
        
      </view>
      
    </view>
    
    <!-- 如何使用免押服务 -->
    <view
      un-m="t-11"
      un-flex="~ col"
      un-p="x-4 b-4"
      un-box-border
      un-bg="white"
      un-text="[#333]"
      un-rounded="3.25"
      un-relative
    >
      
      <view
        un-absolute
        un-top="0"
        un-right="4"
        un-text="7"
        un-opacity="10"
      >
        <view
          un-i="iconfont-zhima"
        ></view>
      </view>
      
      <view
        un-flex="~"
        un-justify="center"
        un-w="full"
      >
        
        <view
          un-w="[70%]"
          un-text="4.25 white"
          un-font="bold"
          un-flex="~"
          un-justify="center"
          un-items="center"
          un-bg="[#233ff5]"
          un-p="y-2.5"
          un-rounded="full"
          un-box-border
          un-m="t--4"
        >
          如何使用免押服务
        </view>
      </view>
      
      <view
        un-m="t-2.25"
        un-flex="~ col"
        un-text="3.75"
      >
        <view
          un-flex="~"
        >
          <view
            un-flex="~"
          >
            <view
              un-h="5"
              un-flex="~"
              un-items="center"
              un-p="r-1.5"
              un-box-border
            >
              <view
                un-w="1"
                un-h="1"
                un-bg="[#233ff5]"
                un-rounded="full"
              ></view>
            </view>
          </view>
          <view>
            支付宝端内可在确认订单时选择免押服务，在线申请免押。
          </view>
        </view>
        
        <view
          un-p="4"
          un-box-border
        >
          <image
            src="/static/img/mianya1.jpg"
            mode="widthFix"
            style="width: 100%;"
          ></image>
        </view>
      </view>
      
      <view
        un-m="t-2.25"
        un-flex="~ col"
        un-text="3.75"
      >
        <view
          un-flex="~"
        >
          <view
            un-flex="~"
          >
            <view
              un-h="5"
              un-flex="~"
              un-items="center"
              un-p="r-1.5"
              un-box-border
            >
              <view
                un-w="1"
                un-h="1"
                un-bg="[#233ff5]"
                un-rounded="full"
              ></view>
            </view>
          </view>
          <view>
            微信小程序、百度小程序等其他端内可选择到店免押。取车时扫码申请免押服务。
          </view>
        </view>
        
        <view
          un-p="4"
          un-box-border
        >
          <image
            src="/static/img/mianya2.jpg"
            mode="widthFix"
            style="width: 100%;"
          ></image>
        </view>
      </view>
      
    </view>
    
    <view
      un-m="y-8"
      un-flex="~"
      un-justify="center"
    >
      <view
        un-w="[70%]"
        un-flex="~"
        un-justify="center"
        un-items="center"
        un-rounded="full"
        un-h="10"
        un-bg="white"
        un-text="4 [#233ff5]"
        un-font="bold"
      >
        立 即 租 车
      </view>
    </view>
    
  </view>
</tm-app>
</template>

<script lang="ts" setup>

</script>
