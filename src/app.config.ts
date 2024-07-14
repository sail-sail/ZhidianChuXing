export default defineAppConfig({
  pages: [
    'pages/my/my',
    'pages/vehicleDetail/vehicleDetail',
    'pages/index/index',
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
    'pages/vehicleModel/vehicleModel',

    'pages/order/order',
    'pages/orderTab/orderTab',
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
        pagePath: 'pages/orderTab/orderTab',
        text: '订单'
      },
      {
        pagePath: 'pages/my/my',
        text: '我的'
      }
    ]
  },
  permission: {
    "scope.userLocation": {
      "desc": "同意此应用获取你的地理位置"
    }
  },
  requiredPrivateInfos: ["getLocation", "chooseLocation"],
  lazyCodeLoading:'requiredComponents'
})
