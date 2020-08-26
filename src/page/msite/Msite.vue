<template>
  <div>
    <header-shop :center-item="addressname" :search-param="geohash"></header-shop>

    <!-- 轮播特色菜单 -->
    <el-carousel height="10rem" arrow="never" :autoplay="false">
      <el-carousel-item>
        <el-row>
          <el-col class="nav-list" :span="6" v-for="(item,i) in firstNavList" :key="i">
            <!-- 跳转到特色食物 -->
            <router-link :to="'/food'">
              <img :src="imgBaseUrl+item.image_url" alt />
              <span>{{item.title}}</span>
            </router-link>
          </el-col>
        </el-row>
      </el-carousel-item>
      <el-carousel-item>
        <el-row>
          <el-col class="nav-list" :span="6" v-for="(item,i) in secondNavList" :key="i">
            <router-link :to="'/food'">
              <img :src="imgBaseUrl+item.image_url" alt />
              <span>{{item.title}}</span>
            </router-link>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>

    <div class="near-shop">
      <i class="el-icon-s-shop"></i>
      <span>附近商家</span>
      <!-- 商家列表 -->

      <el-row class="shop-item" :gutter="20" v-for="(item,i) in shopList" :key="i">
        <router-link :to="'/shop/'+geohash+`?id=${item.id}`">
          <el-col :span="6" class="left">
            <div>
              <img :src="imgBaseUrl1+item.pic" alt />
            </div>
          </el-col>
          <el-col :span="18" class="right">
            <div>品牌</div>
            <div>{{item.name}}</div>
            <div>月售{{item.num}}单</div>
            <div>￥{{item.startDeliverPrice}}起送 / 配送费约￥{{item.deliverFee}}</div>
            <div>保准票</div>
            <div>
              <span>{{item.deliverMode}}</span>
              <span>准时达</span>
            </div>
            <div>
              {{item.distance}} /
              <i>{{item.deliverTime}}</i>
            </div>
            <el-rate
              v-model="item.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Header from "../../components/common/Header";
