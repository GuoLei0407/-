import Vue from 'vue'
import Vuex from 'vuex'
// import { getToken ,setToken } from '@/untils/auth.js'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 给vuex的token默认值，判断从localStorage里获取，有就拿，没有就给空对象
    // tokenObj: getToken() || {}
    // 我们导入vuex-persistedstate包用于vuex数据持久化，就不用原来的方法了
    tokenObj: ''
  },
  getters: {
  },
  mutations: {
    setToken(state, value) {
      state.tokenObj = value
      // token存储到浏览器
      // setToken(JSON.stringify(value))
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    persistedstate({
      // 表示指出那些数据需要持久化
      paths: ['tokenObj']
    })
  ]
})
