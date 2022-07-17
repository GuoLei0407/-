import request from '@/untils/request'
// 封装请求搜索查询的接口

export const suggest = params => {
  return request({
    url: '/v1_0/suggestion',
    params
  })
}

export const search = params => {
  return request({
    url: '/v1_0/search',
    params
  })
}
