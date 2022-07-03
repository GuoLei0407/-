// const path = require('path')
module.exports = config => {
  // 注意老版本  config.file.dirname   新版本config.file
  // const base = config.file.includes(path.join('node_modules', 'vant'))
  //   ? 375
  //   : 900
  return {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375 // 设计稿宽度
      }
    }
  }
}
