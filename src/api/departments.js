import request from '@/utils/request'

// 封装获取部门列表

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
export function getDepartmengsList() {
  return request({
    url: '/company/department'
  })
}
// 封装删除节点
export function deleteNode(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 封装添加部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 封装获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 封装根据ID查询部门详细信息
export function getParInfo(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 封装根据ID修改部门详细信息
export function editParInfo(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
