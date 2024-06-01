<template>
    <view class="container">
       
        <view class="calendar">
            <calendar ref="calendar" v-if="isShow" @cancel="cancel" :startDate="startDate" :height="height" :endDate="endDate" @selectDate="selectDate" :limit="limit" :bottom1="bottom1" :yimanArray="yimanArray" />
        </view>
        
    </view>
</template>
<script>
   
	  import calendar from '@/components/dc-calendar/dc-calendar.vue'
    export default {
    components: {
			calendar
    },
    data() {
          return {
            isShow:false,
            startDate:'',     //开始日期2022-01-26
            endDate:'',       //结束日期 2022-01-29
            height:600,                 //日历容器高度
            limit:12,                    //展示月份数量
            bottom1:0,
            yimanArray:[],
            dicdes:{
            price:1
            },//传过来的订单数据
            type:0,//1是进入订单 0是返回
        }
    },
    mounted() {

    },
    onUnload() {
      uni.setStorageSync('满房日期显示',0)
    },
		onLoad(e) {
			
			uni.showLoading({
			    title: '加载中'
			});
			
			let sys = uni.getSystemInfoSync();
			if (sys.statusBarHeight >=44) {
				this.bottom1 = 34;
			} else{}
			
			var  dicday = uni.getStorageSync('pickupdate');
			if(dicday){
				this.startDate = dicday.startDate;
				this.endDate = dicday.endDate;
			}else {
        this.newdate();
      }
			
			
			this.type = 1;
			uni.setStorageSync('满房日期显示',1)
			// //取房间满房日期
			this.gethttpurl(this.dicdes.id);
		
		},
    methods: {
      //-----------------------------日历-------------------------------------------------------
			//取房间满房日期
			gethttpurl(id){
				this.yimanArray =['2022-03-25','2022-04-10'];
				this.isShow = true;
				uni.hideLoading();
			},
      // 展示选择器
      showCalendar() {
          this.isShow = true
      },
      // 隐藏选择器
      cancel(){
          this.isShow=false
      },
      // 获取传参
      selectDate(data) {
        console.log('拿到传参', data);
        // uni.setStorageSync('pickupdate',data);
        uni.setStorage({
          key:'pickupdate',
          data: data,
          success() {
            uni.navigateBack({
              delta:1
            })
          }
        })
      },
			// 获取当日的 年-月-日
			newdate() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let week = date.getDay()
				let day = date.getDate()
				var days = new Date(year, month, 0).getDate(); //总共多少天
				// console.log(days,day);
				month = month < 10 ? '0' + month : month
				day = day < 10 ? '0' + day : day
				let today = `${year}-${month}-${day}`;
				let todayend = `${year}-${month}-${day}`;
				let today1 = `${month}月${day}日`;
				let today1end = `${month}月${day}日`;
				//加年
				if (month == 12 && parseInt(day) == parseInt(days)) {
			
					let day01 = '01';
					let month01 = '01';
					let year01 = parseInt(year) + 1;
					todayend = `${year01}-${month01}-${day01}`;
					today1end = `${year01}年${month01}月${day01}日`;
				} else if (parseInt(day) == parseInt(days)) {
					//加月
					let day01 = '01';
					let month01 = parseInt(month) + 1;
					month01 = month01 < 10 ? '0' + month01 : month01
					todayend = `${year}-${month01}-${day01}`;
					today1end = `${month01}月${day01}日`;
			
				} else {
					//加天数
					let day01 = parseInt(day) + 1;
					day01 = day01 < 10 ? '0' + day01 : day01
					todayend = `${year}-${month}-${day01}`;
					today1end = `${month}月${day01}日`;
				}
				
				let  dicday = {
					startDate: today,
					endDate: todayend,
					startDate1: today1,
					endDate1: today1end,
					dayNum: '1'
				}
				
				this.startDate = dicday.startDate;
				this.endDate = dicday.endDate;
				uni.setStorageSync('入离日期', dicday);
				// console.log(this.dicday);
			},
      //------------------------------------日历 end------------------------------------------------------------
      
      }
    }
</script>

<style lang="scss">

</style>
