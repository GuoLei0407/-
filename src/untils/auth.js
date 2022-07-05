// 这个文件专门用来封装操作本地存储token的方法
const TOKEN_KEY = 'hmtt79'

// 保存token

export const saveToken = function(obj) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(obj))
}

// 获取token
export const getToken = function() {
  // 取出来的时候是一个json字符串，所以还要转回JS对象
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

// 删除token
export const removeToken = function() {
  localStorage.removeItem(TOKEN_KEY)
}
