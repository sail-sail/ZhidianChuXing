<template>
  <view>
    <u-popup :show="show"   mode="bottom" round="20" :closeOnClickOverlay="false">
      <view class="popDialog">
        <view class="popTime">
          <view>取车时间</view>
          <view>还车时间</view>
        </view>
        <picker-view class="picker" :value="value" @change="getime" indicator-style="height:30px;">
        	<picker-view-column>
        		<view class="hours" style="line-height:30px; text-align: center;" v-for="(item,index) in hoursList" :key="index">{{item}}时</view>
        	</picker-view-column>
        	<picker-view-column>
        		<view class="minutes" style="line-height:30px; text-align: center;" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
        	</picker-view-column>
        	<picker-view-column>
        		<view style="line-height:30px; text-align: center;">-</view>
        	</picker-view-column>
        	<picker-view-column>
        		<view class="hours" style="line-height:30px; text-align: center;" v-for="(item,index) in hoursList" :key="index">{{item}}时</view>
        	</picker-view-column>
        	<picker-view-column>
        		<view class="minutes" style="line-height:30px; text-align: center;" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
        	</picker-view-column>
        </picker-view>
        <view class="pop_operation">
          <view class="btn btn_cancel" @click="cancel()">关闭</view>
          <view class="btn btn_confirm" @click="confirm()">确定</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  let minutes=[]
  for (let i = 0; i <= 59; i++) {
  	if(i<10){
  		i="0"+i
  	}
    minutes.push(i)
  }
  export default {
    name:"time-range",
    props:{
    	time:{
    		type: Array,
    		default() {
    			return ['14','00','0','14','00'];
    		}
    	},
      show: {
        type: Boolean,
        default: false
      }
    },
    watch:{
    	time:function(){
    		this.value=this.time
    	}
    },
    data() {
      return {
        value:this.time,//默认结束开始时间
        hoursList:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
        minutes,
      };
    },
    methods:{
    	confirm(){
    		let time = this.value[0]+":"+this.value[1]+"-"+this.value[3]+":"+this.value[4];
        let timeValue = this.value[0]+"时"+this.value[1]+"分"+"-"+this.value[3]+"时"+this.value[4]+"分";
        
        let startTime = this.value[0]+":"+this.value[1];
        let endTime = this.value[3]+":"+this.value[4];
        
    		this.$emit("confirm",{time:time,timeValue: timeValue,startTime: startTime, endTime: endTime})
    	},
    	cancel(){
    		let time = this.value[0]+":"+this.value[1]+"-"+this.value[3]+":"+this.value[4];
        let timeValue = this.value[0]+"时"+this.value[1]+"分"+"-"+this.value[3]+"时"+this.value[4]+"分";
        
        let startTime = this.value[0]+":"+this.value[1];
        let endTime = this.value[3]+":"+this.value[4];
        
    		this.$emit("cancel",{time:time,timeValue: timeValue,startTime: startTime, endTime: endTime})
    	},
    	getime(e){
    		let val = e.detail.value
    		this.value[0] = this.hoursList[val[0]] 
    		this.value[1] = this.minutes[val[1]] 
    		this.value[2] = val[2]
    		this.value[3] = this.hoursList[val[3]] 
    		this.value[4] = this.minutes[val[4]]
    	},
    }
  }
</script>

<style lang="scss" scoped>
.popDialog {
  padding: 40rpx 40rpx 20rpx;
  .popTime {
    display: flex;
    view {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  .picker{
  	width: 100%;
  	height: 300rpx;
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
      border: 2rpx solid $color-title2;
      margin-right: 24rpx;
      color: $color-title2;
    }
    .btn_confirm {
      width: 370rpx;
      background: $color-title2;
      color: #fff;
    }
  }
}
</style>