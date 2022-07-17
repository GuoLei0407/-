// 这个文件用于封装用户频道请求的API
import request from '@/untils/request'

// 封装一个获取用户自己频道的接口
export const myChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 封装一个获得所有频道的接口
export const allChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 封装一个修改用户自己频道的接口
export const myChannelsPut = data => {
  return request({
    url: '/v1_0/user/channels',
    method: 'put',
    data
  })
}
