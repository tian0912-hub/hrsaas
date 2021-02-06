import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes// 路由表，表示用户当前拥有的路由权限
}
const mutations = {
  // 定义修改routes的mutations方法
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是静态路由加上权限路由，因为推出之后只有默认的静态路由权限
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes) // 将动态路由添加到路由表中，这里用作左侧菜单栏显示使用
    return routes // 将动态路由表导出，用作添加动态路由权限使用
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
