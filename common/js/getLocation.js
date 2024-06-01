import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js';
export default {
  data() {
    return {
      city: '',
      latitude: "",
      longitude: "",
      address: '',
      qqmapsdk: null,
      key: 'ME2BZ-OAGLQ-JGX5N-GNMHJ-3NMRV-BQFWS',
    }
  },
   onShow() {
     let _this = this;
    if (uni.getStorageSync('location')) {
    	this.city = uni.getStorageSync('location').city;
      this.address = uni.getStorageSync('location').address;
    } else {
    	this.qqmapsdk = new QQMapWX({
    		key: this.key
    	});
    	uni.authorize({
    		scope: 'scope.userLocation',
    		success: res => {
    			console.log(res)
    			uni.getLocation({
    				type: 'wgs84',
            isHighAccuracy: true,
    				success(res) {
              console.log(res)
              _this.latitude = res.latitude;
              _this.longitude = res.longitude;
    					_this.getLocationByLonglat(res.latitude, res.longitude);
    				},
            fail(res) {
              console.log('失败2：', res);
            }
    			});
    		},
    		fail: res => {
    			console.log('失败：', res);
    		}
    	});
    }
  },
  methods: {
    //经纬度获取位置
    getLocationByLonglat: function(latitude, longitude) {
    	let _this = this;
    	// #ifdef H5
    	let url =
    		`https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude + "," + longitude}&key=${this.key}&callbackName=QQmap&output=jsonp&coord_type=5&get_poi=0`
    	this.tui.tuiJsonp(url, (res) => {
    		if (res.status === 0) {
    			
    		}
    	}, "QQmap")
    	// #endif
    
    	// #ifdef MP-WEIXIN
    	this.qqmapsdk.reverseGeocoder({
    		location: {
    			latitude: latitude,
    			longitude: longitude
    		},
    		success: function(res) {
    			console.log(res.result);
          _this.address = res.result.address;
          _this.city = res.result.ad_info.city;
          uni.setStorage({
            key: 'location',
            data: {
              latitude: latitude,
              longitude: longitude,
              city: res.result.ad_info.city,
              address: res.result.address
            }
          })
    		},
    		fail: res => {
    			console.log('解析具体位置失败：', res);
    		}
    	})
    	// #endif
    },
  },
}