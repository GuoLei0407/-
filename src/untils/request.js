import axios from 'axios'
import { Toast } from 'vant'
// 导入store
import store from '@/store'
// import router from '@/router'
// 设置基地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// 请求拦截
// 我们项目里发请求用的是request对象，所以你要拦截，也应该是拦截request
request.interceptors.request.use(
  function(config) {
    // 如果有token才加这个请求头，不然不加（例如登录就没有token）
    // 请求发出前，给请求头携带好token
    if (store.state.tokenObj) {
      config.headers.Authorization = 'Bearer ' + store.state.tokenObj.token
    }

    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 发请求出错调用的函数（用不到，可以无视）
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    console.log('响应拦截error', error)
    // 接口请求错误统一处理：
    if (error.response && error.response.data) {
      // 如果响应状态码为401
      // 出现这种错误，说明我们有token但是token已经过期了
      // 会引起的问题： 当我们好久没登陆时，我们点击我的页面但是页面没有出现
      // 原因：在路由守卫中我们设置了检查如果有token但是没有用户信息，我们就调用vuex中的方法
      // 重新发起请求用户信息，但是我们的token已经过期了，所以发起请求后
      if (error.response.status === 401) {
        try {
          const res = await axios({
            url: 'http://toutiao.itheima.net/v1_0/authorizations',
            method: 'put',
            headers: {
              Authorization: 'bearer ' + store.state.tokenObj.refresh_token
            }
          })
          console.log('成功', res)
          store.commit('setToken', {
            token: res.data.data.token,
            refresh_token: store.state.tokenObj.refresh_token
          })
          return request(error.config)
        } catch {
          Toast.fail(error.response.data.message)
          store.commit('logout')
        }
      }
    }
  }
)
// 导出对象
export default request
