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
      { path: 'ask', component: () => import('../views/home/index.vue') },
      { path: 'video', component: () => import('../views/home/index.vue') },
      { path: 'mine', component: () => import('../views/home/index.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
