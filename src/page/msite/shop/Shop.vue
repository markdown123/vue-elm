<template>
  <div>
    <!-- 店铺简介信息 -->
    <section class="desc-header">
      <el-row>
        <el-col :span="6">
          <div class="img-box">
            <img :src="'https://elm.cangdu.org/img/'+currentShopData.pic" alt />
          </div>
        </el-col>
        <el-col :span="18" class="shop-info">
          <div>{{currentShopData.name}}</div>
          <div>商家配送／分钟送达／配送费¥{{currentShopData.deliverFee}}</div>
          <div>{{currentShopData.info}}</div>
          <router-link :to="`/msite?geohash=${$store.state.geohash}`">
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </el-col>
      </el-row>
    </section>

    <div class="tabsbyself">
      <ul>
        <li :class="isShow ? 'select': ''" @click="changeSelect">
          商品
          <div :class="isShow ? 'line' : ''"></div>
        </li>
        <li :class="!isShow ? 'select' : ''" @click="changeSelect1">
          评价
          <div :class="!isShow ? 'line' : ''"></div>
        </li>
      </ul>
      <div v-if="isShow">
        <el-tabs type="string" tab-position="left" style="height: 18rem;">
          <el-tab-pane
            v-for="(item,i) in foodlist"
            :key="i"
            :label="item.name"
            id="tabs1"
          >{{item.name}}</el-tab-pane>
        </el-tabs>
      </div>
      <div v-else>pingjia</div>
    </div>

    <!-- 底部商品提交区 -->
    <section class="footer-shop">
      <div class="left">123</div>
      <div class="right">结算</div>
    </section>
  </div>
</template>

<script>
import { getFoodData } from "../../../service/getData";
export default {
  data() {
    return {
      // 当前店铺数据
      currentShopData: {},
      activeName: "first",
      // 当前店铺id
      restaurant_id: "",
      // 店铺食物数据
      foodlist: [],
      // tab索引
      isShow: true,
    };
  },
  created() {
    this.restaurant_id = this.$route.query.id;
    this.getCurrentShop(this.restaurant_id);
    this.getData();
  },
  async mounted() {},
  methods: {
    async getData() {
      const { data: res } = await getFoodData(this.restaurant_id);
      console.log(res);
      this.foodlist = res;
    },
    //   获得当前店铺数据
    getCurrentShop(id) {
      console.log(this.isShow);
      let arr = this.$store.state.shoplist;
      let index = arr.findIndex((item) => {
        return item.id === parseInt(id);
      });
      let obj = {};
      arr.slice(index, index + 1).forEach((item) => {
        obj = item;
      });

      this.currentShopData = obj;
      console.log(this.currentShopData);
    },
    handleClick() {},
    // 改变tab栏选中状态
    changeSelect() {
      this.isShow = true;
    },
    changeSelect1() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.desc-header {
  height: 3.6rem;
  background-color: #b0b2c1;

  .img-box img {
    width: 3rem;
    height: 3rem;
    padding: 0.45rem;
  }

  .shop-info {
    position: relative;
    padding: 0.45rem;

    div:nth-child(1) {
      font-size: 0.7rem;
      color: #fff;
      font-weight: 700;
    }

    div:nth-child(2) {
      font-size: 0.5rem;
      padding: 0.3rem 0;
      color: #fff;
    }

    div:nth-child(3) {
      font-size: 0.5rem;
      color: #fff;
    }

    .el-icon-arrow-right {
      position: absolute;
      right: 0.2rem;
      top: 1.5rem;
      opacity: 0.5;
    }
  }
}

ul {
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #e4e4e4;
  height: 3.5rem;
  width: 100%;

  li {
    float: left;
    font-size: 0.6rem;
    padding: 1rem 3rem;
  }

  .select {
    position: relative;
    color: #3190e8;
    font-size: 0.6rem;

    .line {
      position: absolute;
      width: 1.3rem;
      border-bottom: 1.5px solid #3190e8;
      margin-top: 0.3rem;
    }
  }
}

.footer-shop {
  position: fixed;
  bottom: 0;
  height: 2rem;
  width: 100%;
  background-color: #000;

  .left {
    float: left;
    width: 70%;
    height: 100%;
  }
  .right {
    float: left;
    width: 30%;
    height: 100%;
    background-color: #4cd964;
    text-align: center;
    line-height: 2rem;
    color: #fff;
  }
}
</style>
