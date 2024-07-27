import config from "./config"
/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 config.token 请求头标识
 *   5. 成功 失败 完成(调用成功、失败都会执行)
 */
const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        // 1. 非 http 开头需拼接地址
        if (!options.url.startsWith('http')) {
            options.url = config.baseUrl + options.url
        }
        // 2. 请求超时, 默认 60s
        options.timeout = 5000
        // 3. 添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
            'content-type': 'application/x-www-form-urlencoded;application/json'
        }
        // 4.配置 token
        options.header.Authorization = config.token
        options.dataType = 'json'
    },
    success(args: UniApp.RequestSuccessCallbackResult) {
        // 请求成功后，修改code值为1
        // args.data.code = 1
    },
    fail(err: UniApp.GeneralCallbackResult) {
        // console.log('interceptor-fail', err)
    },
    complete(res: UniApp.GeneralCallbackResult) {
        // console.log('interceptor-complete', res)
    },
}

/**
 * 添加拦截器
 * 名字 对应  uni.xxx 请求
 */
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求返回 基类 封装
 */

/**
 * uniapp request 请求 封装
 * @param  UniApp.RequestOptions--{ method, url, data }
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
export const request = <T = any>(options: UniApp.RequestOptions) =>
    new Promise<T>((resolve, reject) => {
        uni.request({
            ...options,
            // 响应成功
            success(res) {
                // 状态码 2xx， axios 就是这样设计的
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    // 2.1 提取核心数据 res.data
                    resolve(res.data as T)
                } else if (res.statusCode === 401) {
                    // 401错误  -> 清理用户信息，跳转到登录页
                    // uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                } else {
                    // 其他错误 -> 根据后端错误信息轻提示
                    reject(res)
                }
            },
            // 响应失败
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试',
                })
                reject(err)
            },
        })
    })

