import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mpv1_0' // 设置axios打倒常态地址
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  Element,
  render: h => h(App)
}).$mount('#app')
