import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 要访问登录页，免登录，回到主页
      next('/')
    } else {
      // 在这里调用获取用户信息的方法，应该是登录成功之后跳转到主页中直接就已经拿到数据了，点击登录按钮时触发一系列动作，首先是登录成功，拿到token，储存token，然后触发页面跳转到主页，正好处于这里，既有token，并且to.path ='/',
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      // 不去登录页就直接放行
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单内,跳转
      next()
    } else {
      // 在白名单外，跳转到登录页
      next('/login')
    }
  }

  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
router.afterEach(function() {
  NProgress.done()
})
