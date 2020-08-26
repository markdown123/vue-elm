import {SAVE_GEOHASH,
    RECORD_ADDRESS, SET_SHOP_LIST} from './mutation-types.js'
export default {
    // 改变头部
    changeHeader(state, str) {
        state.headerMark = str
    },
    // 显示搜索结果
    changeStatus(state, str) {
        state.searchResultStatus = str
    },

    EventListener(state) {
        state.shoplist = JSON.parse(sessionStorage.getItem('shoplist'))
    },

    [SAVE_GEOHASH](state,geohash) {
        state.geohash = geohash
    },

    [RECORD_ADDRESS](state,obj) {
        state.latitude = obj.latitude
        state.longitude = obj.longitude
        console.log(state.latitude);
    },
    // 存入店铺列表
    [SET_SHOP_LIST](state,arr) {
        state.shoplist = arr
        sessionStorage.setItem('shoplist',JSON.stringify(state.shoplist))
    }
}

