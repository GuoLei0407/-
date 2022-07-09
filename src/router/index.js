import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('../layout/index.vue'),
    children: [
      { path: 'home', component: () => import('../views/home/index.vue') },
      { path: 'ask', component: () => import('../views/ask/index.vue') },
      { path: 'video', component: () => import('../views/video/index.vue') },
      { path: 'mine', component: () => import('../views/mine/index.vue') },
      // 这里的路径是为了让用户看起来知道这是我的资料的修改
      { path: 'edit', component: () => import('../views/mine/edit.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
