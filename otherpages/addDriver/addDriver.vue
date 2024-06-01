<template>
  <view class="container">
    
    <view class="rowCon">
      <view class="row acea-row  row-middle" >
         <text class="row-tit">驾驶人</text>
          <view class="rowRight">
             <input type="text" placeholder="请填写驾驶员真实姓名，需与证件一致"  v-model="form.name">
          </view>
        </view>
        
        <view class="row acea-row  row-middle" >
         <text class="row-tit">身份证</text>
          <view class="rowRight">
             <input type="text" placeholder="请填写驾驶员身份证号，需与证件一致"  v-model="form.card">
          </view>
        </view>
        
        <view class="row acea-row  row-middle" >
         <text class="row-tit">手机号</text>
          <view class="rowRight">
             <input type="text" placeholder="用于接收订单短信通知"  v-model="form.mobile">
          </view>
        </view>
        
    </view>
    
    <view class="footer">
      <button type="primary" @click="submit()">保存</button>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          card: '',
          mobile: '',
          id: ''
        }
      }
    },
    onLoad(option) {
      if(option.param) {
        let param = JSON.parse(option.param);
        this.form = param;
      }
    },
    methods: {
      submit() {
        if(!this.form.name) {
          this.$util.showToast({title: '驾驶人姓名不能为空！'});
          return
        }
        if(!this.form.card) {
          this.$util.showToast({title: '驾驶人身份证号不能为空！'});
          return
        }
        if(!this.form.mobile) {
          this.$util.showToast({title: '驾驶人手机号不能为空！'});
          return
        }
        this.$api.sendRequest({
          url: '/api/index.user/driverAdd',
          data: {
            name: this.form.name,
            no: this.form.card,
            mobile: this.form.mobile,
            id: this.form.id
          },
          success: res => {
            if(res.code == 1) {
              this.$util.showToast({title: "提交成功"});
              uni.navigateBack({
                delta:1
              })
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
.rowCon {
  background-color: #fff;
  padding: 0 28rpx;
  margin: 24rpx 0 32rpx;
  .row {
      height: 94rpx;
      border-bottom: 2rpx solid #F2F2F2;
      &:last-child {
        border-bottom: none;
      }
      .row-tit {
        display: inline-block;
        width: 158rpx;
        color: #323232;
      }
      .rowRight {
        flex: 1;
        input {
          color: #333333;
           text-align: left;
           font-size: $font-size-tag;
        }
      }
    }
}
.footer {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 28rpx 0;
  button {
    margin: 0;
    width: 100%;
    background: $color-title2;
    border-radius: 8rpx;
    color: #fff;
  }
}
</style>
