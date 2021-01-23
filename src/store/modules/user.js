// import { set } from 'core-js/fn/dict'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken()
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
    }
  },
  actions: {
    async login(context, data) {
      const results = await login(data) // 拿到token
      // if (results.data.success) { 这里不需要了，因为已经在响应拦截器里处理过了
      context.commit('setToken', results) // 使用token
    }
  }
}
