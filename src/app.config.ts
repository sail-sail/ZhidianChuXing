export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/vehicleModel/vehicleModel',
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },

  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/my/my',
        text: '首页2'
      }
    ]
  },
  permission: {
    "scope.userLocation": {
      "desc": "同意此应用获取你的地理位置"
    }
  },
  requiredPrivateInfos: ["getLocation", "chooseLocation"],
})
