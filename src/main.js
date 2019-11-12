import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  Element,
  render: h => h(App)
}).$mount('#app')
