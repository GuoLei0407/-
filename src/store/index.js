import Vue from 'vue'
import Vuex from 'vuex'
// import { removeToken } from '@/untils/auth.js'
import router from '@/router'
// import { Toast } from 'vant'
import persistedstate from 'vuex-persistedstate'
import { userinfoAPI } from '@/api/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 给vuex的token默认值，判断从localStorage里获取，有就拿，没有就给空对象
    // tokenObj: getToken() || {}
    // 我们导入vuex-persistedstate包用于vuex数据持久化，就不用原来的方法了
    tokenObj: '',
    userinfo: {}
  },
  getters: {
  },
  mutations: {
    setToken(state, value) {
      state.tokenObj = value
      // token存储到浏览器
      // setToken(JSON.stringify(value))
    },
    // 用来更改用户信息的方法
    setUserInfos(state, info) {
      state.userinfo = info
    },
    // 用来退出的方法
    logout(state) {
      // 删除vuex里面的token
      state.tokenObj = ''
      // 删除本地存储的token
      // removeToken() 我们调用了persistedstate后，后自动为tokenObj做持久化，当我们给tokenObj添加值的时候，就会自动给本地存储里面加上，当我们将tokenObj清空的时候，同样的也会自动的将本地存储中的token清空
      // 清空用户信息，如果不清空用户信息，
      // 那么下个用户登录的时候vuex还是上个用户信息就不会去请求这个新用户的信息，那么页面上显示的就是上个用户的信息
      state.userinfo = {}
      // 退回登录页
      router.push('/login')
    }
  },
  actions: {
    // 但凡是使用 vuex管理的数据，并且这个数据是需要发请求获取到，
    // 那么按照规范，其实应该把请求的代码封装到 actions里
    // 原因：就好比今天的项目，vuex管理了用户信息的数据，但是这个数据是需要请求拿到的，如果不封装到 actions 里，那么假如多个组件要用，
    // 那就需要在多个组件里都发请求，那么比较麻烦，如果封装到actions里，我们仅仅只需要调用actions的方法即可
    async reqUserInfo(context) {
      if (!context.state.userinfo.name) {
        // 发起请求获取用户资料
        const res = await userinfoAPI()
        context.commit('setUserInfos', res.data.data)
      }
    }
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
