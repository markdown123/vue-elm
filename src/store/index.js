import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 页面的头部
    headerMark: 'index',
    // 搜索结果
    searchResultStatus: false,
    // 保存的地址
    geohash:'',
    latitue: '',
    longtitue: '',

  },
  mutations,
  actions,
  getters,
})
