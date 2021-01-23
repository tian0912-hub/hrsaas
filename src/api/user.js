import request from '@/utils/request'

export function login(data) {
// 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 封装一个获取用户信息的函数
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 封装获取用户详细信息的函数，这里我们现在只用来获取用户头像
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getInfo(token) { }

export function logout() { }
