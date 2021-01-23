import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求基本路径，/api /prod-api
  timeout: 5000 // 延时时间5秒
})
service.interceptors.request.use()
service.interceptors.response.use(response => {
  const { success, message, data } = response.data // 将需要的三个数据解构出来
  if (success) { return data } // 通过判断success的状态，来确定是否请求成功，成功返回数据data
  Message.error(message) // 提示错误信息
  return Promise.reject(new Error(message)) // 返回错误对象，由于在这里没有错误对象，所以需要new一个错误对象，因为在promise请求链中，制之后的下一步应该是then(),但是这里请求失败了，没有then，所以创建错误对象，直接进入catch
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回错误对象，直接进入catch
})
export default service
