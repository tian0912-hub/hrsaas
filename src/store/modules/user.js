// import { set } from 'core-js/fn/dict'
import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      // 将token
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, results) {
      state.userInfo = results
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const results = await login(data) // 拿到token
      // if (results.data.success) { 这里不需要了，因为已经在响应拦截器里处理过了
      context.commit('setToken', results) // 使用token
      setTimeStamp()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const results = await getUserInfo()
      const baseInfo = await getUserDetailById(results.userId)// 获取用户的基本信息，包括有图片
      context.commit('setUserInfo', { ...results, ...baseInfo })
      return results // 为什么要返回results？为以后埋下伏笔
    },
    // 实现登出的功能
    logout(context) {
      context.commit('removeToken')
      context.commit('removeUserInfo')
    }
  }
}
