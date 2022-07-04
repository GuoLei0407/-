import axios from 'axios'
import { Toast } from 'vant'
// 设置基地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// 报错拦截处理
request.interceptors.response.use(
  res => {
    return res
  },
  error => {
    console.log('响应拦截error', error)
    // 接口请求错误统一错误处理：统一提示一下
    if (error.response && error.response.data) {
      /*
      Toast
      1:导入与注册
      2:vue中使用
         this.$toast.success('信息')
         this.$toast.fail('信息')
         js中：
         import {Toast} from 'vant'
         Toast===this.$toast
         Toast.success('信息')
      */
      // alert(error.response.data.message)
      Toast.fail(error.response.data.message)
    }
    return Promise.reject(error)
  }
)
// 导出对象
export default request
