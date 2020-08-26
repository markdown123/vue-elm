import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Home from '../page/home/Home.vue'
import City from '../page/city/City.vue'
import Msite from '../page/msite/Msite.vue'
import Food from '../page/msite/food/Food.vue'
import Search from '../page/msite/search/Search.vue'
import Login from '../page/login/Login.vue'
import Shop from '../page/msite/shop/Shop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '', redirect: '/home' },
      // 首页城市选择
      { path: '/home', component: Home },
      // 当前城市选择页
      { path: '/city/:cityId', component: City },
      //所有商铺列表页
      {
        path: '/msite',
        component: Msite,
        meta: { keepAlive: true },
      },
      // 特色商品列表
      {
        path: '/food',
        component:Food,
      },
      // 搜索店铺
      {
        path: '/search/:geohash',
        component: Search,
      },
      //登录注册页
      {
        path: '/login',
        component: Login
      },
      // 店铺首页
      {
        path: '/shop/:geohash',
        component: Shop,
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
