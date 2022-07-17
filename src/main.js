import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'
import 'normalize.css'
import 'amfe-flexible'
import './untils/vant.js'
import moment from 'moment'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 将moment转为中文简体
moment.locale('zh-cn')
// 通过moment定义一个全局过滤器，将绝对时间转化为相对时间
Vue.filter('relvTime', (val) => {
  return moment(val).fromNow()
})
