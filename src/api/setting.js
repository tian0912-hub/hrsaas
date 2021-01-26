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
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
