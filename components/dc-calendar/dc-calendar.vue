<template>
	 <!-- 使用方法 -->
	 <!-- 
	 1.传入参数startDate为开始时间
	 2.传入参数endDate为结束时间
	 3.传入limit为需要渲染的月份数
	 4.点击确认导出选择的日期参数{startDate,endDate,dayNum}
	  -->
	  
	
	<!-- 布局构思 -->
	<!-- 考虑能通过自适应应对高度需求 -->
	<!-- 使用方法：在页面限制使用容器作为节点挂载该组件，并对节点设置heigth，以达到想要的高度，头部80rpx，底部按钮112rpx安全区域，若是要自定义样式请自行修改dateView的定位值 -->

		<!-- <view class="container" :animation="animationData" :style="{height:height+'px'}"> -->
		<view class="container" >
			<view class="navTop">
			<!-- 	<view class="cancel" @tap="cancel()">取消</view>
				<view class="title">日期选择器</view> -->
				<view class="navTopstar">
					<view class="navTopstar0">
					<view class="name">
						{{startday0}}
					</view>
					<view class="name1">
						取车日期	
					</view>
					</view>
					<view class="name2">
						{{startweek0}}
					</view>
				</view>
				<view class="navTopxianview">
					<view class="navTopxianname">
						共{{dayNum1}}天
					</view>
					<view class="navTopxian">
						
					</view>
				</view>
				
				<view class="navTopstar">
					<view class="navTopstar1">
					<view class="name">
						{{endday0}}	
					</view>
					<view class="name1">
						还车日期	
					</view>
					</view>
					<view class="name2">
						{{endweek0}}
					</view>
				</view>
				
				
				
			</view>
			<!-- 周一至周日 -->
			<view class="week">
				<view v-for="(item,index) in weekList" :class="{sunDay:index==0}" :key="index">{{item.title}}</view>
			</view>
			<!-- 日期的显示容器 -->
		<scroll-view scroll-y="true" class="dateView"   :scroll-top="scrollTop" >
			
			<view class="date" v-for="(item,index) in dateList" :key="index">
				<view class="yearAndMonth" :id="'yearAndMonth'+index">{{item.year}}年{{item.month}}月</view>
				<view class="dayList">
					<view v-for="(day,No) in item.dayArray" @click="chooseDate(item.year,item.month,day,item.dayArray,index,No)" :class="['day',dealClassStyle(item.year,item.month,day)]" :key="No">
						<view class="startDate1" >
						
						<!-- <view class="today" v-if="dealTimeString(`${item.year}-${item.month}-${day}`)==dealTimeString(today)">
							<view>今天</view>
						</view> -->
						
											
						<view class="star" v-if="dealTimeString(`${item.year}-${item.month}-${day.num}`)==startTimeString">
							<view>开始</view>
						</view>
						
						<view class="end" :class="{same:endTimeString==startTimeString}" v-if="dealTimeString(`${item.year}-${item.month}-${day.num}`)==endTimeString">
							<view>结束</view>
						</view>
						
						
						<!-- <block v-if="seleStaAend == 0"> -->
							<block v-if="dealTimeString(`${item.year}-${item.month}-${day.num}`)==startTimeString && day.status==1 ">
								
							</block >
								<block v-else-if ="dealTimeString(`${item.year}-${item.month}-${day.num}`)==endTimeString&& day.status==1">
									
								</block >
									<block v-else>
									<view class="yiman" v-if="day.status==1">
										
										<view >已满</view>
									</view>
									</block >
						<!-- </block> -->
						<block v-if="seleStaAend == 1 && seleSta ==0">
							<view class="yiman" v-if="day.status==1">
								
								<view >已满</view>
							</view>
						</block>
				
						<view>{{day.num}}</view>
							
						</view>
						
						
					</view>
				</view>
			</view>
			
			
			
			
		</scroll-view>
			
			<!-- 底部按钮 -->
			<view class="btnGroup" :style="{bottom:bottom1+'rpx'}">
        <view class="btnTips acea-row row-middle row-center" @click="showRange = true">{{timeRange.time?timeRange.timeValue:'请选择取/还车具体时间'}}<u-icon name="arrow-right" color="#00BC7E"></u-icon></view>
        <view class="btnGroup-btn">
          <view class="reset" @click="reset()">重置</view>
          <view class="confirm" @click="confirmChoose()">确认</view>
        </view>
			</view>
      
      <!-- 引入时间范围组件 -->
      <time-range :show="showRange" @cancel="cancelRange" @confirm="confirmRange"></time-range>
      
		</view>
