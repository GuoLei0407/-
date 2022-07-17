import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'layout/home'
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/article',
    component: () => import('../views/article/index.vue')
  },
  {
    path: '/search',
    component: () => import('../search/index.vue')
  },
  {
    path: '/search/result/:key',
    component: () => import('../search/result.vue')
  },
  {
    path: '/layout',
    component: () => import('../layout/index.vue'),
    children: [
      { path: 'home', component: () => import('../views/home/index.vue') },
      { path: 'ask', component: () => import('../views/ask/index.vue') },
      { path: 'video', component: () => import('../views/video/index.vue') },
      {
        path: 'mine',
        component: () => import('../views/mine/index.vue'),
        meta: {
          needLogin: true // meta就可以理解成打个标签的意思，我们给mine这条路由打个标签，表示需要登录才可以访问
        }
      },
      // 这里的路径是为了让用户看起来知道这是我的资料的修改
      {
        path: 'edit',
        component: () => import('../views/mine/edit.vue'),
        meta: {
          needLogin: true,
          noTab: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 全局路由钩子
// 前置守卫
// 所有的路由进入前都回经过该守卫
router.beforeEach(async(to, from, next) => {
  console.log('to', to)
  // 判断是否需要登录
  if (to.meta.needLogin) {
    // 需要登录
    // 检查是否有token
    if (store.state.tokenObj.token) {
      // 检查是否有用户信息
      if (store.state.userinfo.id) {
        next() // 表示，如果去的页面需要登录，也就是去往的是mine和edit，就要检查是否有token，和用户信息，都已就直接放过去
      } else {
        // 有token但是没有用户信息我们就重新发起请求
        await store.dispatch('reqUserInfo')
        next()
      }
    } else {
      // 如果没有token就返回登录页
      next('/login?back=' + to.fullPath)
    }
  } else {
    next()
  }
})
// 路由错误统一捕获
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router
