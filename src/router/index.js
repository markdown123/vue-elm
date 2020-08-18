import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import Home from '../page/home/Home.vue'
import City from '../page/city/City.vue'
import Msite from '../page/msite/Msite.vue'

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

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
