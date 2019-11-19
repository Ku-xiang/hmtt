import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout'
import Login from '../views/login'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, // 一级路由
  {
    path: '/layout',
    component: layout,
    children: [{
    // 首页
      path: '', // 默认子路由，
      component: Home
    }, {
    // 文章列表
      path: '/article',
      component: Article
    }, {
    // 发布文章
      path: '/publish',
      component: Publish
    }, {
      // 编辑文章
      path: '/publish/:articleId',
      component: Publish
    }]
  }, // 一级路由
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //             import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 开启导航进度条
  NProgress.start()
  // 判断是否有 token
  if (to.path === '/login') {
    next()
    return
  }
  // 非登陆页面  校验登录状态
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    next('/login')
    // 如果在登录页  并且是非登录状态下的登录页面  手动终止进度条
    NProgress.done()
  }
})
// 路有导航结束以后触发
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
