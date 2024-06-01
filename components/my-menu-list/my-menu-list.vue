<template>
  <view class="row-list">
    <view class="row-item" v-for="(item,index) in menu" :key="index" @click="goRedirect(item)">
      <view class="acea-row row-middle">
        <image :src="item.img" mode="" class="menu-img"></image>
        {{item.name}}
      </view>
      <view class="acea-row row-middle">
        <text v-if="item.sub" class="color-title2">已实名</text>
        <u-icon name="arrow-right" size="15" color="#999999"></u-icon>
      </view>
    </view>
    <button class="row-item" style="margin: 0;background-color: #fff;" open-type="contact">
      <view class="acea-row row-middle">
        <image src="../../static/list6.png" mode="" class="menu-img"></image>
        客服
      </view>
      <view class="acea-row row-middle">
        <u-icon name="arrow-right" size="15" color="#000000"></u-icon>
      </view>
    </button>
    <!-- 引入组件 -->
    <my-call-mobile :show="show" @close="close"></my-call-mobile>
  </view>
</template>

<script>
  import myCallMobile from '@/components/my-call-mobile/my-call-mobile.vue'
  export default {
    name:"my-menu-list",
    components: {
      myCallMobile
    },
    props: {
      userInfo: [Object,Array]
    },
    data() {
      return {
        menu: [{
          img: '../../static/list1.png',
          name: '实名认证',
          sub: 0,
          url: '/otherpages/shiming/shiming'
        },{
          img: '../../static/list2.png',
          name: '隐私声明',
          sub: 0,
          url: '/pages/agree/agree?type=1'
        },{
          img: '../../static/list3.png',
          name: '服务协议',
          sub: 0,
          url: '/pages/agree/agree?type=2'
        },{
          img: '../../static/list4.png',
          name: '用户协议',
          sub: 0,
          url: '/pages/agree/agree?type=3'
        },{
          img: '../../static/list5.png',
          name: '联系平台',
          sub: 0,
          url: ''
        }],
        show: false,
        token: ''
      };
    },
    watch: {
      userInfo: function(nVal, oVal) {  
      	if(nVal.group_id !== 1) {
          // 第一种有点bug,自己复测没有，客户那边会很少出现
          // var obj = {img:'../../static/list7.png',name:'销售登录',sub:'',url: '/pages/user/index/index'};
          // if(JSON.stringify(this.menu).indexOf(JSON.stringify(obj)) === -1) {
          //   this.menu.unshift({
          //     img: '../../static/list7.png',
          //     name: '销售登录',
          //     sub: '',
          //     url: '/pages/user/index/index'
          //   })
          // }
          // 第二种方式
          var arr = this.menu;
          
          // 需要判断的对象
          var newObj = {img:'../../static/list7.png',name:'销售登录',sub:'',url: '/pages/user/index/index'};
          
          // 遍历数组，判断对象是否已存在
          var isExist = false;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === newObj.name) {
              isExist = true;
              break;
            }
          }
          
          // 如果对象不存在，则将其添加到数组中
          if (!isExist) {
            arr.unshift(newObj);
          }
          this.menu = arr;
          
          //第三种
          // 假设存在一个数组 arr 和一个对象 obj
          
          // 判断数组中是否存在某个对象
          // const index = arr.findIndex(item => item.id === obj.id);
          
          // 如果不存在该对象，则将其加入数组
          // if (index === -1) {
          //   arr.push(obj);
          // }
      	}
        if(nVal.is_auth == 1) {
          this.menu.forEach((v,k) => {
            if(v.name == "实名认证") v.sub = 1;
            else v.sub = 0;
          })
        }
      }
    },
    created() {
      this.token = uni.getStorageSync('token') || '';
    },
    methods: {
      goRedirect(item) {
        if(!uni.getStorageSync('token')) return;
        if(item.name == '联系平台') {
          this.show = true;
        }else if(item.name == '销售登录'){
          this.$store.state.siteState = 2;
          this.$util.redirectTo(item.url)
        }else {
          if(item.name == '实名认证') {
            // if(this.userInfo.is_auth == 1) 
            this.$util.redirectTo(item.url+'?auth='+this.userInfo.is_auth);
          }else {
            this.$util.redirectTo(item.url);
          }
             
        }
      },
      close() {
        this.show = false;
      },
    },
  }
</script>

<style lang="scss">
.row-list {
  background-color: #fff;
  border-radius: 20rpx;
  margin: 32rpx 24rpx;
  .row-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 82rpx;
    padding: 0 24rpx;
  }
  .menu-img {
    width: 52rpx;
    height: 52rpx;
    margin-right: 12rpx;
  }
}
</style>