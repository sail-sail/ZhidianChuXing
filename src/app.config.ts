export default defineAppConfig({
  pages: [
    'pages/orderDetail/orderDetail',

    'pages/index/index',
    'pages/my/my',

    'pages/vehicleModel/vehicleModel',
    'pages/vehicleAssociation/vehicleAssociation',
    'pages/vehicleDetail/vehicleDetail',

    'pages/orderTab/orderTab',
    'pages/orderList/orderList',
    'pages/order/order',

    'pages/carRentalNotice/carRentalNotice',
    'pages/carRentalNotice/detail/detail',

    'pages/openVip/openVip',
    'pages/carOwner/carOwner',
    'pages/enterpriseVehicles/enterpriseVehicles',
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
