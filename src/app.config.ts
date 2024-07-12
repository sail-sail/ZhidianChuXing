export default defineAppConfig({
  pages: [
    'pages/my/my',
    'pages/index/index',
    'pages/vehicleModel/vehicleModel',
    'pages/carRentalNotice/carRentalNotice',
    'pages/carRentalNotice/detail/detail',
    'pages/openVip/openVip',
    'pages/enterpriseVehicles/enterpriseVehicles',
    'pages/carOwner/carOwner',
    'pages/vehicleAssociation/vehicleAssociation',
    'pages/orderList/orderList',
    'pages/realNameAuthentication/realNameAuthentication',
    'pages/privacyStatement/privacyStatement',
    'pages/serviceAgreement/serviceAgreement',
    'pages/userAgreement/userAgreement',
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
