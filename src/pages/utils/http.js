import Taro from '@tarojs/taro'
import config  from './config';

export default async function SentRequest(params) {
  const method = params.data != undefined ? 'POST' : 'GET'; // 请求方式
  let url = config.baseUrl + params.url; // 请求路径
  let data = {};

  // token
  // if (Taro.getStorageSync('token')) data.token = Taro.getStorageSync('token');
  data.token = '414a5b01-bcb0-4bdf-baf5-1ad75e8da098'

  // 参数
  if (params.data != undefined) Object.assign(data, params.data);

  if(params.async === false) {
    //同步
    return new Promise((resolve, reject) => {
      Taro.request({
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
            Taro.removeStorage({
              key: 'token'
            })
            Taro.removeStorageSync('userInfo');
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
    Taro.request({
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
          Taro.removeStorageSync('token');
          Taro.removeStorageSync('userInfo');
          //登录失效页面返回
          // Taro.navigateTo({
          //   url: '/pages/login/login'
          // })
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
