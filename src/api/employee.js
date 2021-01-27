import request from '@/utils/request'
// 封装获取员工列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 封装根据ID删除员工信息
export function delEmployeeById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 封装新增员工
export function addEmployeeInfo(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