</template>
<script>
   import timeRange from '@/components/time-range/time-range.vue'
	// js构思
	// 1.获取当日 的 日期 ， 编写function处理出渲染数据
	// 2.编写function，可通过传入的年 月 获取当月的天数 （涉及处理闰年 闰月 大月 小月 ） 注：获取每月1号是周几，在获取的天数数组前推进对应上月天数空白项
	// 3.编写function，可通过开始日期以及limit限制获取需要渲染的月份日历格式为{year:"xxxx-xx-xx",month:"xx",dateArray:"[1,2,3,4,5,6...]" }
	// 4.编写function，可通过传入的年月日通过处理出的时间戳来给日期动态添加样式类名
	// 5.编写function，选择时间时传入年月日，并处理出时间戳，替换默认开始与结束时间时间戳达到替换样式效果
	import alldate from "./AllDate.js"
	export default {
    components: {
    	timeRange
    },
		props: {
			// 开始日期
			startDate: {
				type: String,
				default: ''
			},
			// 结束日期
			endDate: {
				type: String,
				default: ''
			},
			// 限制显示的月份
			limit: {
				type: String | Number,
				default: 6
			},
			height:{
				type: String |Number,
				default: 600
			},
			
			bottom1:{
				type: String |Number,
				default: 0
			},
			//已满数组
			yimanArray: {
				type: Array,
				default: () => []
			},
			
			
		},
	
		data() {
			return {
				year: '',			//当年
				month: '',			//当月
				week: '',			//当天是周几
				day: '',			//当天的号数
				today: '',			//当天
				todayTimeString: '', //当日时间戳
				startTimeString: '', //开始的时间戳，重要，用于多个地方的判断
				endTimeString: '',   //结束的时间戳，重要，用于多个地方的判断
				startday0:'',//开始日期
				startweek0:'',//开始周
				endday0:'',   //结束日期
				endweek0:'',//结束周
				dayNum1:1,  //共多少晚
				weekList1:['周日','周一','周二','周三','周四','周五','周六'],
				timeArr:[],			//选择事件时的开始/结束时间戳数组
				dateList: [],		//用于渲染的日历数据合集
				weekList: [{		//周的抬头
					title: '日',
					index: 0
				}, {
					title: '一',
					index: 1
				}, {
					title: '二',
					index: 2
				}, {
					title: '三',
					index: 3
				}, {
					title: '四',
					index: 4
				}, {
					title: '五',
					index: 5
				}, {
					title: '六',
					index: 6
				}],
				animationData:{},
				animation:{},
				speck:300,
				seleyiman:0,//是否选中已满
				seleStaAend:0,//开始时候和结束时间是否都是已满的
				seleSta:0,//是否开始选择
				fwArray:[],//范围数组
				startindex1:0,//开始年月的数组位置
				startindex2:0,//开始天的数组位置
				endindex1:0,//结束年月的数组位置
				endindex2:0,//结束天的数组位置
				startAndend:0,
				currtag:0,
				scrollTop:0,
				// animationMask:{},
				// animationDataMask:{}
        //时间范围数据
        showRange: false,
        timeRange: {
          time: '',
          timeValue: '',
          startTime: '',
          endTime: ''
        }
        
			}
			
		},
		mounted() {
			
			this.init()
			var animation = uni.createAnimation({
				duration:this.speck,
				timingFunction: 'ease'
			})
			this.animation =animation
			this.showCalendar()
			console.log(this.yimanArray);
      
      //计算时间范围
      if(uni.getStorageSync('pickupdate')) {
        let pickupdate = uni.getStorageSync('pickupdate');
        this.timeRange.time = `${pickupdate.startTime}-${pickupdate.endTime}`;
        this.timeRange.startTime = pickupdate.startTime;
        this.timeRange.endTime = pickupdate.endTime;
        //改变形式
        let e1 = pickupdate.startTime.split(':');
        let e2 = pickupdate.endTime.split(':');
        this.timeRange.timeValue = `${e1[0]}时${e1[1]}分-${e2[0]}时${e2[1]}分`;
      }
		},
		
		beforeCreate() {
			
		

		
			
			
			setTimeout(() => {
				
				// this.currtag = 2;
			// this.dealDateList1();
			let pid = '#yearAndMonth' + this.currtag;
			console.log(pid);
			let dom = uni.createSelectorQuery().in(this);
			dom.select(pid).boundingClientRect();
			dom.exec(data => {
				console.log('当前位置', data);
				this.scrollTop = data[0].top -200;
				let istop = data[0].top;
				// console.log(istop);
				// uni.pageScrollTo({
				// 	duration: 0,
				// 	scrollTop: istop ,//滚动到实际距离是元素
				// 	complete(e) {
				// 		console.log('成功',e);
				// 	},
				// 	fail(r) {
				// 		console.log(r);
				// 	}
				// })
				
			});
				}, 
			  	500);
		},
		
		
		
		methods: {
      //----------------------时间范围-----------------------------------
      cancelRange(e) {
        this.showRange = false;
        this.timeRange = e;
      },
      confirmRange(e) {
        console.log('88',e)
        this.showRange = false;
        this.timeRange = e;
      },
      //----------------------时间范围 end-------------------------------
      
			// 初始化
			init(){
				this.ajaxDate()					//先处理当天的日期
				this.dealStarAndEndDay()		//处理传入参数
				this.dealman2() //开始时候和结束时间是否都是已满的
				this.dealDateList()				//处理出最终渲染数据
				// let array = this.$base.getAllDate(this.startDate,this.endDate);
				let  array = alldate.getAllDate(this.startDate,this.endDate);//判断选择日期是否有已满日期 如果满了就清空选择状态
				
				console.log('---------',array);
				 let sta = this.dealman3(array);
				 if(sta ==1){
					 this.startTimeString ='';
					 this.endTimeString = '';
					 
				 }
				
				
				
				
			},
			hideCalendar(){
				this.animation.bottom(-this.height).step()
				this.animationData = this.animation.export()
			},
			showCalendar(){
				this.animation.bottom(0).step()
				this.animationData = this.animation.export()
			},
			// 取消事件，未定义，请自行编写取消时的方法
			cancel(){
				console.log('隐藏')
				this.hideCalendar()
				setTimeout(()=>{
					this.$emit('cancel')
				},this.speck)
				
			},
			// 重置选择
			reset(){
				this.timeArr = new Array() 											//清空数组
				this.startAndend =0;
				this.startTimeString = ''											//清空开始时间的时间戳
				this.endTimeString = ''												//清空结束时间的时间戳
				// this.init()															//重新计算日期并赋予样式类名
			},
			// 确认选择时间
			confirmChoose(){
			let reg = /\S/;															//非空正则
			if(reg.test(this.startTimeString)&&reg.test(this.endTimeString)){		//判断开始与结束时间不为空方能导出时间并调取selectDate传参事件
				let startDate = this.dealDate(this.startTimeString)
				let endDate = this.dealDate(this.endTimeString)
				
				let startDate1 = this.dealDate1(this.startTimeString)
				let endDate1 = this.dealDate1(this.endTimeString)
				let dayNum = ((this.endTimeString - this.startTimeString)/1000/3600/24)
				
				let man = this.dealman(startDate); //已满
				let man01 = this.dealman(endDate); //已满
				if(man == 1 && man01 == 1){
					
					uni.showToast({
						title:"你选择了的房间已满 请重新选择",
						icon:'none'
					})
					return
				}
				if(dayNum < 1){
					uni.showToast({
						title:"请选择离店日期",
						icon:'none'
					})
					return
				}
				
				// 用于展示，可删除
				// uni.showModal({
				// 	title:'提示',
				// 	content:`你选择了${startDate}至${endDate},总共${dayNum}天`
				// })
				// 此处调用传参 
				this.$emit('selectDate',{
          startDate:startDate,
          endDate:endDate,
          startDate1:startDate1,
          endDate1:endDate1,
          dayNum:dayNum,
          time: this.timeRange.time,
          timeValue: this.timeRange.timeValue,
          startTime: this.timeRange.startTime,
          endTime: this.timeRange.endTime,
        })
				////隐藏
				// setTimeout(()=>{													
				// 	this.$emit('cancel')
				// },this.speck)										
				// this.hideCalendar()
			}else{
				uni.showModal({
					title:'提示',
					content:`尚未选择时间`
				})
			}
				
			},
			// 选择开始结束日期
			chooseDate(year,month,day,dayarray,index1,index2){
				
				// console.log();
				//res.slice(0,3)
				let time = `${year}-${month}-${day.num}`
				let timeString = new Date(time).getTime()
				
				this.seleyiman = 1;
				this.seleSta = 1;
				
				let man =day.status;//已满 1为已满
										
				man = this.dealman1(timeString,man);
			 // console.log(man);
			 if(this.startTimeString ==''){
			 	man =day.status;
			 }
				if (man == 1) {
					uni.showToast({
						title:"不能选择已住满的房间",
						icon:'none'
					})
						this.seleyiman = 0;
					return
				}
				this.seleyiman = 0;
				
			
			if(timeString>=this.todayTimeString){						//选择的时间必须大于等于今天，过期时间不给选择
				// console.log(0);
				// this.startAndend ++;
				// if(this.startAndend == 1){
					
				// 	this.startTimeString = timeString
				// 	this.endTimeString = timeString
				// 	this.startindex1 =index1;
				// 	this.startindex2 = index2;
				// 	this.endindex1 =index1;
				//     this.endindex2 = index2;
					
				// }else{
					
				// 	if(this.startAndend%2 ==0){
				// 		console.log('开始');
				// 		if (timeString > this.startTimeString) {
				// 			this.endindex1 =index1;
				// 			this.endindex2 = index2;
				// 			this.endTimeString = timeString
							
				// 		}else if(timeString < this.startTimeString){
							
				// 			this.startTimeString = timeString
				// 			this.startindex1 =index1;
				// 			this.startindex2 = index2;
				// 		}
						
				// 	}else{
				// 		console.log('结束');
						
				// 	if (timeString > this.endTimeString) {
				// 		this.endindex1 =index1;
				// 		this.endindex2 = index2;
				// 		this.endTimeString = timeString
						
				// 	}else if(timeString < this.endTimeString){
						
				// 		this.startTimeString = timeString
				// 		this.startindex1 =index1;
				// 		this.startindex2 = index2;
				// 	}
					
				// 	}
					
				// 	// console.log('开始位置',this.startindex1,this.startindex2);
				// 	// console.log('结束位置',this.endindex1,this.endindex2)
				// 	// let kaishiarray = this.dateList[this.startindex1].dayArray;
				// 	// let  kaishiarray1 = kaishiarray.slice(this.startindex2,kaishiarray.length);
					
				// 	// let endarray = this.dateList[this.endindex1].dayArray;
				// 	// let  endarray1 = endarray.slice(this.endindex2,kaishiarray.length);
					
				// 	// // console.log(kaishiarray1);
				// 	// let array01 =[];
				// 	// let kai = this.startindex1 + 1;
				// 	// for (var i = kai; i < this.endindex1; i++) {
				// 	// 	let ppdic = this.dateList[i];
						
						
				// 	// }
					
					
					
				// }
				
				
				
			
					if(this.timeArr.length>=2 ){								//如果数据量大于等于2证明已是多次选择，需做判断
						
						let dic = {
							time:timeString,
							index1:index1,
							index2:index2,
						}
						
				
						this.timeArr.shift(0,1)								//删掉第一条时间
		
						this.timeArr.push(dic)						        //并推入新选择时间
						let time0 = this.timeArr[0];
						let time1 = this.timeArr[1];
						
						if(time0.time<time1.time){				//若是[0]小于[1]
							this.startTimeString = time0.time			//则[0]为开始时间
							this.endTimeString = time1.time			//[1]为结束时间
							
							console.log(1);
							this.startindex1 =time0.index1;
							this.startindex2 = time0.index2;
							this.endindex1 =time1.index1;
							this.endindex2 = time1.index2;
						}else if(time0.time>time1.time){			//若是[0]大于[1]
						
							this.startTimeString = time1.time			//则[1]为开始时间
							this.endTimeString = time0.time			//[0]为结束时间
							console.log(2);
						
							
							this.startindex1 =time1.index1;
							this.startindex2 = time1.index2;
							this.endindex1 =time0.index1;
							this.endindex2 = time0.index2;
							
						}else if(time0.time==time1.time){	
							console.log(3);
							this.startTimeString = time0.time
							this.endTimeString = time1.time
							this.startindex1 =index1;
							this.startindex2 = index2;
							this.endindex1 =index1;
							this.endindex2 = index2;
						}
					
					}else if(this.timeArr.length===1 ){						//若是数据量为1，亦需做判断
						// console.log(1);
						let dic = {
							time:timeString,
							index1:index1,
							index2:index2,
						}
						this.timeArr.push(dic)
						this.startTimeString = this.timeArr[0].time
						
						let time0 = this.timeArr[0];
						let time1 = this.timeArr[1];
						
						if(time0.time<time1.time){				//若是[0]小于[1]
							this.startTimeString = time0.time			//则[0]为开始时间
							this.endTimeString = time1.time			//[1]为结束时间
							console.log(4);
							this.startindex1 =time0.index1;
							this.startindex2 = time0.index2;
							this.endindex1 =time1.index1;
							this.endindex2 = time1.index2;
							
						}else if(time0.time>time1.time){			//若是[0]大于[1]
							this.startTimeString = time1.time			//则[1]为开始时间
							this.endTimeString = time0.time			//[0]为结束时间
							console.log(5);
							this.endindex1 =time0.index1;
							this.endindex2 = time0.index2;
							this.startindex1 =time0.index1;
							this.startindex2 = time0.index2;
							
							
						}else if(time0.time==time1.time){		
							console.log(6);
							this.startTimeString =time0.time
							this.endTimeString = time1.time
							this.startindex1 =index1;
							this.startindex2 = index2;
							this.endindex1 =index1;
							this.endindex2 = index2;
						}
						
						
					}else{		
						//若是数据量为1，证明是第二次选择，正常将数据推入数组即可
					// 
						// console.log(3);
						let dic = {
							time:timeString,
							index1:index1,
							index2:index2,
						}
						this.timeArr.push(dic)
						this.startTimeString = this.timeArr[0].time
						this.endTimeString = this.timeArr[0].time
						this.startindex1 =index1;
						this.startindex2 = index2;
						this.endindex1 =index1;
						this.endindex2 = index2;
						
						
					}
				// 	console.log('timeArr',this.timeArr)
					
					console.log('开始位置',this.startindex1,this.startindex2);
					console.log('结束位置',this.endindex1,this.endindex2);
					
				
				if (this.startindex1 == this.endindex1) {
					let  kaishiarray1 = dayarray.slice(this.startindex2,this.endindex2+1);
					
					console.log(kaishiarray1);
					this.dealshow1(year,month,timeString,kaishiarray1,index1,index2); ////判断选中的是否有 （已满）房间
					
				} else{
					console.log(7);
					for (let i = this.startindex1; i <= this.endindex1; i++) {
						
						let kaidic = this.dateList[i];
						// let kaishiarray1 = this.dateList[i].dayArray;
						// console.log(kaidic);
						//判断选中的是否有 （已满）房间
						this.dealshow1(kaidic.year,kaidic.month,timeString,kaidic.dayArray,index1,index2);
					
					}
					
					
				}
				
			
					
					this.dealshow(); //处理 头部显示  入住日期 离店日期
					console.log('timeArr',time);
				}else{
					uni.showToast({
						title:"选择日期不能小于当天！",
						icon:'none'
					})
				}
				
				 // uni.hideLoading();
			},
			// 处理返回事件戳 用于数据对比，展示开始 结束 标签
			dealTimeString(time){
				return new Date(time).getTime()
			},
			// 处理出dateList用于最终渲染
			dealDateList() {
				// console.log(this.yimanArray);
				
				let start;							
				// if (this.startDate) {									//如果开始时间不为空则以开始时间为开始月份的基准
				// 	start= this.startDate.replace('/','-')
				// } else {												//否则以当日时间为开始月份的基准
				// 	start = this.today
				// }
				let  start1 =  this.startDate.replace('/','-')
				let year1 = new Date(start1).getFullYear();
				let month1 = new Date(start1).getMonth()+1;
				month1=month1<10?'0'+month1:month1
				let year2 = `${year1}-${month1}`;
				console.log('年份',year2);
				
				//开始月份
					start = this.today
				let year = new Date(start).getFullYear();
				let month = new Date(start).getMonth();
				let year22 = `${year}-${month}`
				for (let i = 0; i < this.limit; i++) {					//limit默认为渲染6个月
					month++
					if (month > 12) {									//若是月份大于12，年份+1
						month = month - 12								//月份减12
						year = year + 1
					}
					month=month<10?'0'+month:month,
					
					 year22 = `${year}-${month}`
					 // console.log('年份',year22,year2)
					if(year22 == year2){
						this.currtag = i
						console.log('年份',this.currtag)
					}
					
					this.dateList.push({
						year: year,										//年
						month: month,									//月
						dayArray: this.dealDateArray(year, month)		//日数组
						
					})
				}
				// console.log('列表', this.dateList)
			},
			
			
			dealDateList1() {
				// console.log(this.yimanArray);
				
				let start;							
				// if (this.startDate) {									//如果开始时间不为空则以开始时间为开始月份的基准
				// 	start= this.startDate.replace('/','-')
				// } else {												//否则以当日时间为开始月份的基准
				// 	start = this.today
				// }
				//开始月份
					// start = this.today;
					start = '2022-10-08';
					console.log(start);
					
				let year = new Date(start).getFullYear();
				let month = new Date(start).getMonth() + 3;
				for (let i = 3; i < this.limit; i++) {					//limit默认为渲染6个月
					month++
					if (month > 12) {									//若是月份大于12，年份+1
						month = month - 12								//月份减12
						year = year + 1
					}
					month=month<10?'0'+month:month,
					this.dateList.push({
						year: year,										//年
						month: month,									//月
						dayArray: this.dealDateArray(year, month)		//日数组
						
					})
				}
				// console.log('列表', this.dateList)
			},
			
			// 获取传参日期后处理出当天时间戳（重要）
			dealStarAndEndDay() {
				let startTimeString;
				let endTimeString;
				// console.log('开始结束',this.startDate,this.endDate)
				if (this.startDate) {								//若有传开始时间，则处理出开始时间的时间戳，
					startTimeString = new Date(this.startDate.replace('/','-')).getTime()
				} else {
					startTimeString = false
				}
				if (this.endDate) {									//若有传结束时间，则处理出结束时间的时间戳，
					endTimeString = new Date(this.endDate.replace('/','-')).getTime()
				} else {
					endTimeString = false
				}
				this.startTimeString = startTimeString;
				this.endTimeString = endTimeString;
				this.dealshow();
			},
			// 获取当日的 年-月-日
			ajaxDate() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let week = date.getDay()
				
				let day = date.getDate()
				this.year = year
				this.month = month
				this.week = week
				this.day = day
				
				month = month < 10 ? '0' + month : month,
					day = day < 10 ? '0' + day : day,
					this.today = `${year}-${month}-${day}`
				this.todayTimeString = new Date(`${year}-${month}-${day}`).getTime()

			},
			// 传入年份月份返回当月天数
			dealDateArray(year, month) {
		 
				let big = [1, 3, 5, 7, 8, 10, 12]; //每年的大月数组
				let type; //0为闰年 1为平年
				let dayNum; //当月天数
				let dayArray = new Array() //处理返回的当月天数数组
				if ((year % 100 != 0 && year % 4 == 0 && year % 4 != 0) || (year % 100 == 0 && year % 400 == 0)) { //非世纪年能被4整除且不能被100整除为闰年，世纪年能被400整除为闰年
					// console.log('闰年')
					type = 0
				} else {
					type = 1
					// console.log('平年')
				}
				// console.log(big,month);
				
				if (big.includes(parseInt(month))) { 										//属于大月数组为大月，31天
					dayNum = 31
					// console.log('大月', dayNum)
				} else {
					if (month == 2) { 											//闰年2月29天
						if (type == 0) {
							dayNum = 29
							// console.log('闰月', dayNum)
						} else { //平年2月28天
							dayNum = 28
							// console.log('平月', dayNum)
						}
					} else { 													//其余小月30天
						dayNum = 30
						// console.log('小月', dayNum)
					}
				}

				let No = new Date(`${year}-${month}`).getDay() 					// 获取每月的1号是星期几
				for (let i = 0; i < No; i++) { 				   					// 补全日历空白区域，将1号对齐至周几
				let dic ={
					num:'',
					status:0,
				}
				dayArray.unshift(dic)
					// dayArray.unshift('')					   					// 在数组的前面插进空字符串
				}

				for (let i = 1; i <= dayNum; i++) {
					i = i < 10 ? '0' + i : i
					//dayArray.push(i)
					let time1 = `${year}-${month}-${i}`
					let status = this.dealman(time1)
					let dic ={
						num:i,
						status:status,
					}
					
					dayArray.push(dic)
					
				}
				// console.log(dayArray);
				
				return dayArray
			},
			
			// 通过对比处理日期的时间戳返回样式的类名 天数
			dealClassStyle(year,month,day) {
				if(day.num){														//day必须存在，为空字符串不处理
				let that = this;
					let time = `${year}-${month}-${day.num}`			
					let timeString = new Date(time).getTime()
					let todayTimeString = this.todayTimeString
					 
					let man =day.status;//已满 1为已满
					if(this.seleSta == 1){
						man = this.dealman1(timeString,man);
					}
				
				
		
					if(man ==1){
						
						 // let arary =[];
						if(this.seleStaAend ==1){
							// console.log(567);
							return 'overdue'
							
						}else{
							// console.log(789);
						
						if (timeString == this.startTimeString) {					//时间戳等于开始时间时间戳
							return 'startDate'
						} else if (timeString == this.endTimeString) {				//时间戳等于结束时间时间戳
							return 'endDate'
						} else{
							return 'overdue'
						}
						
						}
						
					}
					else
					if (timeString == this.startTimeString) {					//时间戳等于开始时间时间戳
						return 'startDate'
					} else if (timeString == this.endTimeString) {				//时间戳等于结束时间时间戳
						return 'endDate'
					} 
					else
					if (timeString > this.startTimeString && timeString < this.endTimeString) {  //大于开始时间时间戳并小于结束时间时间戳的范围
					// console.log('时间戳的范围',time);
					// let fwdic ={
					// 	num:time,
					// 	status:day.status
					// }
					// console.log('时间戳的范围01',fwdic);
					
					// this.fwArray.push(fwdic);
					// that.fwArray.push(1);
					
					// console.log('时间戳的范围02',that.fwArray);
						return 'scope'
					} else if (timeString == todayTimeString) {									//今天
						return 'toDay'
					} else if (timeString < todayTimeString ) {									//过期时间
						return 'overdue'
					}
					
				}
			},
			// 处理出时间的方法
			dealDate(time=''){
				let date = new Date(time)
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				month = month<10?'0'+month:month;
				day = day<10?'0'+day:day;
				return `${year}-${month}-${day}`
			},
			// 处理出时间的方法
			dealDate1(time=''){
				let date = new Date(time)
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				month = month<10?'0'+month:month;
				day = day<10?'0'+day:day;
				return `${month}月${day}日`
			},
			//已满的状态
			dealman(e){
				
				let show1 = uni.getStorageSync('满房日期显示')
				if(show1 == 1){
					
					// let array =['2022-02-23','2022-02-24'];
					 // let array = uni.getStorageSync('满房日期');
					 // console.log(array);
					let array = this.yimanArray;
					// console.log(array);
					for (let i = 0; i < array.length; i++) {
						let name1 = array[i];
						if (name1 == e) {
							// console.log(e);
							let man =1;
							if(this.seleSta ==1){
						man = this.dealman1(e,man);
						
						}
							
							return man;
							
						} 
					}
					
				}
		
			},
			////如果 结束日期已满 可是开始日期未满 结束日期可以选择未（结束日期）
			dealman1(timeString,man){
					let man01 =man;
					// console.log(timeString,man);
					 // let timeString1 = timeString;
					
						let timeString1 = new Date(timeString).getTime()
					//如果 结束日期已满 可是开始日期未满 结束日期可以选择未（结束日期）
						let end = this.endTimeString;
						if(this.seleyiman == 1){
							end = timeString1;
						}
						// console.log(end,this.startTimeString);
						
					if(timeString1 ==end){
						
					
			
					if(end>this.startTimeString){
						man01 = 0;
					}
						
						
					}
					
					return man01;
					
					},
					
					//开始时间 和结束时间 是否都已满的
					dealman2(e){
						
						let show1 = uni.getStorageSync('满房日期显示')
						if(show1 == 1){
							
							let man00 =0;
							let man01 = 0;
							// let array =['2022-02-23','2022-02-24'];
							let array = this.yimanArray;
							// console.log(array);
							for (let i = 0; i < array.length; i++) {
								let name1 = array[i];
								
							let timeString1 = new Date(name1).getTime()
							if (timeString1 == this.startTimeString) {
								man00 =1;
								}
								if (timeString1 == this.endTimeString) {
									man01 =1;
								
									
								} 
								
							}
							if(man00 == 1 && man01 ==1){
								// console.log(123);
								this.seleStaAend = 1;
							}
							
							
						}
							
					},
					//开始时间 和结束时间 是否都已满的
					dealman3(e){
						
						let show1 = uni.getStorageSync('满房日期显示')
						if(show1 == 1){
							
							let man00 =0;
							let man01 = 0;
							// let array =['2022-02-23','2022-02-24'];
							let array = this.yimanArray;
							let array1 = e;
							// console.log(array);
							for (let i = 0; i < array.length; i++) {
								let name1 = array[i];
								
							for (let i = 0; i < array1.length; i++) {
								let name2 = array1[i];
								
								if(name2 == name1){
									
									if(name2 == this.endDate){
										return 0;
										}
									return 1;
								}
								
							}
								
							
							}
						
						}
							
					},
					
					
			//处理 头部显示  入住日期 离店日期
			dealshow(){
				
				this.startday0 = this.dealDate1(this.startTimeString)
				this.endday0 = this.dealDate1(this.endTimeString)
				this.dayNum1 = ((this.endTimeString - this.startTimeString)/1000/3600/24)
				
				let date1 = new Date(this.dealDate(this.startTimeString))
				let date2 = new Date(this.dealDate(this.endTimeString))
				
				let index1 =date1.getDay();
				let index2 =date2.getDay();
				
				this.startweek0= this.weekList1[index1];
				this.endweek0 = this.weekList1[index2];
				// console.log(index1,index2);
			},
			//判断选中的是否有 （已满）房间
			dealshow1(year,month,timeString,dayarray,index1,index2){
				
				let man02 = 0;
					
					for (let i = 0; i < dayarray.length; i++) {
						let day01 = dayarray[i];
						
						let time1 = `${year}-${month}-${day01.num}`
						let timeString1 = new Date(time1).getTime()
						 let man01 = day01.status; //已满
						 
						  //如果选中的时间范围有一个（已满）就重新开始选择
						 if (timeString1 > this.startTimeString && timeString1 < this.endTimeString) {  //大于开始时间时间戳并小于结束时间时间戳的范围
						 // console.log(time1);
						 if(man01 == 1){
							 man02 = 1;
							 
						 	// console.log('时间戳的范围05',time1);
						 }
						 }
						 //如果开始时间是（已满）就重新开始选择
						 if(timeString1 == this.startTimeString){
							 
							 if(man01 == 1){
							 	 man02 = 1;
							 	
							 }
							 
						 }
						 
					
					}
					if(man02 ==1){
						this.timeArr =[];
						
						let dic = {
							time:timeString,
							index1:index1,
							index2:index2,
						}
						this.timeArr.push(dic)
						this.timeArr.push(dic)
						
						// this.timeArr.push(timeString)
						this.startTimeString = timeString
						this.endTimeString = timeString
						this.startindex1 =index1;
						this.startindex2 = index2;
						this.endindex1 =index1;
						this.endindex2 = index2;
						// return
					}
					
					
				// }
				
			}
			
		}
	}
