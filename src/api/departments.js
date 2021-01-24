import request from '@/utils/request'

// 封装获取部门列表
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
export function addDepartmeng(partInfo) {
  return request({
    url: '/company/department',
    method: 'post',
    Body: partInfo
  })
}
