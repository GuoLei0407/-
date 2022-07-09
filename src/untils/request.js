import axios from 'axios'
// import { Toast } from 'vant'
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

// request.interceptors.response.use(function(response) {
//   console.log('响应拦截了', response)
//   // 正常响应调用的函数
//   // response这个参数就是服务器返回的响应数据
//   // return response;

//   // 我在响应拦截里return什么，那么发请求的.then里拿到的就是什么结果
//   return 'abc'
// },
// function(error) {
//   console.log('响应出错了', error)
//   return '你好'
// }
// )
// 导出对象
export default request
