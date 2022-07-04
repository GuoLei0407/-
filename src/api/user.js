// 导入请求对象
import request from '@/untils/request'

// 封装一个登录的接口函数
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data,
    noToken: true
  })
}
