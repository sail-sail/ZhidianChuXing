<template>
  <view class="screenDialog" @click="closeScreen()">
    <view class="pop_main">
      <block v-if="type==4">
        <view class="pop_row">
          <view class="font-weight m-b-20">自助</view>
          <view class="row">
            <view class="row_item" :class="zizhu_id==item.id?'row_item_on':''" v-for="(item,index) in moreList.dong1" @click.stop="changeDong1(item)">{{item.name}}</view>
          </view>
        </view>
       <!-- <view class="pop_row">
          <view class="font-weight m-b-20">车辆配置</view>
          <view class="row">
            <view class="row_item" :class="dongIndex2==index?'row_item_on':''" v-for="(item,index) in moreList.set" @click="changeDong2(index)">{{item}}</view>
          </view>
        </view> -->
        
        <view class="pop_operation">
          <view class="btn btn_cancel" @click.stop="cancel()">重置</view>
          <view class="btn btn_confirm" @click.stop="confirm()">确定</view>
        </view>
      </block>
      <block v-if="type == 1">
        <view class="pai_row" :class="allIndex==0?'color-title2':''" @click.stop="changeAll(0)">
          <text>综合排序</text>
          <image src="../../static/dui.png" mode="" class="dui" v-if="allIndex==0"></image>
        </view>
        <view class="pai_row" :class="allIndex==1?'color-title2':''" @click.stop="changeAll(1)">
          <text>价格从低到高</text>
          <image src="../../static/dui.png" mode="" class="dui" v-if="allIndex==1"></image>
        </view>
        <view class="pai_row" :class="allIndex==2?'color-title2':''" @click.stop="changeAll(2)">
          <text>价格从高到低</text>
          <image src="../../static/dui.png" mode="" class="dui" v-if="allIndex==2"></image>
        </view>
      </block>
      <block v-if="type == 3">
        <view class="pop_row">
          <view class="font-weight m-b-20">价格</view>
          <view class="row">
            <view class="row_item" style="width: 203rpx;" :class="priceIndex==index?'row_item_on':''" v-for="(item,index) in priceList" :key="index" @click.stop="changePrice(index)">{{item.name}} {{item.unit?item.unit:''}}</view>
          </view>
        </view>
        <view class="pop_operation">
          <view class="btn btn_cancel" @click.stop="cancel()">重置</view>
          <view class="btn btn_confirm" @click.stop="confirm()">确定</view>
        </view>
      </block>
      <block v-if="type == 2">
        <view class="acea-row" style="height: 72%;">
          <scroll-view scroll-y="true" class="pmain_l">
            <view class="pmain_l_item" :class="item.id==brand_id?'pmain_l_item_on':''" v-for="(item,index) in brand" @click.stop="changeBrand(item)">{{item.brand_name}}</view>
          </scroll-view>
          <scroll-view scroll-y="true" class="pmain_r">
            <view class="pmain_r_item" :class="brandChild_id.includes(item.id)?'pmain_r_item_on':''" v-for="(item,index) in brandRlist" :key="index" @click.stop="changeBrandChild(item)">
              <text>{{item.series_name}}</text>
              <image src="../../static/dui.png" mode="" class="dui" v-if="brandChild_id.includes(item.id)"></image>
            </view>
          </scroll-view>
        </view>
        <view class="pop_operation">
          <view class="btn btn_cancel" @click.stop="cancel()">重置</view>
          <view class="btn btn_confirm" @click.stop="confirm()">确定</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name:"screen-pop",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      type: [String,Number],  //4更多 1综合 3价格  2品牌
    },
    data() {
      return {
        brand_id: 0,
        brandChild_id: [],
        brand: ['奔驰','别克','本田','大众','丰田','日产'],
        brandRlist: ['不限车系','C260'],
        allIndex: 0,  //0综合 1由低到高 2由高到低
        priceIndex: '',
        priceList: [{
          name: '不限',
          unit: ''
        },{
          name: '0-150',
          unit: '元/天'
        },{
          name: '150-250',
          unit: '元/天'
        },{
          name: '250-350',
          unit: '元/天'
        },{
          name: '350-1000',
          unit: '元/天'
        },{
          name: '1000-2000',
          unit: '元/天'
        },{
          name: '2000-3000',
          unit: '元/天'
        }],
        moreList: {
          dong1: [{
            name: '全部',
            id: 0
          },{
            name: '自助取还',
            id: 1
          },{
            name: '上门送取',
            id: 2
          }],
          set: ['倒车雷达','倒车影像','雪地胎','行车记录仪']
        },
        zizhu_id: 0,
        dongIndex2: 0,
      };
    },
    created() {
      if(uni.getStorageSync('params')) {
        let params = uni.getStorageSync('params');
        this.brand_id = params.brand_id;
        this.brandChild_id = params.series_id;
        this.allIndex = params.order_price=="asc"?1:params.order_price=="desc"?2:0;
        this.priceIndex = params.priceIndex;
        this.zizhu_id = params.zizhu_id;
      }
      // this.getCarDong()
      this.getCarBrand()
    },
    methods: {
      closeScreen() {
        this.$emit('close')
      },
      cancel() {
        var that = this;
        if(this.type==2) {
          this.brand_id = 0;
          this.brandChild_id = [];
        }else if(this.type == 3) {
          this.priceIndex = 0;
        }else {
          this.zizhu_id = 0;
        }
        let params = {
          order_price: '',
          brand_id: '',
          series_id: [],
          price: '',
          priceIndex: '',
          zizhu_id: '',
        }
        uni.setStorage({
          key: 'params',
          data: params,
          success() {
            that.$emit('close')
          }
        })
      },
      confirm() {
        var that = this;
        //存储筛选状态
        let params = {
          order_price: '',
          brand_id: '',
          series_id: [],
          price: '',
          priceIndex: '',
          zizhu_id: '',
        }
        if(this.type == 1) {
          params.order_price = this.allIndex==0?'':this.allIndex==1?'asc':'desc';
        }else if(this.type == 2) {
          params.brand_id = this.brand_id;
          params.series_id= this.brandChild_id;
        }else if(this.type == 3) {
          params.priceIndex = this.priceIndex;
          
          if(this.priceIndex==0) params.price = '';
          else params.price = this.priceList[this.priceIndex].name;
        }else {
          params.zizhu_id = this.zizhu_id;
        }
        uni.setStorage({
          key: 'params',
          data: params,
          success() {
            that.$emit('confirm',{type: that.type})
          }
        })
      },
      changeAll(index) {
        this.allIndex = index;
        this.confirm()
      },
      changeBrand(item) {
        this.brand_id = item.id;
        this.brandChild_id = [];
        this.getSeries()
      },
      changeBrandChild(item) {
        let arr = this.brandChild_id;
        if(arr.includes(item.id)) {
          arr.forEach((v,k) => {
            if(v == item.id) {
              arr.splice(k, 1);
            }
          })
        }else {
          arr.push(item.id);
        }
        this.brandChild_id = arr;
      },
      changePrice(index) {
        this.priceIndex = index;
      },
      changeDong1(item) {
        this.zizhu_id = item.id;
      },
      changeDong2(index) {
        this.dongIndex2 = index;
      },
      //获取汽车动力类型
      getCarDong() {
        this.$api.sendRequest({
          url: '/api/car/Index/powertype',
          data: {},
          success: res => {
            if(res.code >=1) {
              this.moreList.dong1 = res.data;
              this.moreList.dong1.unshift({
                id: 0,
                power_name: '全部',
                starting_price: 0,
              })
            }
          }
        })
      },
      //获取汽车品牌
      getCarBrand() {
        this.$api.sendRequest({
          url: '/api/car/Index/carBrand',
          data: {},
          success: res => {
            if(res.code >=1&&res.data.length) {
              this.brand = res.data;
              this.brand_id = res.data[0].id;
              this.getSeries()
            }
          }
        })
      },
      //获取品牌下面的车系
      getSeries() {
        this.$api.sendRequest({
          url: '/api/car/Index/carSeries',
          data: {brand_id: this.brand_id},
          success: res => {
            if(res.code >=1&&res.data.length) {
             this.brandRlist = res.data;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
.screenDialog {
  position: absolute;
  top: 83rpx;
  left: 0;
  width: 100%;
  height: 1000rpx;
  background: rgba(0,0,0,0.6);
  z-index: 99;
  .pop_main {
    background: #FFFFFF;
    padding-top: 20rpx;
    padding-bottom: 24rpx;
    border-radius: 0px 0px 40rpx 40rpx;
    height: 100%;
    .pop_row {
      margin: 0 28rpx 20rpx;
      .row {
        display: flex;
        flex-wrap: wrap;
        .row_item {
          width: 160rpx;
          height: 56rpx;
          line-height: 56rpx;
          text-align: center;
          background: #F5F5F5;
          border-radius: 10rpx;
          font-size: $font-size-tag;
          color: #676767;
          margin-right: 18rpx;
          margin-bottom: 20rpx;
        }
        .row_item_on {
          background-color: $color-title2!important;
          color: #fff!important;
        }
      }
    }
    .pop_operation {
      display: flex;
      justify-content: space-between;
      margin: 60rpx 28rpx 0;
      .btn {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 10rpx;
        font-size: $font-size-toolbar;
      }
      .btn_cancel {
        width: 160rpx;
        border: 2rpx solid #E7E7E7;
        margin-right: 30rpx;
        color: #9A9A9A;
      }
      .btn_confirm {
        width: 510rpx;
        background: $color-title2;
        color: #fff;
      }
    }
  }
}
// 排序
.pop_main {
  .pai_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 28rpx;
    .dui {
      width: 28rpx;
      height: 20rpx;
    }
  }
}
//品牌
.pop_main {
  .pmain_l {
    background: #F5F5F5;
    width: 160rpx;
    height: 100%;
    .pmain_l_item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80rpx;
      color: #343434;
    }
    .pmain_l_item_on {
      position: relative;
      background: #fff!important;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 6rpx;
        height: 40rpx;
        background: #00BC7E;
      }
    }
  }
  .pmain_r {
    width: calc(100% - 160rpx);
    background-color: #fff;
    height: 100%;
    .pmain_r_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 28rpx 20rpx 40rpx;
      color: #343434;
      .dui {
        width: 28rpx;
        height: 20rpx;
      }
    }
    .pmain_r_item_on {
      color: $color-title2;
    }
  }
}


</style>