import {
  getCurrentCity,
  getAddress,
  getFoodType,
  getShopData,
} from "../../service/getData";
export default {
  data() {
    return {
      // 当前选择的详细地址经纬度
      geohash: "",
      addressname: "请输入地址",
      // 第一页导航
      firstNavList: [],
      // 第二页导航
      secondNavList: [],
      //导航图片域名地址
      imgBaseUrl: "https://fuss10.elemecdn.com",
      // 商品图片
      imgBaseUrl1: "https://elm.cangdu.org/img/",
      // 商品列表
      shopList: [],
    };
  },
  components: {
    "header-shop": Header,
  },
  computed: {
    ...mapState(['latitude'])
  },
  created() {
    this.changeHeader();
  },
  async beforeMount() {
    // 判断是否选择了地址
    if (!this.$route.query.geohash) {
      const { data: res } = await getCurrentCity();
      this.geohash = res.geohash;
    } else {
      this.geohash = this.$route.query.geohash;
    }

    // 将经纬度坐标存入vuex
    this.SAVE_GEOHASH(this.geohash);
    // 根据经纬度获取地址的数据
    const { data: res1 } = await getAddress(this.geohash);
    console.log(res1);
    this.addressname = res1.name;

    // 获取经纬度
    this.RECORD_ADDRESS({
      latitude: res1.latitude,
      longitude: res1.longitude,
    });
  },
  async mounted() {
    //   获取食品类型
    // console.log(getFoodType(this.geohash));
    const { data: res } = await getFoodType();
    this.firstNavList = res.slice(0, 8);
    console.log(this.firstNavList);
    this.secondNavList = res.slice(8, 16);
    console.log(this.secondNavList);
    console.log(res);

    // 获取附近商家数据
    console.log(this.$store.state.latitude);
    let latitude = this.geohash.split(',')[0];
    let longitude = this.geohash.split(',')[1];
    console.log(this.geohash.split(','));
    const { data: res1 } = await getShopData(latitude, longitude);
    console.log(res1);

    const arr = [];

    res1.forEach((item) => {
      const obj = {};
      obj.id = item.id;
      obj.pic = item.image_path;
      obj.name = item.name;
      obj.num = item.recent_order_num;
      obj.rating = item.rating;
      obj.startDeliverPrice = item.float_minimum_order_amount;
      obj.deliverFee = item.float_delivery_fee;
      obj.deliverMode = item.delivery_mode.text;
      obj.distance = item.distance;
      obj.deliverTime = item.order_lead_time;
      obj.info = item.promotion_info

      arr.push(obj);
    });
    this.SET_SHOP_LIST(arr);
    this.shopList = arr;
    console.log(this.shopList);
  },
  methods: {
    ...mapMutations(["SAVE_GEOHASH", "RECORD_ADDRESS", "SET_SHOP_LIST"]),
    changeHeader() {
      this.$store.commit("changeHeader", "shop");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

.el-carousel {
  position: relative;
  top: 2rem;
  background-color: #fff;
  border-bottom: 2px solid $bc;
}

.nav-list {
  position: relative;
  font-size: 0.5rem;
  padding: 1rem;

  img {
    width: 100%;
    height: 100%;
  }

  span {
    @include titleCenter;
    bottom: 0;
    white-space: nowrap;
    color: #000;
    opacity: 0.7;
  }
}

.near-shop {
  position: relative;
  margin-top: 2.5rem;
  border-top: 2px solid $bc;
  background-color: #fff;

  span {
    display: inline-block;
    position: absolute;
    top: 0.2rem;
    padding: 0.2rem 0;
    font-size: 0.6rem;
    color: #ccc;
  }

  .el-icon-s-shop {
    opacity: 0.2;
    padding: 0.3rem;
  }

  .shop-item {
    border-bottom: 1px solid $bc;
    padding: 0.5rem;

    .left img {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 0.5rem;
    }

    .right {
      position: relative;

      div:nth-child(1) {
        position: absolute;
        left: 0;
        top: 0.2rem;
        font-size: 0.5rem;
        background-color: #ffd930;
      }

      div:nth-child(2) {
        position: absolute;
        font-size: 0.7rem;
        left: 1.5rem;
        width: 7rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .el-rate {
        position: absolute;
        top: 1rem;
        left: 0;
      }

      div:nth-child(3) {
        position: absolute;
        font-size: 0.3rem;
        left: 6.05rem;
        top: 1.4rem;
      }

      div:nth-child(4) {
        position: absolute;
        font-size: 0.45rem;
        left: 0;
        top: 2.3rem;
      }

      div:nth-child(5) {
        position: absolute;
        right: 0.55rem;
        font-size: 0.2rem;
        color: black;
        opacity: 0.5;
        letter-spacing: 0.2rem;
        border: 1px solid $bc;
      }

      div:nth-child(6) {
        position: absolute;
        right: 3.9rem;
        top: 1rem;

        span:nth-child(1) {
          margin: 0 0.5rem;
          font-size: 0.1rem;
          white-space: nowrap;
          background-color: $blue;
          color: #e4eafb;
          border: 1px solid $blue;
          border-radius: 0.1rem;
          line-height: 0.1rem;
          padding: 0.2rem 0.1rem;
        }

        span:nth-child(2) {
          left: 2.45rem;
          font-size: 0.1rem;
          white-space: nowrap;
          line-height: 0.1rem;
          border: 1px solid $blue;
          border-radius: 0.1rem;
          color: $blue;
          padding: 0.2rem 0.1rem;
        }
      }

      div:nth-child(7) {
        position: absolute;
        right: 0.5rem;
        top: 2.3rem;
        font-size: 0.45rem;

        i {
          color: $blue;
        }
      }
    }
  }
}
</style>