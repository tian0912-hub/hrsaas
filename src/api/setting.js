import request from '@/utils/request'

// 封装获取角色列表
export function getRolesList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 封装添加角色的函数
export function addRoles(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 根据ID查询角色信息
export function getRolesInfoById(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 根据ID修改角色信息
export function editRolesInfoById(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 根据ID删除角色
export function delRolesById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 根据ID查询公司信息
export function getCompanyInfoById(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
