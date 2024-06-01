<template>
  <view class="container">
    
    <u-sticky bgColor="#fff">
      <view class="tabsCon">
        <u-tabs :list="tabs" @click="clickTab" 
        lineColor="#ffffff"
        :scrollable="true"
        :activeStyle="{
              color: '#00BC7E'
          }"
          :inactiveStyle="{
              color: 'rgba(0,0,0,0.4)'
          }"></u-tabs>
      </view>
    </u-sticky>
    
    <!-- 列表 -->
    <view class="main m-t-20">
      <car-list v-for="(item,index) in list" :item="item"></car-list>
    </view>
    
  </view>
</template>

<script>
  import carList from '@/components/car-list/car-list.vue'
  export default {
    components: {
      carList
    },
    data() {
      return {
        tabsIndex: 0,
        tabs: [{
          name: '全部',
        },{
          name: '待付款',
        },{
          name: '新任务',
        },{
          name: '待取车',
        },{
          name: '租赁中'
        },{
          name: '已过期'
        },{
          name: '已完成'
        },{
          name: '已取消'
        }],
        list: [],
        page: 1,
        pageSize: 15,
        total: 1,
      }
    },
    onShow() {
      this.getOrderList(true)
    },
    onReachBottom() {
      if(this.page >= this.total) return;
      this.page++;
      this.getOrderList();
    },
    methods: {
      //切换tab
      clickTab(e) {
        this.tabsIndex = e.index;
        this.getOrderList(true)
      },
      //获取订单列表
      getOrderList(refresh) {
        if(refresh) this.page = 1;
        this.$api.sendRequest({
          url: '/api/sale/Index/myOrderList',
          data: {
            page: this.page,
            limit: this.pageSize,
            status: this.tabs[this.tabsIndex].name=='全部'?'':this.tabs[this.tabsIndex].name,
            time: ''
          },
          success: res => {
            if(res.code == 1) {
              if(this.page == 1) this.list = res.data.data;
              else this.list = this.list.concat(res.data.data);
              this.total = res.data.last_page;
            }else {
              this.$util.showToast({title: res.msg});
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
