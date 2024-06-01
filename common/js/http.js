import Config from './config.js'
import Util from './util.js'
import store from '@/store/index.js'


export default {
  sendRequest(params) {
    var method = params.data != undefined ? 'POST' : 'GET', // 请求方式
      url = Config.baseUrl + params.url, // 请求路径
      data = {},token = '';

    // token
    if (uni.getStorageSync('token')) data.token = uni.getStorageSync('token');
    // data.token = '414a5b01-bcb0-4bdf-baf5-1ad75e8da098'

    // 参数
    if (params.data != undefined) Object.assign(data, params.data);
    
    if(params.async === false) {
      //同步
      return new Promise((resolve, reject) => {
      	uni.request({
      		url: url,
      		method: method,
      		data: data,
      		header: params.header || {
      			'content-type': 'application/x-www-form-urlencoded;application/json'
      		},
      		dataType: params.dataType || 'json',
      		responseType: params.responseType || 'text',
      		success: (res) => {
      			if (res.data.code == 401 || res.data.code == 401) {
      				uni.removeStorage({
      					key: 'token'
      				})
              uni.removeStorageSync('userInfo');
      			}
      			resolve(res.data);
      		},
      		fail: (res) => {
      			reject(res);
      		},
      		complete: (res) => {
      			reject(res);
      		}
      	});
      });
    }else {
      uni.request({
        url: url,
        method: method,
        data: data,
        header: params.header || {
          // 'content-type': 'application/json',
          'content-type': 'application/x-www-form-urlencoded;application/json'
          // "Authorization": token ? 'Bearer ' + token : ''
        },
        dataType: params.dataType || 'json',
        responseType: params.responseType || 'text',
        success: (res) => {
          if (res.data.code == 401) {
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            //登录失效页面返回
            uni.navigateTo({
              url: '/pages/login/login'
            })
          } else {
            typeof params.success == 'function' && params.success(res.data);
          }
        },
        fail: (res) => {
          typeof params.fail == 'function' && params.fail(res);
        },
        complete: (res) => {
          typeof params.complete == 'function' && params.complete(res);
        }
      });
    }
    
  }
}
