// 本文件封装新闻的请求接口
import request from '@/untils/request.js'

// 封装获取新闻列表的接口
export const articleList = (params) => {
  return request({
    url: '/v1_0/articles',
    params
  })
}

export const articleDetail = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}

export const cmtList = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

export const sendCmt = data => {
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data
  })
}