</script>
<style lang="less" scoped>
	
	/deep/.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	
	
	// 整个容器
	
	.container {
		// position:fixed;
		// position:relative;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		// bottom:-100%;
		top: 0;
		width: 100%;
		height: 100%;
		
		box-sizing: border-box;
		padding: 0 32rpx;
		// 头部操作区域
		.navTop {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 160rpx;
			width: 100%;
			margin-bottom: 30rpx;

			// 取消按钮
			.cancel {
				font-size: 28rpx;
				z-index: 10;
			}

			// 标题
			.title {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				font-size: 32rpx;
				line-height: 80rpx;
				text-align: center;

			}
		}

		// 周容器  周日-周六
		.week {

			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #ededed;
			padding-bottom: 20rpx;
			margin-bottom: 30rpx;
			color:#cecece ;

			view {
				width: 14.2857%;
				text-align: center;
			}
		}

		// 年份以及月份
		.yearAndMonth {
			text-align: center;
			margin-bottom: 30rpx;
		}

		// 日期视口容器
		.dateView {
			position: absolute; //绝对定位
			top: 300rpx; //头部操作区域以及想要的margin-bottomm
			bottom: 112rpx; //底部操作区域高度
			left: 32rpx;
			right: 32rpx;
			
			flex: 1;
			overflow: auto;
			
			width: calc(100% - 64rpx);

			.date {
				margin-bottom: 60rpx;
			}

			.dayList {
				display: flex;
				flex-wrap: wrap;

				.day {
					position: relative;
					width: 14.2857%;
					text-align: center;
					color: #666;
					// height: 100rpx;
					padding: 35rpx 0;
					// padding-top: 10rpx;
				}

				.startDate{
					color: #fff;
					background: #00BC7E;
					border-top-left-radius: 20rpx;
					border-bottom-left-radius: 20rpx;
          view {
            color: #fff!important;
          }
					
				}
				.endDate{
					color: #fff;
					background: #00BC7E;
					border-top-right-radius: 20rpx;
					border-bottom-right-radius: 20rpx;
					view {
					  color: #fff!important;
					}
				}
				

				.star,.end{
					position: absolute;
					top:70rpx;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-size: 20rpx;
				}
				
				
				.same{
					bottom:-63%;
				}

				// 今天
				.today {
					position: absolute;
					top:10rpx;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					height: fit-content;
					color: #50668D;
					font-size: 20rpx;
					view{
						line-height: 24rpx;
						border-bottom: 2rpx solid #F10E31;
					}
				}

				// 今天以前 过期 已满
				.overdue {
					color: #cecece;
					.yiman{
						position: absolute;
						top:70rpx;
						left: 0;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						// color: #fff;
						font-size: 20rpx;
					}
				}
				
				// 选择范围
				.scope {
					background-color: #edf2fa;
					// border-radius: 20rpx;
				}
			}

		}

		// scrollbar隐藏
		.dateView::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
			background-color: transparent;
			display: none;
		}

	}






	/* 周日红色 */
	.sunDay {
		// color: #fe3c3c;
	}



	// 底部按钮区域
	.btnGroup {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 12rpx 32rpx;
		background-color: #fff;
		z-index: 1;
		border-top: 1rpx #ededed solid;
    
    .btnTips {
      padding: 10rpx 0 20rpx;
      text-align: center;
      font-weight: bold;
      color: #00BC7E;
    }
		
		.btnGroup-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      view {
      	height: 80rpx;
      	line-height: 80rpx;
      	text-align: center;
      	border-radius: 10rpx;
      	font-size: 32rpx;
      }
      
      :first-child {
      	width: 200rpx;
      	border: 2rpx solid #00BC7E;
      	margin-right: 24rpx;
      	color: #00BC7E;
      }
      
      :last-child {
      	width: 468rpx;
      	background: #00BC7E;
      	color: #fff;
      
      }
    }

		
	}
	
	.navTopstar{
		
		display: flex;
		
		
	}
	.navTopstar0{
		// width: 33%;
		// margin-left: 30rpx;
		
	}
	.navTopstar1{
		// width: 33%;
		margin-left: 33rpx;
		
	}
	.name{
	
		font-size: 30rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		margin-bottom:10rpx ;
		
		color: #333333;
	}
	.name1{
		font-size: 24rpx;
		color: #999999;
		
		
	}
	.name2{
		font-size: 24rpx;
		color: #333333;
		margin-top: 15rpx;
		margin-left: 5rpx;
	}
	.navTopxianview{
			width: 160rpx;
			margin-left: 33rpx;
			
			
	}
	.navTopxianname{
		
		width: 100%;
		height: 34rpx;
		
		font-size: 24rpx;
		font-family: PingFang SC, PingFang SC-Medium;
		font-weight: 500;
		text-align: CENTER;
		color: #ffa100;
		margin-bottom: 9rpx;
		
	}
	.navTopxian{
		
		width: 160rpx;
		height: 1rpx;
		background-color: #ffa100;
		// border: 1rpx solid #ffa100;
		
	}
</style>
