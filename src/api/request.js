import Vue from 'vue'
import axios from 'axios'
import config from '../config'

const apiflag = config.apiflag

const service = axios.create({
    // 设置超时时间
    timeout: 1000 * 60 * 30,
    // baseURL
    baseURL: apiflag
})
service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(
    config => {
        // config.headers.token = window.sessionStorage.getItem("token");
        // 触发请求 loading，但是exclude中包含的请求不需要 loading
        // if (exclude.indexOf(config.url) === -1) {
            // 显示全局加载loading
            //   store.commit("setGlobalLoading", true);
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(
    response => {
        // 请求响应后关闭全局加载loading
        //   store.commit("setGlobalLoading", false)
        const responseCode = response.status
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (responseCode === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        // 请求响应后关闭全局加载loading
        //   store.commit("setGlobalLoading", false)

        // 断网 或者 请求超时 状态
        if (!error.response) {
            // 请求超时状态
            if (error.message.includes('timeout')) {
                console.log('超时了')
                Vue.prototype.$Message.error('请求超时，请检查网络是否连接正常')
            } else {
                // 可以展示断网组件
                console.log('断网了')
                Vue.prototype.$Message.error('请求失败，请检查网络是否已连接')
            }
            return
        }
        // 可以根据后端返回的状态码进行不同的操作
        const responseCode = error.response.status

        switch (responseCode) {
            // 401：未登录||token过期
            case 401:
                // 401需要跳转登录页
                Vue.prototype.$Message.error('登录失效，请重新登录')
                //   localStorage.setItem("token", "")
                //   router.replace({
                //     path: '/login'
                //   })
                break
            case 500:
                Vue.prototype.$Message.error('服务器连接错误')
                break
            // 404请求不存在
            case 404:
                Vue.prototype.$Message.error('网络请求不存在')
                break
            // 其他错误，直接抛出错误提示
            default:
                Vue.prototype.$Message.error(error.response.data.message)
        }
        return Promise.reject(error)
    }
)

export default service