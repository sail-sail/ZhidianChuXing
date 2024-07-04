import Taro from '@tarojs/taro'

function login() {
  wx.getUserProfile({
    desc: '获取用户个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res, '获取用户个人信息')
      if (res.errMsg == 'getUserProfile:ok') {
        // 本地存储
        // getCode((data) => {
        //   if (data) {
        //     this.authLogin(data);
        //   }
        // });
      }
    },
    fail:(err)=>{
      console.log(err)
    }
  })
}

function getCode(callback) {
  uni.login({
    provider: 'weixin',
    timeout: 3000,
    success: res => {
      if (res.code) {
        typeof callback == 'function' && callback(this.authInfo);
      }
    },
    fail: () => {
    }
  })
}



const auth = {
  login
}

export default auth
