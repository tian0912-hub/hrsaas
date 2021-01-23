import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求基本路径，/api /prod-api
  timeout: 5000 // 延时时间5秒
})
service.interceptors.request.use(config => {
  // 在这个位置需要注入token
  if (store.getters.token) {
    // 只有有token的时候才需要去判断token是否失效
    if (IsCheckTimeOut()) {
      // token失效了
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 只有存在token时才需要注入
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
})
service.interceptors.response.use(response => {
  const { success, message, data } = response.data // 将需要的三个数据解构出来
  if (success) { return data } // 通过判断success的状态，来确定是否请求成功，成功返回数据data
  Message.error(message) // 提示错误信息
  return Promise.reject(new Error(message)) // 返回错误对象，由于在这里没有错误对象，所以需要new一个错误对象，因为在promise请求链中，制之后的下一步应该是then(),但是这里请求失败了，没有then，所以创建错误对象，直接进入catch
}, error => {
  // error 信息 里面 response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回错误对象，直接进入catch
})
function IsCheckTimeOut() {
  var currentTime = Date.now()
  var timestamp = getTimeStamp()
  return (currentTime - timestamp) / 1000 > TimeOut
}
export default service
