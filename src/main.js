import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css'
import JSONbig from 'json-bigint'
const data = `{"message": "OK", "data": {"total_count": 60956, "page": 1, "per_page": 10, "results": [{"id": 1195985083270430720, "title": "qwert", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:40:38"}, {"id": 1195984901866782720, "title": "\u6c5f\u82cf\u4f20\u667a\u64ad\u5ba2\u6559\u80b2\u79d1\u6280\u80a1\u4efd\u6709\u9650\u516c\u53f8", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:39:55"}, {"id": 1195982444596035584, "title": "kosakakirino", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:30:09"}, {"id": 1195981912225611776, "title": "213123", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:28:02"}, {"id": 1195981558478012416, "title": "123457", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:26:38"}, {"id": 1195981510339985408, "title": "233322", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:26:26"}, {"id": 1195980938966728704, "title": "1234567", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:24:10"}, {"id": 1195980515149086720, "title": "qwerrtyu", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:22:29"}, {"id": 1195980294352535552, "title": "bkjkk", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:21:37"}, {"id": 1195980229990940672, "title": "fawfwaefawe", "status": 2, "cover": {"type": 0, "images": []}, "pubdate": "2019-11-17 16:21:21"}]}}`
const obj = JSONbig.parse(data)
console.log(obj.data.results[0].id.toString()) // 1195985083270430720

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/' // 设置axios常态地址
Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.config.productionTip = false
Vue.use(Element) // 注册整个的所有ElementUI组件 Vue.use 调用了element里面的一个方法=>install

new Vue({
  router,
  Element,
  render: h => h(App)
}).$mount('#app')
