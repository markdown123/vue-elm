import axios from 'axios'

// 获得当前城市
export function getCurrentCity() {
    console.log(axios.get('/v1/cities?type=guess'));
    return axios.get('/v1/cities?type=guess')
}

// 获得热门城市
export function getHotCity() {
    return axios.get('/v1/cities?type=hot')
}

// 获得所有城市
export function getAllCity() {
    return axios.get('/v1/cities?type=group')
}

// 获得城市名
export function getCityName(id) {
    return axios.get(`/v1/cities/${id}`)
}

// 获取搜索地址
export function getSearchCity(cityId,value) {
    return axios.get(`/v1/pois?
    city_id=${cityId}&keyword=${value}&type=search`)
}

// 利用经纬度获得详细地址
export function getAddress(geohash) {
    return axios.get(`/v2/pois/${geohash}`)
}

// 获取食品类型
export function getFoodType() {
    return axios.get(`/v2/index_entry`)
}

// 获得附近商铺数据
export function getShopData(latitude,longitude) {
    return axios.get(`/shopping/restaurants?latitude=${latitude}&longitude=${longitude}`)
} 

// 获得某餐馆的食物
export function getFoodData(id) {
    return axios.get(`/shopping/v2/menu?restaurant_id=${id}`)
}
