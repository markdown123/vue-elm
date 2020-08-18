import {SAVE_GEOHASH,
    RECORD_ADDRESS} from './mutation-types.js'
export default {
    // 改变头部
    changeHeader(state, str) {
        state.headerMark = str
    },
    // 显示搜索结果
    changeStatus(state, str) {
        state.searchResultStatus = str
    },

    [SAVE_GEOHASH](state,geohash) {
        state.geohash = geohash
    },

    [RECORD_ADDRESS](state,latitude,longitude) {
        state.latitude = latitude
        state.longitude = longitude
    }
}

