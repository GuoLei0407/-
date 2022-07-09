// 导入请求对象
import request from '@/untils/request'
// 因为js不是vue实例，所以需要手动导入store
// import store from '@/store'
// 封装一个登录的接口函数
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data,
    noToken: true
  })
}

export const userinfo = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
    // 因为在utils/request.js里面 给请求拦截添加了自动添加token的功能，因此这里也就不需要添加token了
    // headers: {
    //   // 设置请求头将token传给服务器
    //   // 注意：Bearer后面必须加一个空格，这里从vuex里获取到token
    //   Authorization: 'Bearer' + store.state.tokenObj.token
    // }
  })
}

export const userProfilePatch = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data
  })
}

export const userPhotoPatch = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'patch',
    data
  })
}
