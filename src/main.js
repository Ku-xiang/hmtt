import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 设置axios常态地址
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.config.productionTip = false
Vue.use(Element) // 注册整个的所有ElementUI组件 Vue.use 调用了element里面的一个方法=>install

new Vue({
  router,
  Element,
  render: h => h(App)
}).$mount('#app')
