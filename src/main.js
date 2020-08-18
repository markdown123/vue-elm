import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/global.css'
import './plugins/element.js'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://elm.cangdu.org/'
Vue.prototype.$request = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
