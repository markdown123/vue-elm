<template>
  <div>
    <!-- 首页头部 -->
    <header-x></header-x>

    <!-- 城市导航 -->
    <div class="nav_city">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/'+ guessCityId" class="selectCity">
          <span class="current-city">{{guessCity}}</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </el-card>

      <!-- 热门城市 -->
      <div class="hot-city">
        <div class="title">热门城市</div>
        <el-row>
          <el-col :span="6" v-for="(item,i) in hotcity" :key="i">
            <router-link :to="'/city/'+item.id" class="selectCity">{{item.name}}</router-link>
          </el-col>
        </el-row>
      </div>

      <!-- 城市列表 -->
      <div class="list-city" v-for="(item,key,i) of sortGroupCity" :key="key">
        <div class="index">
          {{key}}
          <span v-if="i ===0 ">（按字母排序）</span>
        </div>
        <el-row>
          <el-col  :span="6" v-for="(item1,index) in item" :key="index">
            <router-link :to="'/city/'+item1.id" class="selectHotCity">{{item1.name}}</router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/common/Header.vue";
import { getCurrentCity, getHotCity, getAllCity } from "../../service/getData";
export default {
  data() {
    return {
      // 当前城市
      guessCity: "",
      // 当前城市id
      guessCityId: 0,
      // 热门城市列表
      hotcity: [],
      // 所有城市
      allcity: {},
    };
  },
  components: {
    "header-x": Header,
  },
  created() {
    this.changeHeader();
    this.getData()
  },
  mounted() {
    // 获取当前城市
    getCurrentCity()
      .then((res) => {
        console.log(res);
        this.guessCity = res.data.name;
        this.guessCityId = res.data.id;
      })
      .catch((err) => {
        console.log(err);
      });

    // 获得热门城市
    getHotCity().then((res) => {
      console.log(res.data);
      this.hotcity = res.data;
    });

    // 获得所有城市
    getAllCity().then((res) => {
      console.log(res.data);
      this.allcity = res.data;
    });
  },
  computed: {
    sortGroupCity() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.allcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.allcity[
            String.fromCharCode(i)
          ];
        }
      }
      return sortobj;
    },
  },
  methods: {
    async getData() {
      const {data: res} = await this.$request.get('/v1/cities?type=guess')
      console.log(res);
    },
    changeHeader() {
      this.$store.commit("changeHeader", "index");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

.selectCity {
  text-decoration: none;
  color: $blue;
}

.selectHotCity {
  text-decoration: none;
  color: black;
}
.index-header {
  span {
    float: left;

    color: #fff;
    font-size: 0.75rem;
    text-align: center;
    padding: 0.5rem;
  }

  .login {
    float: right;
    margin: 0 0.5rem;
  }
}

.nav_city {
  position: relative;
  top: 2rem;

  .box-card {
    font-size: 0.6666666666666666rem;
    width: 100%;

    .selectCity {
      text-decoration: none;
    }

    .clearfix {
      @include fj;
      font-size: 0.55rem;
      line-height: 1.8rem;
      opacity: 0.7;
    }

    .current-city {
      color: $blue;
    }

    .el-icon-arrow-right {
      float: right;
    }
  }

  .hot-city {
    font-size: 0.55rem;
    border-top: 2px solid #e4e4e4;
    // border-bottom: 1px solid #e4e4e4;
    margin-top: 0.8333333333333334rem;
    padding: 0.5rem 0;
    background-color: #fff;

    .el-col {
      color: $blue;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
    }

    .title {
      border-bottom: 1px solid #e4e4e4;
      padding: 0.1rem 0.5rem;
    }
  }

  .list-city {
    font-size: 0.55rem;
    border-top: 2px solid #e4e4e4;
    // border-bottom: 1px solid #e4e4e4;
    margin-top: 0.8333333333333334rem;
    padding: 0.5rem 0;
    background-color: #fff;

    .el-col {
      opacity: 0.8;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .index {
      border-bottom: 1px solid #e4e4e4;
      padding: 0.1rem 0.5rem;
    }
  }
}
</style>
