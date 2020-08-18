<template>
  <div>
    <header-shop :center-item="addressname"></header-shop>

    <!-- 轮播菜单 -->
    <el-carousel :interval="5000" arrow="never" :autoplay="false">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Header from "../../components/common/Header";
import { getCurrentCity, getAddress, getFoodType } from "../../service/getData";
export default {
  data() {
    return {
      // 当前选择的详细地址经纬度
      geohash: "",
      addressname: "请输入地址",
    };
  },
  components: {
    "header-shop": Header,
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
    this.RECORD_ADDRESS(res1.latitude,res1.longitude)
  },
  mounted() {
    //   获取食品类型
    // console.log(getFoodType(this.geohash));
    // const {data: res} = await getFoodType()
    // console.log(res);
  },
  methods: {
    ...mapMutations(["SAVE_GEOHASH", "RECORD_ADDRESS"]),
    changeHeader() {
      this.$store.commit("changeHeader", "shop");
    },
    
  },
};
</script>

<style lang="scss" scoped>
.el-carousel {
    position: relative;
    top: 2rem;
}


</style>